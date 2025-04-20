import { NextRequest, NextResponse } from 'next/server';
import { getEnquiryById, updateEnquiry, deleteEnquiry, generateEnquiryNumber } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

if (
  process.env.EMAIL_HOST &&
  process.env.EMAIL_PORT &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS
) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication for GET requests
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const enquiry = await getEnquiryById(params.id);
    
    if (!enquiry) {
      return NextResponse.json(
        { message: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(enquiry);
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    return NextResponse.json(
      { message: 'Failed to fetch enquiry' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication for PUT requests
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, notes } = body;
    
    // Get the current enquiry
    const currentEnquiry = await getEnquiryById(params.id);
    if (!currentEnquiry) {
      return NextResponse.json(
        { message: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    const updateData: { status: "pending" | "approved" | "rejected"; notes: string; enquiryNumber?: string } = {
      status,
      notes
    };
    
    // If approving the enquiry, generate an enquiry number
    if (status === 'approved' && currentEnquiry.status !== 'approved') {
      const enquiryNumber = await generateEnquiryNumber();
      updateData.enquiryNumber = enquiryNumber;
      
      // Send email notification to parent
      if (
        transporter && 
        currentEnquiry.mobileNumber // Assuming mobile might be used for SMS, but we'd need email
      ) {
        // This is a placeholder - in a real system, you'd store the parent's email
        // For now we're just demonstrating the code structure
        const parentContact = `${currentEnquiry.mobileNumber}@example.com`;
        
        await transporter.sendMail({
          from: process.env.EMAIL_USER || 'noreply@school.edu',
          to: parentContact,
          subject: 'Admission Enquiry Approved - Aryavart Ancient Academy',
          text: `
            Dear ${currentEnquiry.parentName},
            
            We are pleased to inform you that your admission enquiry for ${currentEnquiry.studentName} has been approved.
            
            Your Enquiry Number: ${enquiryNumber}
            
            Please use this enquiry number to complete the admission form on our website.
            
            Regards,
            Admission Team
            Aryavart Ancient Academy
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #d4b483; border-radius: 8px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://www.aaaschool.in/aaa.png" alt="Aryavart Ancient Academy Logo" style="width: 80px;">
                <h2 style="color: #8b1a1a; margin-top: 10px;">Aryavart Ancient Academy</h2>
              </div>
              
              <p style="margin-bottom: 16px;">Dear <strong>${currentEnquiry.parentName}</strong>,</p>
              
              <p style="margin-bottom: 16px;">We are pleased to inform you that your admission enquiry for <strong>${currentEnquiry.studentName}</strong> has been approved.</p>
              
              <div style="background-color: #f8f3e9; padding: 16px; border-left: 4px solid #8b1a1a; margin-bottom: 16px; text-align: center;">
                <p style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Your Enquiry Number</p>
                <p style="font-size: 22px; font-weight: bold; color: #8b1a1a;">${enquiryNumber}</p>
              </div>
              
              <p style="margin-bottom: 16px;">Please use this enquiry number to complete the admission form on our website.</p>
              
              <p style="margin-bottom: 8px;">Regards,</p>
              <p style="margin-bottom: 16px;"><strong>Admission Team</strong><br>Aryavart Ancient Academy</p>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #d4b483; color: #5a3e36; font-size: 12px;">
                <p>If you have any questions, please contact our admission office.</p>
              </div>
            </div>
          `,
        });
      }
    }
    
    const updateResult = await updateEnquiry(params.id, updateData);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Failed to update enquiry' },
        { status: 500 }
      );
    }
    
    const updatedEnquiry = await getEnquiryById(params.id);
    return NextResponse.json(updatedEnquiry);
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      { message: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication for DELETE requests
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const deleteResult = await deleteEnquiry(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json(
      { message: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}