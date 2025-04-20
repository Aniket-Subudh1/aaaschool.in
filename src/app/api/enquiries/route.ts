import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, createEnquiry } from '@/lib/db';
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

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'pending' | 'approved' | 'rejected' | undefined;
    
    const enquiries = await getEnquiries(status);
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { message: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { parentName, studentName, classApplied, mobileNumber, location, email } = body;

    if (!parentName || !studentName || !classApplied || !mobileNumber || !location || !email) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const newEnquiry = await createEnquiry({
      parentName,
      studentName,
      classApplied,
      mobileNumber,
      location,
      email 
    });

    if (transporter && email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Enquiry Received - Aryavart Ancient Academy',
        html: `
          <div>
            <h2>Enquiry Confirmation</h2>
            <p>Dear ${parentName},</p>
            <p>Your enquiry for ${studentName} has been received.</p>
            <p>We will process your application and get back to you soon.</p>
          </div>
        `
      });
    }

    return NextResponse.json(
      { message: 'Enquiry submitted successfully', enquiry: newEnquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json(
      { message: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}