import { NextRequest, NextResponse } from 'next/server';
import { 
  getEnquiryById, 
  updateEnquiry, 
  deleteEnquiry, 
  generateEnquiryNumber 
} from '@/lib/db';
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, notes } = body;
    
    const currentEnquiry = await getEnquiryById(params.id);
    if (!currentEnquiry) {
      return NextResponse.json(
        { message: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    const updateData: { 
      status: "pending" | "approved" | "rejected"; 
      notes: string; 
      enquiryNumber?: string 
    } = {
      status,
      notes
    };
    
 
    if (status === 'approved' && currentEnquiry.status !== 'approved') {
      const enquiryNumber = await generateEnquiryNumber();
      updateData.enquiryNumber = enquiryNumber;

      if (
        transporter && 
        currentEnquiry.email 
      ) {
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER || 'noreply@school.edu',
            to: currentEnquiry.email,
            subject: 'Admission Enquiry Approved - Aryavart Ancient Academy',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #8b1a1a;">Enquiry Approved</h2>
                <p>Dear ${currentEnquiry.parentName},</p>
                
                <p>We are pleased to inform you that your admission enquiry for ${currentEnquiry.studentName} has been approved.</p>
                
                <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
                  <strong>Your Enquiry Number:</strong> ${enquiryNumber}
                </div>
                
                <p>Please use this enquiry number to complete the admission form on our website.</p>
                
                <p>Regards,<br>Admission Team<br>Aryavart Ancient Academy</p>
              </div>
            `
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
        }
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
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