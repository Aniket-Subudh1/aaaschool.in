import { NextRequest, NextResponse } from 'next/server';
import { getCollection, generateRegistrationNumber } from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';


export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();
    
    // Extract fields from form data
    const studentName = formData.get('studentName') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const gender = formData.get('gender') as string;
    const parentName = formData.get('parentName') as string;
    const parentEmail = formData.get('parentEmail') as string;
    const parentPhone = formData.get('parentPhone') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const pincode = formData.get('pincode') as string;
    const currentSchool = formData.get('currentSchool') as string;
    const currentClass = formData.get('currentClass') as string;
    const applyingForClass = formData.get('applyingForClass') as string;
    const howDidYouHear = formData.get('howDidYouHear') as string;
    
    // Validate required fields
    if (!studentName || !dateOfBirth || !gender || !parentName || 
        !parentEmail || !parentPhone || !address || !city || 
        !state || !pincode || !currentSchool || !currentClass || 
        !applyingForClass) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }
    
    // Handle photo upload
    const photo = formData.get('photo') as File;
    let photoUrl = '';
    let photoPublicId = '';
    
    if (photo) {
      // Convert file to buffer for Cloudinary upload
      const photoBuffer = Buffer.from(await photo.arrayBuffer());
      
      try {
        // Upload to Cloudinary with current timestamp
        const uploadResult = await uploadToCloudinary(
          photoBuffer,
          'atat-registrations',
          `${studentName.replace(/\s+/g, '-').toLowerCase()}`
        ) as { secure_url: string; public_id: string };
        
        photoUrl = uploadResult.secure_url;
        photoPublicId = uploadResult.public_id;
      } catch (error) {
        console.error('Error uploading photo:', error);
        
        // Fallback: Use a placeholder image if Cloudinary upload fails
        photoUrl = '/placeholder-student.png';
        photoPublicId = 'placeholder';
        
        // For production, you might want to return an error instead
        // return NextResponse.json(
        //   { message: 'Failed to upload photo. Please try again.' },
        //   { status: 500 }
        // );
      }
    } else {
      return NextResponse.json(
        { message: 'Student photo is required' },
        { status: 400 }
      );
    }
    
    try {
      // Generate a unique registration number
      const registrationNumber = await generateRegistrationNumber();
      
      // Get the collection
      const collection = await getCollection('atatRegistrations');
      
      // Create the registration object
      const now = new Date();
      const registration = {
        registrationNumber,
        studentName,
        dateOfBirth,
        gender,
        photoUrl,
        photoPublicId,
        parentName,
        parentEmail,
        parentPhone,
        address,
        city,
        state,
        pincode,
        currentSchool,
        currentClass,
        applyingForClass,
        howDidYouHear: howDidYouHear || 'Not specified',
        status: 'pending', // Initial status
        testDate: '2025-05-15', // Hardcoded test date
        createdAt: now,
        updatedAt: now,
      };
      
      // Insert into database
      await collection.insertOne(registration);
      
      // Send confirmation email (simplified for this example)
      // In a real implementation, you would use a proper email service
      // like Nodemailer, SendGrid, etc.
      try {
        // Simulated email sending logic would go here
        console.log(`Email sent to ${parentEmail} for ATAT registration: ${registrationNumber}`);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue even if email fails
      }
      
      // Return success response
      return NextResponse.json(
        { 
          message: 'Registration successful',
          registrationNumber
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating ATAT registration:', error);
      return NextResponse.json(
        { message: 'Failed to create registration. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json(
      { message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle GET request to fetch all ATAT registrations (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify authentication (only admin users can access this)
    const authResult = await verifyAuth(request);
    
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get optional status filter from query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Get the collection
    const collection = await getCollection('atatRegistrations');
    
    // Build query based on optional status filter
    const query = status ? { status } : {};
    
    // Fetch registrations
    const registrations = await collection.find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching ATAT registrations:', error);
    return NextResponse.json(
      { message: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}