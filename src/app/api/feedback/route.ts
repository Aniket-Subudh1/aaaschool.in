import { NextRequest, NextResponse } from 'next/server';
import { getFeedback, createFeedback } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import nodemailer from 'nodemailer';

// Email setup
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

export async function GET(request: NextRequest) {
  try {
    // Verify authentication for GET requests
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'new' | 'read' | 'responded' | undefined;
    
    const feedbackList = await getFeedback(status);
    return NextResponse.json(feedbackList);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { message: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Allow public access for POST requests
    await verifyAuth(request, { allowPublic: true });

    const body = await request.json();
    const { name, email, message, type } = body;

    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { message: 'Name, email, message, and type are required' },
        { status: 400 }
      );
    }

    const newFeedback = await createFeedback({
      name,
      email,
      phone: body.phone,
      message,
      rating: body.rating,
      type,
    });

    // Send notification email to admin
    if (
      transporter && 
      process.env.ADMIN_EMAIL &&
      process.env.FEEDBACK_NOTIFICATION_EMAIL
    ) {
      await transporter.sendMail({
        from: process.env.FEEDBACK_NOTIFICATION_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Feedback Received',
        text: `
          New feedback has been received from ${name}.
          
          Email: ${email}
          Phone: ${body.phone || 'Not provided'}
          Type: ${type}
          Rating: ${body.rating || 'Not provided'}
          
          Message:
          ${message}
          
          You can respond to this feedback from the admin panel.
        `,
        html: `
          <h2>New Feedback Received</h2>
          <p>New feedback has been received from <strong>${name}</strong>.</p>
          
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${body.phone || 'Not provided'}</li>
            <li><strong>Type:</strong> ${type}</li>
            <li><strong>Rating:</strong> ${body.rating || 'Not provided'}</li>
          </ul>
          
          <h3>Message:</h3>
          <p>${message}</p>
          
          <p>You can respond to this feedback from the admin panel.</p>
        `,
      });
    }

    // Send thank you email to user
    if (transporter && process.env.FEEDBACK_NOTIFICATION_EMAIL) {
      await transporter.sendMail({
        from: process.env.FEEDBACK_NOTIFICATION_EMAIL,
        to: email,
        subject: 'Thank You for Your Feedback - Aryavart Ancient Academy',
        text: `
          Dear ${name},
          
          Thank you for taking the time to share your feedback with Aryavart Ancient Academy. We truly value your input as it helps us improve our services and provide a better experience for our students and community.
          
          Your feedback has been received and will be reviewed by our team. If necessary, we will get back to you soon.
          
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
            
            <p style="margin-bottom: 16px;">Dear <strong>${name}</strong>,</p>
            
            <p style="margin-bottom: 16px;">Thank you for taking the time to share your feedback with Aryavart Ancient Academy. We truly value your input as it helps us improve our services and provide a better experience for our students and community.</p>
            
            <p style="margin-bottom: 16px;">Your feedback has been received and will be reviewed by our team. If necessary, we will get back to you soon.</p>
            
            <p style="margin-bottom: 8px;">Kind regards,</p>
            <p style="margin-bottom: 16px;"><strong>The Administrative Team</strong><br>Aryavart Ancient Academy</p>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #d4b483; color: #5a3e36; font-size: 12px;">
              <p>Khordha, Odisha, India</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { message: 'Feedback submitted successfully', feedback: newFeedback },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { message: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}