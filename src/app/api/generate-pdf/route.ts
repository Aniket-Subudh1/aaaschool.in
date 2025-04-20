import { NextRequest, NextResponse } from 'next/server';
import { getEnquiryById, getAdmissionById } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

// Define interfaces for Enquiry and Admission
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
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, id } = body;

    // Validate input
    if (!type || !id) {
      return NextResponse.json(
        { message: 'Type and ID are required' },
        { status: 400 }
      );
    }

    if (type !== 'enquiry' && type !== 'admission') {
      return NextResponse.json(
        { message: 'Invalid type. Must be either "enquiry" or "admission"' },
        { status: 400 }
      );
    }

    // Fetch data based on type
    let data: Enquiry | Admission | null;
    if (type === 'enquiry') {
      data = await getEnquiryById(id) as Enquiry | null;
    } else {
      data = await getAdmissionById(id) as Admission | null;
    }

    // Check if data exists
    if (!data) {
      return NextResponse.json(
        { message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` },
        { status: 404 }
      );
    }

    // Create PDF document
    const doc = new PDFDocument({
      margin: 50,
      bufferPages: true,
    });

    // Create a PassThrough stream
    const stream = new PassThrough();

    // Pipe the PDF document to the stream
    doc.pipe(stream);

    // Add header
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('Aryavart Ancient Academy', { align: 'center' });

    doc.moveDown();

    // Add document type
    doc
      .fontSize(16)
      .text(
        type === 'enquiry'
          ? 'Admission Enquiry Form'
          : 'Admission Application Form',
        { align: 'center' }
      );

    doc.moveDown(2);

    // Generate PDF content based on type
    if (type === 'enquiry') {
      generateEnquiryPDF(doc, data as Enquiry);
    } else {
      generateAdmissionPDF(doc, data as Admission);
    }

    // Add page numbers
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc
        .fontSize(10)
        .text(`Page ${i + 1} of ${pageCount}`, 
          doc.page.width - 100, 
          doc.page.height - 30, 
          { align: 'right' }
        );
    }

    // Finalize PDF
    doc.end();

    // Wait for stream to finish and collect buffer
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });

    // Convert buffer to base64
    const base64PDF = pdfBuffer.toString('base64');

    return NextResponse.json({
      message: 'PDF generated successfully',
      pdfData: `data:application/pdf;base64,${base64PDF}`,
      filename: `${type === 'enquiry' ? 'Enquiry' : 'Admission'}_${
        data.studentName || 'Form'
      }_${Date.now()}.pdf`,
    });
  } catch (error) {
    console.error('Detailed PDF Generation Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      errorCode: error instanceof Error && 'code' in error
        ? (error as NodeJS.ErrnoException).code
        : 'N/A',
      errorPath: error instanceof Error && 'path' in error
        ? (error as NodeJS.ErrnoException).path
        : 'N/A',
    });

    return NextResponse.json(
      {
        message: 'Failed to generate PDF',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Function to generate enquiry PDF
function generateEnquiryPDF(doc: PDFKit.PDFDocument, data: Enquiry): void {
  // Enquiry Number and Status
  if (data.enquiryNumber) {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('Enquiry Number: ', { continued: true })
      .font('Helvetica')
      .text(data.enquiryNumber);
  }

  doc
    .font('Helvetica-Bold')
    .text('Status: ', { continued: true })
    .font('Helvetica')
    .text(data.status.charAt(0).toUpperCase() + data.status.slice(1));

  doc.moveDown();

  // Basic Information Section
  doc.fontSize(14).font('Helvetica-Bold').text('Basic Information');

  const basicFields = [
    { label: 'Student Name', value: data.studentName },
    { label: 'Parent Name', value: data.parentName },
    { label: 'Class Applied For', value: data.classApplied },
    { label: 'Mobile Number', value: data.mobileNumber },
    { label: 'Location', value: data.location },
  ];

  basicFields.forEach((field) => {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(`${field.label}: `, { continued: true })
      .font('Helvetica')
      .text(field.value);
  });

  // Notes Section
  if (data.notes) {
    doc.moveDown();
    doc.fontSize(14).font('Helvetica-Bold').text('Notes');

    doc.fontSize(12).font('Helvetica').text(data.notes, { width: 500, align: 'justify' });
  }

  // Submission Details
  doc.moveDown();
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Submission Date: ', { continued: true })
    .font('Helvetica')
    .text(new Date(data.createdAt).toLocaleDateString());

  if (data.updatedAt) {
    doc
      .font('Helvetica-Bold')
      .text('Last Updated: ', { continued: true })
      .font('Helvetica')
      .text(new Date(data.updatedAt).toLocaleDateString());
  }
}

// Function to generate admission PDF
function generateAdmissionPDF(doc: PDFKit.PDFDocument, data: Admission): void {
  // Enquiry and Admission Numbers
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Enquiry Number: ', { continued: true })
    .font('Helvetica')
    .text(data.enquiryNumber);

  if (data.admissionNo) {
    doc
      .font('Helvetica-Bold')
      .text('Admission Number: ', { continued: true })
      .font('Helvetica')
      .text(data.admissionNo);
  }

  doc
    .font('Helvetica-Bold')
    .text('Status: ', { continued: true })
    .font('Helvetica')
    .text(data.status.charAt(0).toUpperCase() + data.status.slice(1));

  doc.moveDown();

  // Student Information Section
  doc.fontSize(14).font('Helvetica-Bold').text('Student Information');

  const studentFields = [
    { label: 'Student Name', value: data.studentName },
    { label: 'Class', value: data.class },
    { label: 'Session', value: data.session },
    { label: 'Gender', value: data.gender },
    {
      label: 'Date of Birth',
      value: new Date(data.dateOfBirth).toLocaleDateString(),
    },
    { label: 'Date of Birth in Words', value: data.dateOfBirthInWords },
    { label: 'Blood Group', value: data.bloodGroup || 'Not provided' },
  ];

  studentFields.forEach((field) => {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(`${field.label}: `, { continued: true })
      .font('Helvetica')
      .text(field.value);
  });

  // Parent Information
  doc.moveDown();
  doc.fontSize(14).font('Helvetica-Bold').text("Father's Information");

  const fatherFields = [
    { label: 'Name', value: data.fatherName },
    { label: 'Occupation', value: data.fatherOccupation || 'Not provided' },
    { label: 'Education', value: data.fatherEducation || 'Not provided' },
    { label: 'Mobile', value: data.fatherMobile || 'Not provided' },
    { label: 'Email', value: data.fatherEmail || 'Not provided' },
  ];

  fatherFields.forEach((field) => {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(`${field.label}: `, { continued: true })
      .font('Helvetica')
      .text(field.value);
  });

  doc.moveDown();
  doc.fontSize(14).font('Helvetica-Bold').text("Mother's Information");

  const motherFields = [
    { label: 'Name', value: data.motherName },
    { label: 'Occupation', value: data.motherOccupation || 'Not provided' },
    { label: 'Education', value: data.motherEducation || 'Not provided' },
    { label: 'Mobile', value: data.motherMobile || 'Not provided' },
    { label: 'Email', value: data.motherEmail || 'Not provided' },
  ];

  motherFields.forEach((field) => {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(`${field.label}: `, { continued: true })
      .font('Helvetica')
      .text(field.value);
  });

  // Address Information
  doc.moveDown();
  doc.fontSize(14).font('Helvetica-Bold').text('Address Information');

  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Residential Address: ', { continued: true })
    .font('Helvetica')
    .text(data.residentialAddress, { width: 500, align: 'justify' });

  if (data.permanentAddress) {
    doc
      .font('Helvetica-Bold')
      .text('Permanent Address: ', { continued: true })
      .font('Helvetica')
      .text(data.permanentAddress, { width: 500, align: 'justify' });
  }

  // Declaration
  doc.moveDown(2);
  doc.fontSize(14).font('Helvetica-Bold').text('Declaration', { align: 'center' });

  doc
    .fontSize(12)
    .font('Helvetica')
    .text(
      'I hereby declare that the above information is correct to the best of my knowledge and belief. ' +
      'I shall abide by the rules and regulations of the school.',
      { align: 'center', width: 500 }
    );
}

// Ensure Node.js runtime for PDF generation
export const runtime = 'nodejs';