import { NextRequest, NextResponse } from 'next/server';
import { getFacultyById, updateFaculty, deleteFaculty } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faculty = await getFacultyById(params.id);
    
    if (!faculty) {
      return NextResponse.json(
        { message: 'Faculty member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty member:', error);
    return NextResponse.json(
      { message: 'Failed to fetch faculty member' },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    
    // Get the existing faculty member
    const faculty = await getFacultyById(params.id);
    if (!faculty) {
      return NextResponse.json(
        { message: 'Faculty member not found' },
        { status: 404 }
      );
    }
    
    // Extract form fields
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
    
    const updateData: {
      name: string;
      position: string;
      department: string;
      email?: string;
      bio?: string;
      qualifications?: string[];
      joinDate?: string;
      staffType?: 'normal' | 'office' | 'supporting';
      active: boolean;
      photoUrl?: string;
      photoPublicId?: string;
    } = {
      name,
      position,
      department,
      bio,
      qualifications,
      joinDate,
      staffType: staffType || 'normal',
      active
    };
    
    // Only add email if provided
    if (email) {
      updateData.email = email;
    }
    
    // Check if a new photo was uploaded
    const photo = formData.get('photo') as File;
    if (photo && photo instanceof File && photo.size > 0) {
      // Delete the old photo from Cloudinary if it exists
      if (faculty.photoPublicId) {
        try {
          await deleteFromCloudinary(faculty.photoPublicId);
        } catch (cloudinaryError) {
          console.error('Error deleting old photo from Cloudinary:', cloudinaryError);
        }
      }
      
      const fileBuffer = Buffer.from(await photo.arrayBuffer());
      
      const sanitizedFilename = `faculty-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
      
      const uploadResult = await uploadToCloudinary(
        fileBuffer, 
        'school-faculty',
        sanitizedFilename,
        photo.type
      );
      
      updateData.photoUrl = uploadResult.secure_url;
      updateData.photoPublicId = uploadResult.public_id;
    }
    
    const updateResult = await updateFaculty(params.id, updateData);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Faculty member not found' },
        { status: 404 }
      );
    }
    
    const updatedFaculty = await getFacultyById(params.id);
    return NextResponse.json({
      message: 'Faculty member updated successfully',
      faculty: updatedFaculty
    });
  } catch (error) {
    console.error('Error updating faculty member:', error);
    return NextResponse.json(
      { message: 'Failed to update faculty member' },
      { status: 500 }
    );
  }
}



export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const faculty = await getFacultyById(params.id);
    if (!faculty) {
      return NextResponse.json(
        { message: 'Faculty member not found' },
        { status: 404 }
      );
    }
    
    // Delete the photo from Cloudinary if it exists
    if (faculty.photoPublicId) {
      try {
        await deleteFromCloudinary(faculty.photoPublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting photo from Cloudinary:', cloudinaryError);
      }
    }
    
    const deleteResult = await deleteFaculty(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Faculty member not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Faculty member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting faculty member:', error);
    return NextResponse.json(
      { message: 'Failed to delete faculty member' },
      { status: 500 }
    );
  }
}