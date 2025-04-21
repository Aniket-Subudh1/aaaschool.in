import { NextRequest, NextResponse } from "next/server";
import { getEnquiryById, getAdmissionById } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import https from "https";


interface Enquiry {
  enquiryNumber?: string;
  studentName: string;
  parentName: string;
  classApplied: string;
  mobileNumber: string;
  location: string;
  notes?: string;
  status: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}
interface Admission {
  enquiryNumber: string;
  admissionNo?: string;
  studentName: string;
  class: string;
  session: string;
  gender: string;
  dateOfBirth: string | Date;
  dateOfBirthInWords: string;
  bloodGroup?: string;
  fatherName: string;
  fatherOccupation?: string;
  fatherEducation?: string;
  fatherMobile?: string;
  fatherEmail?: string;
  motherName: string;
  motherOccupation?: string;
  motherEducation?: string;
  motherMobile?: string;
  motherEmail?: string;
  residentialAddress: string;
  permanentAddress?: string;
  status: string;
  photoUrl?: string;
}


function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}
function hr(doc: PDFKit.PDFDocument) {
  doc
    .strokeColor("#cccccc")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke()
    .moveDown(1.5);
}


export async function POST(request: NextRequest) {
  try {

    const auth = await verifyAuth(request);
    if (!auth.isAuthenticated)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    /* 2. Input check */
    const { type, id } = await request.json();
    if (!["enquiry", "admission"].includes(type) || !id)
      return NextResponse.json(
        { message: "Type (enquiry|admission) and id are required" },
        { status: 400 },
      );

 
    const data =
      type === "enquiry"
        ? (await getEnquiryById(id)) as Enquiry | null
        : (await getAdmissionById(id)) as Admission | null;
    if (!data)
      return NextResponse.json({ message: `${type} not found` }, { status: 404 });

    /* 4. PDF + stream */
    const doc = new PDFDocument({ margin: 50, bufferPages: true });
    const stream = new PassThrough();
    doc.pipe(stream);

    const PAGE_W = doc.page.width;
    const HEADER_Y = 40;

    const logoUrl = "https://aaaschool-in.vercel.app/aaa.png";
    try {
      const logoBuf = await downloadImage(logoUrl);
      const logoW = 80;
      doc.image(logoBuf, (PAGE_W - logoW) / 2, HEADER_Y, { width: logoW });
    } catch (e) {
      console.error("Logo download failed:", e);
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .text("Aryavart Ancient Academy", 50, HEADER_Y + 90, {
        align: "center",
      })
      .font("Helvetica")
      .fontSize(14)
      .text("Khordha, Odisha", { align: "center" });

    if (type === "admission" && (data as Admission).photoUrl) {
      try {
        const buf = await downloadImage((data as Admission).photoUrl!);
        doc.image(buf, PAGE_W - 150, HEADER_Y, { width: 100, height: 100 });
      } catch (e) {
        console.error("Student photo download failed:", e);
      }
    }

    doc.moveDown(2);
    hr(doc);

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(
        type === "enquiry" ? "Admission Enquiry Form" : "Admission Application Form",
        { align: "center" },
      )
      .moveDown(1.5);


    if (type === "enquiry") generateEnquiryPDF(doc, data as Enquiry);
    else generateAdmissionPDF(doc, data as Admission);

 
const pages = doc.bufferedPageRange().count;

for (let i = 0; i < pages; i++) {
  doc.switchToPage(i);

  const pageBottom = doc.page.height - doc.page.margins.bottom;
  const footerY   = pageBottom - 12;                            

  doc
    .font("Helvetica")
    .fontSize(10)
    .text(
      `Page ${i + 1} of ${pages}`,
      50,                   
      footerY,              
      { width: doc.page.width - 100, align: "right" },
    );
}


    doc.end();

    const pdfBuf: Buffer = await new Promise((res, rej) => {
      const chunks: Buffer[] = [];
      stream.on("data", (c) => chunks.push(c));
      stream.on("end", () => res(Buffer.concat(chunks)));
      stream.on("error", rej);
    });

    return NextResponse.json({
      message: "PDF generated successfully",
      pdfData: `data:application/pdf;base64,${pdfBuf.toString("base64")}`,
      filename: `${type}_${data.studentName ?? "Form"}_${Date.now()}.pdf`,
    });
  } catch (err: unknown) {
    console.error("PDF generation failed:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { message: "Failed to generate PDF", error: errorMessage },
      { status: 500 },
    );
  }
}

function field(
  doc: PDFKit.PDFDocument,
  label: string,
  value: string | undefined,
) {
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`${label}: `, { continued: true })
    .font("Helvetica")
    .text(value ?? "N/A");
}
function section(doc: PDFKit.PDFDocument, title: string) {
  doc.moveDown().font("Helvetica-Bold").fontSize(14).text(title).moveDown(0.5);
}

/* Enquiry */
function generateEnquiryPDF(doc: PDFKit.PDFDocument, d: Enquiry) {
  section(doc, "Enquiry Details");
  field(doc, "Enquiry #", d.enquiryNumber);
  field(doc, "Status", d.status);

  section(doc, "Basic Information");
  field(doc, "Student Name", d.studentName);
  field(doc, "Parent Name", d.parentName);
  field(doc, "Class Applied For", d.classApplied);
  field(doc, "Mobile Number", d.mobileNumber);
  field(doc, "Location", d.location);

  if (d.notes) {
    section(doc, "Notes");
    doc.font("Helvetica").fontSize(12).text(d.notes, {
      width: 500,
      align: "justify",
    });
  }

  section(doc, "Timestamps");
  field(doc, "Created", new Date(d.createdAt).toLocaleDateString());
  if (d.updatedAt)
    field(doc, "Updated", new Date(d.updatedAt).toLocaleDateString());
}

/* Admission */
function generateAdmissionPDF(doc: PDFKit.PDFDocument, d: Admission) {
  section(doc, "Identifiers & Status");
  field(doc, "Enquiry #", d.enquiryNumber);
  if (d.admissionNo) field(doc, "Admission #", d.admissionNo);
  field(doc, "Status", d.status);

  section(doc, "Student Information");
  field(doc, "Student Name", d.studentName);
  field(doc, "Class", d.class);
  field(doc, "Session", d.session);
  field(doc, "Gender", d.gender);
  field(doc, "DOB", new Date(d.dateOfBirth).toLocaleDateString());
  field(doc, "DOB (Words)", d.dateOfBirthInWords);
  field(doc, "Blood Group", d.bloodGroup);

  section(doc, "Father's Information");
  field(doc, "Name", d.fatherName);
  field(doc, "Occupation", d.fatherOccupation);
  field(doc, "Education", d.fatherEducation);
  field(doc, "Mobile", d.fatherMobile);
  field(doc, "Email", d.fatherEmail);

  section(doc, "Mother's Information");
  field(doc, "Name", d.motherName);
  field(doc, "Occupation", d.motherOccupation);
  field(doc, "Education", d.motherEducation);
  field(doc, "Mobile", d.motherMobile);
  field(doc, "Email", d.motherEmail);

  section(doc, "Address Information");
  field(doc, "Residential", d.residentialAddress);
  if (d.permanentAddress) field(doc, "Permanent", d.permanentAddress);

  hr(doc);
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Declaration", { align: "center" })
    .moveDown(0.5)
    .font("Helvetica")
    .fontSize(12)
    .text(
      "I hereby declare that the above information is true to the best of my knowledge and belief. I shall abide by the rules and regulations of the school.",
      { align: "center", width: 500 },
    );
}

export const runtime = "nodejs";
