import { NextRequest, NextResponse } from 'next/server';
import { getEnquiryById, getAdmissionById } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import jsPDF from 'jspdf';

// Define types for Enquiry and Admission
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

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (admin only)
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, id } = body;

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

    // Get the data based on type
    let data;
if (type === 'enquiry') {
  data = await getEnquiryById(id);
} else {
  data = await getAdmissionById(id);
}

    if (!data) {
      return NextResponse.json(
        { message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` },
        { status: 404 }
      );
    }

    // Generate PDF using jsPDF
    const doc = new jsPDF();
    
    // Construct PDF based on type
    if (type === 'enquiry') {
      generateEnquiryPDF(doc, data);
    } else {
      generateAdmissionPDF(doc, data);
    }

    // Convert PDF to base64 string
    const pdfOutput = doc.output('datauristring');
    
    // Return PDF URL and filename to client
    return NextResponse.json({
      message: 'PDF generated successfully',
      pdfData: pdfOutput,
      filename: `${type === 'enquiry' ? 'Enquiry' : 'Admission'}_${data.studentName || 'Form'}_${Date.now()}.pdf`
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { message: 'Failed to generate PDF', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Function to generate enquiry PDF
function generateEnquiryPDF(doc: jsPDF, data: Enquiry): void {
  let yPos = 10;
  
  // Add school name and header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Aryavart Ancient Academy', doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(16);
  doc.text('Admission Enquiry Form', doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  
  yPos += 15;
  
  // Add enquiry number if available
  if (data.enquiryNumber) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Enquiry Number:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.enquiryNumber}`, 70, yPos);
    yPos += 8;
  }
  
  // Add status
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Status:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.status.charAt(0).toUpperCase() + data.status.slice(1)}`, 70, yPos);
  yPos += 10;
  
  // Add horizontal line
  doc.line(20, yPos, doc.internal.pageSize.width - 20, yPos);
  yPos += 10;
  
  // Add basic information
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Basic Information', 20, yPos);
  yPos += 8;
  
  // Student details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Name:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.studentName}`, 80, yPos);
  yPos += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Parent Name:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.parentName}`, 80, yPos);
  yPos += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Class Applied For:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.classApplied}`, 80, yPos);
  yPos += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Mobile Number:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.mobileNumber}`, 80, yPos);
  yPos += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Location:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.location}`, 80, yPos);
  yPos += 12;
  
// Add notes if available
  if (data.notes) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Notes', 20, yPos);
    yPos += 8;
    
    // Handle multi-line notes with word wrap
    const splitNotes = doc.splitTextToSize(data.notes, doc.internal.pageSize.width - 40);
    doc.text(splitNotes, 20, yPos);
    
    yPos += splitNotes.length * 7 + 10;
  }
  
  // Add submission details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Submission Date:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${new Date(data.createdAt).toLocaleDateString()}`, 80, yPos);
  yPos += 8;
  
  if (data.updatedAt) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Last Updated:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(`${new Date(data.updatedAt).toLocaleDateString()}`, 80, yPos);
    yPos += 8;
  }
  
  // Add footer
  yPos = doc.internal.pageSize.height - 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Document generated on ${new Date().toLocaleDateString()}`, 
    doc.internal.pageSize.width / 2, 
    yPos, 
    { align: 'center' }
  );
}

// Function to generate admission PDF
function generateAdmissionPDF(doc: jsPDF, data: Admission): void {
  let yPos = 10;
  
  // Add school name and header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Aryavart Ancient Academy', doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(16);
  doc.text('Admission Application Form', doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  
  yPos += 15;
  
  // Add header information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Enquiry Number:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.enquiryNumber}`, 80, yPos);
  yPos += 8;
  
  if (data.admissionNo) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Admission Number:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.admissionNo}`, 80, yPos);
    yPos += 8;
  }
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Status:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.status.charAt(0).toUpperCase() + data.status.slice(1)}`, 80, yPos);
  yPos += 12;
  
  // Add horizontal line
  doc.line(20, yPos, doc.internal.pageSize.width - 20, yPos);
  yPos += 10;
  
  // Add student information section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Information', 20, yPos);
  yPos += 8;
  
  // Student basic details
  const studentFields = [
    { label: 'Student Name:', value: data.studentName },
    { label: 'Class:', value: data.class },
    { label: 'Session:', value: data.session },
    { label: 'Gender:', value: data.gender },
    { label: 'Date of Birth:', value: new Date(data.dateOfBirth).toLocaleDateString() },
    { label: 'Date of Birth in Words:', value: data.dateOfBirthInWords },
    { label: 'Blood Group:', value: data.bloodGroup || 'Not provided' }
  ];
  
  studentFields.forEach(field => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(field.label, 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(field.value, 100, yPos);
    yPos += 8;
  });
  
  yPos += 8;
  
  // Check if we need to add a new page
  if (yPos > doc.internal.pageSize.height - 50) {
    doc.addPage();
    yPos = 20;
  }
  
  // Parent Information
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Parent Information', 20, yPos);
  yPos += 10;
  
  // Father's details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("Father's Information:", 20, yPos);
  yPos += 8;
  
  const fatherFields = [
    { label: 'Name:', value: data.fatherName },
    { label: 'Occupation:', value: data.fatherOccupation || 'Not provided' },
    { label: 'Education:', value: data.fatherEducation || 'Not provided' },
    { label: 'Mobile:', value: data.fatherMobile || 'Not provided' },
    { label: 'Email:', value: data.fatherEmail || 'Not provided' }
  ];
  
  fatherFields.forEach(field => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(field.label, 30, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(field.value, 80, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  
  // Mother's details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("Mother's Information:", 20, yPos);
  yPos += 8;
  
  const motherFields = [
    { label: 'Name:', value: data.motherName },
    { label: 'Occupation:', value: data.motherOccupation || 'Not provided' },
    { label: 'Education:', value: data.motherEducation || 'Not provided' },
    { label: 'Mobile:', value: data.motherMobile || 'Not provided' },
    { label: 'Email:', value: data.motherEmail || 'Not provided' }
  ];
  
  motherFields.forEach(field => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(field.label, 30, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(field.value, 80, yPos);
    yPos += 6;
  });
  
  yPos += 8;
  
  // Check if we need to add a new page
  if (yPos > doc.internal.pageSize.height - 80) {
    doc.addPage();
    yPos = 20;
  }
  
  // Add address information
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Address Information', 20, yPos);
  yPos += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Residential Address:', 20, yPos);
  yPos += 8;
  
  // Handle multi-line address with word wrap
  doc.setFont('helvetica', 'normal');
  const splitResAddress = doc.splitTextToSize(data.residentialAddress, doc.internal.pageSize.width - 40);
  doc.text(splitResAddress, 20, yPos);
  yPos += splitResAddress.length * 7 + 5;
  
  if (data.permanentAddress) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Permanent Address:', 20, yPos);
    yPos += 8;
    
    doc.setFont('helvetica', 'normal');
    const splitPermAddress = doc.splitTextToSize(data.permanentAddress, doc.internal.pageSize.width - 40);
    doc.text(splitPermAddress, 20, yPos);
    yPos += splitPermAddress.length * 7 + 5;
  }
  
  // Add declaration at the end
  if (yPos > doc.internal.pageSize.height - 50) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Declaration', doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const declarationText = 'I hereby declare that the above information is correct to the best of my knowledge and belief. ' +
    'I shall abide by the rules and regulations of the school.';
  
  const splitDeclaration = doc.splitTextToSize(declarationText, doc.internal.pageSize.width - 40);
  doc.text(splitDeclaration, doc.internal.pageSize.width / 2, yPos, { align: 'center' });
}
