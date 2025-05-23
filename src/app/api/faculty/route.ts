// Update src/app/api/faculty/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFaculty, createFaculty } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    const department = searchParams.get('department');
    const staffType = searchParams.get('staffType');
    
    const faculty = await getFaculty(onlyActive);
    
    let filteredFaculty = faculty;
    
    if (department) {
      filteredFaculty = filteredFaculty.filter(f => f.department === department);
    }
    
    if (staffType) {
      filteredFaculty = filteredFaculty.filter(f => {
        const memberStaffType = f.staffType || 'normal';
        return memberStaffType === staffType;
      });
    }
      
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
    
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const department = formData.get('department') as string;
    const email = formData.get('email') as string;
    const bio = formData.get('bio') as string;
    const qualificationsStr = formData.get('qualifications') as string;
    const joinDate = formData.get('joinDate') as string;
    const staffType = formData.get('staffType') as 'normal' | 'office' | 'supporting';
    const active = formData.get('active') === 'true';
    
    if (!name || !position || !department) {
      return NextResponse.json(
        { message: 'Name, position, and department are required' },
        { status: 400 }
      );
    }
    
    const qualifications = qualificationsStr?.split(',').map(q => q.trim()).filter(Boolean);
    
    let photoUrl = '';
    let photoPublicId = '';
    
    const photo = formData.get('photo') as File;
    if (photo && photo instanceof File && photo.size > 0) {
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
      staffType: staffType || 'normal',
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