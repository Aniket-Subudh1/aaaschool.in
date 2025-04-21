import { NextRequest, NextResponse } from "next/server";
import { getEnquiryById, getAdmissionById, getATATRegistrationById } from "@/lib/db";
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

interface ATATRegistration {
  _id?: string;
  registrationNumber: string;
  studentName: string;
  dateOfBirth: string | Date;
  gender: string;
  photoUrl: string;
  photoPublicId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  currentSchool: string;
  currentClass: string;
  applyingForClass: string;
  testDate: string | Date;
  testTime?: string;
  testVenue?: string;
  status: string;
  rank?: number;
  scholarshipPercentage?: number;
}

import fs from 'fs';
import path from 'path';

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Handle local file paths for development
    if (url.startsWith('/uploads/')) {
      try {
        const filePath = path.join(process.cwd(), 'public', url);
        const fileBuffer = fs.readFileSync(filePath);
        resolve(fileBuffer);
      } catch (err) {
        reject(err);
      }
      return;
    }
    
    // Handle URLs
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
    if (!["enquiry", "admission", "atat-admit-card"].includes(type) || !id)
      return NextResponse.json(
        { message: "Type (enquiry|admission|atat-admit-card) and id are required" },
        { status: 400 },
      );

    let data;
    if (type === "enquiry") {
      data = (await getEnquiryById(id)) as Enquiry | null;
    } else if (type === "admission") {
      data = (await getAdmissionById(id)) as Admission | null;
    } else if (type === "atat-admit-card") {
      data = (await getATATRegistrationById(id)) as ATATRegistration | null;
    }
    
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

    // Add photo if available
    if ((type === "admission" && (data as Admission).photoUrl) || 
        (type === "atat-admit-card" && (data as ATATRegistration).photoUrl)) {
      try {
        const photoUrl = type === "admission" 
          ? (data as Admission).photoUrl!
          : (data as ATATRegistration).photoUrl!;
        
        const buf = await downloadImage(photoUrl);
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
        type === "enquiry" 
          ? "Admission Enquiry Form" 
          : type === "admission" 
            ? "Admission Application Form" 
            : "ATAT Admit Card",
        { align: "center" },
      )
      .moveDown(1.5);


    if (type === "enquiry") generateEnquiryPDF(doc, data as Enquiry);
    else if (type === "admission") generateAdmissionPDF(doc, data as Admission);
    else if (type === "atat-admit-card") generateATATAdmitCardPDF(doc, data as ATATRegistration);

    // Add page numbers
    const pages = doc.bufferedPageRange().count;
    for (let i = 0; i < pages; i++) {
      doc.switchToPage(i);
      const pageBottom = doc.page.height - doc.page.margins.bottom;
      const footerY = pageBottom - 12;                            
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

    // Generate filename based on type
    let filename;
    if (type === "enquiry") {
      filename = `enquiry_${(data as Enquiry).studentName}_${Date.now()}.pdf`;
    } else if (type === "admission") {
      filename = `admission_${(data as Admission).studentName}_${Date.now()}.pdf`;
    } else if (type === "atat-admit-card") {
      filename = `admit_card_${(data as ATATRegistration).registrationNumber}_${Date.now()}.pdf`;
    }

    return NextResponse.json({
      message: "PDF generated successfully",
      pdfData: `data:application/pdf;base64,${pdfBuf.toString("base64")}`,
      filename,
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
  value: string | undefined | number,
) {
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`${label}: `, { continued: true })
    .font("Helvetica")
    .text(value !== undefined ? value.toString() : "N/A");
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

/* ATAT Admit Card */
function generateATATAdmitCardPDF(doc: PDFKit.PDFDocument, d: ATATRegistration) {
  // Add a colored band at the top of the admit card
  doc
    .rect(50, doc.y, doc.page.width - 100, 30)
    .fill("#8b1a1a");
  
  doc.moveDown(1);
  
  // Add registration number with background
  doc
    .rect(50, doc.y, doc.page.width - 100, 25)
    .fill("#f8f3e9");
  
  doc
    .fill("#000")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text(`Registration Number: ${d.registrationNumber}`, 
      { align: "center" })
    .moveDown(1);

  // Student information section
  doc.font("Helvetica-Bold").fontSize(14).text("Student Information");
  
  doc.moveDown(0.5);
  
  field(doc, "Name", d.studentName);
  field(doc, "Gender", d.gender);
  field(doc, "Date of Birth", new Date(d.dateOfBirth).toLocaleDateString());
  field(doc, "Current Class", d.currentClass);
  field(doc, "Applying For", d.applyingForClass);
  field(doc, "Current School", d.currentSchool);
  
  // Exam information section
  doc.moveDown(1);
  section(doc, "Examination Details");
  
  field(doc, "Test Date", new Date(d.testDate).toLocaleDateString());
  field(doc, "Test Time", d.testTime || "9:00 AM - 11:00 AM");
  field(doc, "Test Venue", d.testVenue || "Aryavart Ancient Academy, Main Hall");
  field(doc, "Reporting Time", "30 minutes before exam time");
  
  // Contact information
  doc.moveDown(1);
  section(doc, "Contact Information");
  
  field(doc, "Parent/Guardian", d.parentName);
  field(doc, "Mobile", d.parentPhone);
  field(doc, "Email", d.parentEmail);
  field(doc, "Address", `${d.address}, ${d.city}, ${d.state} - ${d.pincode}`);
  
  // If scholarship awarded, show details
  if (d.status === "approved" && d.scholarshipPercentage) {
    doc.moveDown(1);
    
    // Add a colored background for the scholarship section
    const scholarshipY = doc.y;
    doc
      .rect(50, scholarshipY, doc.page.width - 100, 60)
      .fill("#e6f7e6");
    
    doc
      .fill("#006400")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Scholarship Details", 60, scholarshipY + 10);
    
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(`Scholarship Awarded: ${d.scholarshipPercentage}%`, 60, scholarshipY + 30);
    
    if (d.rank) {
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Rank: ${d.rank}`, 60, scholarshipY + 50);
    }
    
    doc.fill("#000").moveDown(4);
  } else {
    doc.moveDown(1);
  }
  
  // Instructions
  hr(doc);
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Important Instructions", { align: "center" })
    .moveDown(0.5);
  
  const instructions = [
    "1. Please bring this admit card to the examination center.",
    "2. A valid photo ID is required along with this admit card.",
    "3. Candidates should reach the venue 30 minutes before the examination time.",
    "4. Bring your own stationery (pens, pencils, eraser, etc.).",
    "5. Electronic devices including calculators, mobile phones are not allowed in the examination hall.",
    "6. No candidate will be allowed to enter the examination hall after the commencement of the examination."
  ];
  
  doc
    .font("Helvetica")
    .fontSize(10);
    
  instructions.forEach(instruction => {
    doc.text(instruction, { align: "left" });
    doc.moveDown(0.5);
  });
  
  // Official stamp and signature
  doc.moveDown(1);
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Authorized Signatory", 400, doc.y, { align: "center", width: 100 })
    .moveDown(0.5)
    .font("Helvetica")
    .fontSize(10)
    .text("(Principal)", { align: "center", width: 100 });
  
  // Add school seal placeholder
  doc
    .ellipse(150, doc.y - 20, 40, 25)
    .stroke();
  
  doc
    .font("Helvetica")
    .fontSize(9)
    .text("School Seal", 150, doc.y - 30, { align: "center", width: 80 });
  
  // Footer
  hr(doc);
  doc
    .font("Helvetica")
    .fontSize(9)
    .text(
      "This is a computer-generated document. No signature is required.",
      { align: "center" }
    )
    .moveDown(0.3)
    .text(
      "For any queries, please contact: 9124654094 | Email: aryavartaa.krd@gmail.com",
      { align: "center" }
    );
}

export const runtime = "nodejs";