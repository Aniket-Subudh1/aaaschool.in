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
    await verifyAuth(request, { allowPublic: true });

    const body = await request.json();
    const { parentName, studentName, classApplied, mobileNumber, location } = body;

    if (!parentName || !studentName || !classApplied || !mobileNumber || !location) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { message: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    const newEnquiry = await createEnquiry({
      parentName,
      studentName,
      classApplied,
      mobileNumber,
      location
    });

    if (
      transporter && 
      process.env.ADMIN_EMAIL
    ) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Admission Enquiry Received',
        text: `
          New admission enquiry has been received.
          
          Parent: ${parentName}
          Student: ${studentName}
          Class: ${classApplied}
          Mobile: ${mobileNumber}
          Location: ${location}
          
          Please review this enquiry in the admin dashboard.
        `,
        html: `
          <h2>New Admission Enquiry Received</h2>
          <p>A new admission enquiry has been submitted with the following details:</p>
          
          <ul>
            <li><strong>Parent Name:</strong> ${parentName}</li>
            <li><strong>Student Name:</strong> ${studentName}</li>
            <li><strong>Class Applied For:</strong> ${classApplied}</li>
            <li><strong>Mobile Number:</strong> ${mobileNumber}</li>
            <li><strong>Location:</strong> ${location}</li>
          </ul>
          
          <p>Please review this enquiry in the admin dashboard.</p>
        `,
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