import { NextRequest, NextResponse } from 'next/server';
import { getFaculty, createFaculty } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    const department = searchParams.get('department');
    
    const faculty = await getFaculty(onlyActive);
    
    // If department is specified, filter by department
    const filteredFaculty = department 
      ? faculty.filter(f => f.department === department)
      : faculty;
      
    return NextResponse.json(filteredFaculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return NextResponse.json(
      { message: 'Failed to fetch faculty' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const department = formData.get('department') as string;
    const email = formData.get('email') as string;
    const bio = formData.get('bio') as string;
    const qualificationsStr = formData.get('qualifications') as string;
    const joinDate = formData.get('joinDate') as string;
    const active = formData.get('active') === 'true';
    
    if (!name || !position || !department) {
      return NextResponse.json(
        { message: 'Name, position, and department are required' },
        { status: 400 }
      );
    }
    
    // Parse qualifications if provided
    const qualifications = qualificationsStr?.split(',').map(q => q.trim()).filter(Boolean);
    
    let photoUrl = '';
    let photoPublicId = '';
    
    // Handle photo upload (now optional)
    const photo = formData.get('photo') as File;
    if (photo && photo instanceof File && photo.size > 0) {
      // Convert file to buffer for Cloudinary upload
      const fileBuffer = Buffer.from(await photo.arrayBuffer());
      
      const sanitizedFilename = `faculty-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      const uploadResult = await uploadToCloudinary(
        fileBuffer, 
        'school-faculty',
        sanitizedFilename,
        photo.type
      );
      
      photoUrl = uploadResult.secure_url;
      photoPublicId = uploadResult.public_id;
    }
    
    // Create faculty record
    const newFaculty = await createFaculty({
      name,
      position,
      department,
      email,
      photoUrl,
      photoPublicId,
      bio,
      qualifications,
      joinDate,
      active
    });
    
    return NextResponse.json(
      { 
        message: 'Faculty added successfully', 
        faculty: newFaculty 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating faculty:', error);
    return NextResponse.json(
      { message: 'Failed to add faculty' },
      { status: 500 }
    );
  }
}