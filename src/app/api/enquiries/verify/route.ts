import { NextRequest, NextResponse } from 'next/server';
import { getEnquiryByNumber } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await verifyAuth(request, { allowPublic: true });

    const body = await request.json();
    const { enquiryNumber } = body;

    if (!enquiryNumber) {
      return NextResponse.json(
        { message: 'Enquiry number is required' },
        { status: 400 }
      );
    }

    const enquiry = await getEnquiryByNumber(enquiryNumber);
    
    if (!enquiry) {
      return NextResponse.json(
        { valid: false, message: 'Invalid enquiry number' },
        { status: 200 }
      );
    }
    
    if (enquiry.status !== 'approved') {
      return NextResponse.json(
        { valid: false, message: 'Enquiry is not approved' },
        { status: 200 }
      );
    }
    
    return NextResponse.json({
      valid: true,
      message: 'Enquiry number is valid',
      enquiry: {
        _id: enquiry._id,
        studentName: enquiry.studentName,
        parentName: enquiry.parentName,
        classApplied: enquiry.classApplied
      }
    });
  } catch (error) {
    console.error('Error verifying enquiry number:', error);
    return NextResponse.json(
      { message: 'Failed to verify enquiry number' },
      { status: 500 }
    );
  }
}