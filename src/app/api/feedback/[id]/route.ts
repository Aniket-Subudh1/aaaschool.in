import { NextRequest, NextResponse } from 'next/server';
import { getFeedbackById, updateFeedbackStatus, deleteFeedback } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const feedback = await getFeedbackById(params.id);
    
    if (!feedback) {
      return NextResponse.json(
        { message: 'Feedback not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { message: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, responseMessage } = body;

    if (!status || (status === 'responded' && !responseMessage)) {
      return NextResponse.json(
        { message: 'Status is required, and a response message is required when marking as responded' },
        { status: 400 }
      );
    }

    const updateResult = await updateFeedbackStatus(params.id, status, responseMessage);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Feedback not found' },
        { status: 404 }
      );
    }
    
    const updatedFeedback = await getFeedbackById(params.id);

    // If marking as responded, send email to the user
    if (
      status === 'responded' && 
      responseMessage && 
      updatedFeedback && 
      process.env.FEEDBACK_NOTIFICATION_EMAIL
    ) {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.FEEDBACK_NOTIFICATION_EMAIL,
        to: updatedFeedback.email,
        subject: 'Response to Your Feedback - Aryavart Ancient Academy',
        text: `
          Dear ${updatedFeedback.name},
          
          Thank you for your feedback regarding Aryavart Ancient Academy. Our team has reviewed your message and we would like to provide the following response:
          
          ${responseMessage}
          
          If you have any further questions or concerns, please don't hesitate to contact us.
          
          Kind regards,
          The Administrative Team
          Aryavart Ancient Academy
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #d4b483; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://www.aaaschool.in/aaa.png" alt="Aryavart Ancient Academy Logo" style="width: 80px;">
              <h2 style="color: #8b1a1a; margin-top: 10px;">Aryavart Ancient Academy</h2>
            </div>
            
            <p style="margin-bottom: 16px;">Dear <strong>${updatedFeedback.name}</strong>,</p>
            
            <p style="margin-bottom: 16px;">Thank you for your feedback regarding Aryavart Ancient Academy. Our team has reviewed your message and we would like to provide the following response:</p>
            
            <div style="background-color: #f8f3e9; padding: 16px; border-left: 4px solid #8b1a1a; margin-bottom: 16px;">
              <p>${responseMessage}</p>
            </div>
            
            <p style="margin-bottom: 16px;">If you have any further questions or concerns, please don't hesitate to contact us.</p>
            
            <p style="margin-bottom: 8px;">Kind regards,</p>
            <p style="margin-bottom: 16px;"><strong>The Administrative Team</strong><br>Aryavart Ancient Academy</p>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #d4b483; color: #5a3e36; font-size: 12px;">
              <p>Khordha, Odisha, India</p>
              <p>If you need further assistance, please reply to this email.</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    return NextResponse.json(
      { message: 'Failed to update feedback' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const deleteResult = await deleteFeedback(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Feedback not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json(
      { message: 'Failed to delete feedback' },
      { status: 500 }
    );
  }
}