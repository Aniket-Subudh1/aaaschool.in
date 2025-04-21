import { NextRequest, NextResponse } from 'next/server';
import { getAdmissionById, updateAdmission, deleteAdmission, generateAdmissionNumber } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import nodemailer from 'nodemailer';
import { deleteFromCloudinary } from '@/lib/cloudinary';

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
    const id = params.id;
    
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const admission = await getAdmissionById(id);
    
    if (!admission) {
      return NextResponse.json(
        { message: 'Admission not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(admission);
  } catch (error) {
    console.error('Error fetching admission:', error);
    return NextResponse.json(
      { message: 'Failed to fetch admission' },
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
    const id = params.id;
    
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, notes, slNo, admissionNo } = body;
    
    const currentAdmission = await getAdmissionById(id);
    if (!currentAdmission) {
      return NextResponse.json(
        { message: 'Admission not found' },
        { status: 404 }
      );
    }
    
    type AdmissionStatus = "pending" | "approved" | "reviewing" | "rejected";
    interface UpdateAdmissionData {
      status?: AdmissionStatus;
      notes?: string;
      slNo?: string;
      admissionNo?: string;
    }
    const updateData: UpdateAdmissionData = { status, notes };
    
    if (slNo !== undefined && slNo !== null) {
      updateData.slNo = String(slNo);
    }
    
    if (status === 'approved' && currentAdmission.status !== 'approved') {
      const newAdmissionNumber = admissionNo || await generateAdmissionNumber();
      updateData.admissionNo = newAdmissionNumber;
      
      if (
        transporter && 
        (currentAdmission.fatherEmail || currentAdmission.motherEmail)
      ) {
        // Prepare email recipients
        const emailRecipients: string[] = [];
        if (currentAdmission.fatherEmail) {
          emailRecipients.push(currentAdmission.fatherEmail);
        }
        if (currentAdmission.motherEmail) {
          emailRecipients.push(currentAdmission.motherEmail);
        }
      
        // Send email to both parents if emails are available
        await Promise.all(emailRecipients.map(async (parentEmail) => {
          await transporter!.sendMail({
            from: process.env.EMAIL_USER || 'noreply@school.edu',
            to: parentEmail,
            subject: 'Admission Approved - Aryavart Ancient Academy',
            text: `
              Dear Parent,
              
              We are pleased to inform you that the admission application for ${currentAdmission.studentName} has been approved.
              
              Admission Number: ${newAdmissionNumber}
              Class: ${currentAdmission.class}
              
              Please visit the school with the following documents to complete the admission process:
              1. Original Birth Certificate
              2. Previous School Transfer Certificate (if applicable)
              3. Passport-sized photographs
              4. Aadhar Card
              
              Thank you for choosing Aryavart Ancient Academy. We look forward to welcoming your child to our school.
              
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
                
                <p style="margin-bottom: 16px;">Dear Parent,</p>
                
                <p style="margin-bottom: 16px;">We are pleased to inform you that the admission application for <strong>${currentAdmission.studentName}</strong> has been approved.</p>
                
                <div style="background-color: #f8f3e9; padding: 16px; border-left: 4px solid #8b1a1a; margin-bottom: 16px;">
                  <p><strong>Admission Number:</strong> ${newAdmissionNumber}</p>
                  <p><strong>Class:</strong> ${currentAdmission.class}</p>
                </div>
                
                <p style="margin-bottom: 16px;">Please visit the school with the following documents to complete the admission process:</p>
                <ol style="margin-bottom: 16px;">
                  <li>Original Birth Certificate</li>
                  <li>Previous School Transfer Certificate (if applicable)</li>
                  <li>Passport-sized photographs</li>
                  <li>Aadhar Card</li>
                </ol>
                
                <p style="margin-bottom: 16px;">Thank you for choosing Aryavart Ancient Academy. We look forward to welcoming your child to our school.</p>
                
                <p style="margin-bottom: 8px;">Regards,</p>
                <p style="margin-bottom: 16px;"><strong>Admission Team</strong><br>Aryavart Ancient Academy</p>
                
                <div style="text-align: center; padding-top: 20px; border-top: 1px solid #d4b483; color: #5a3e36; font-size: 12px;">
                  <p>Contact us: admission@aaaschool.in | +91-123-456-7890</p>
                </div>
              </div>
            `,
          });
        }));
      }
    }
    
    const updateResult = await updateAdmission(id, updateData);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Failed to update admission' },
        { status: 500 }
      );
    }
    
    const updatedAdmission = await getAdmissionById(id);
    return NextResponse.json(updatedAdmission);
  } catch (error) {
    console.error('Error updating admission:', error);
    return NextResponse.json(
      { message: 'Failed to update admission' },
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
    const id = params.id;
    
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const admission = await getAdmissionById(id);
    if (!admission) {
      return NextResponse.json(
        { message: 'Admission not found' },
        { status: 404 }
      );
    }

    const cloudinaryCleanupPromises: Promise<unknown>[] = [];
    if (admission.birthCertificatePublicId) {
      cloudinaryCleanupPromises.push(deleteFromCloudinary(admission.birthCertificatePublicId));
    }

    if (cloudinaryCleanupPromises.length > 0) {
      try {
        await Promise.all(cloudinaryCleanupPromises);
        console.log('Deleted Cloudinary resources for admission:', id);
      } catch (cloudinaryError) {
        console.error('Error deleting Cloudinary resources:', cloudinaryError);
      }
    }

    const deleteResult = await deleteAdmission(id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Admission not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Admission deleted successfully',
      deletedCloudinaryResources: cloudinaryCleanupPromises.length
    });
  } catch (error) {
    console.error('Error deleting admission:', error);
    return NextResponse.json(
      { message: 'Failed to delete admission' },
      { status: 500 }
    );
  }
}