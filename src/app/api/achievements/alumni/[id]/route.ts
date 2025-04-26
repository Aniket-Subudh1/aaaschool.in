import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getAlumniProfileById,
  updateAlumniProfile,
  deleteAlumniProfile
} from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

// GET a specific alumni profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const profile = await getAlumniProfileById(params.id);
    
    if (!profile) {
      return NextResponse.json(
        { message: 'Alumni profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching alumni profile:', error);
    return NextResponse.json(
      { message: 'Failed to fetch alumni profile' },
      { status: 500 }
    );
  }
}

// PUT to update a specific alumni profile
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

    const formData = await request.formData();
    
    // Get current profile to check if image is being replaced
    const currentProfile = await getAlumniProfileById(params.id);
    if (!currentProfile) {
      return NextResponse.json(
        { message: 'Alumni profile not found' },
        { status: 404 }
      );
    }
    
    // Extract profile details
    const name = formData.get('name') as string;
    const graduationYear = formData.get('graduationYear') as string;
    const currentPosition = formData.get('currentPosition') as string;
    const company = formData.get('company') as string;
    const achievement = formData.get('achievement') as string;
    const instagramPostUrl = formData.get('instagramPostUrl') as string;
    const category = formData.get('category') as string;
    const active = formData.get('active') === 'true';
    
    // Validate required fields
    if (!name || !graduationYear || !currentPosition || !company || !achievement) {
      return NextResponse.json(
        { message: 'Name, graduation year, current position, company, and achievement are required' },
        { status: 400 }
      );
    }
    
    // Validate Instagram post URL if provided
    if (instagramPostUrl) {
      const regex = /^https:\/\/(www\.)?instagram\.com\/p\/[\w-]+\/?/;
      if (!regex.test(instagramPostUrl)) {
        return NextResponse.json(
          { message: 'Invalid Instagram post URL format' },
          { status: 400 }
        );
      }
    }
    
    // Handle image upload if a new image is provided
    let imageUrl = currentProfile.imageUrl;
    let imagePublicId = currentProfile.imagePublicId;
    
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      try {
        // Upload new image
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadResult = await uploadToCloudinary(
          imageBuffer, 
          'school-achievements/alumni',
          `alumni-${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          imageFile.type
        );
        
        // Delete old image if it exists
        if (currentProfile.imagePublicId) {
          await deleteFromCloudinary(currentProfile.imagePublicId);
        }
        
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error handling image upload:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload profile image. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    // Update alumni profile
    const updateResult = await updateAlumniProfile(
      params.id,
      {
        name,
        graduationYear,
        currentPosition,
        company,
        achievement,
        instagramPostUrl,
        category,
        imageUrl,
        imagePublicId,
        active
      }
    );
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Alumni profile not found' },
        { status: 404 }
      );
    }
    
    const updatedProfile = await getAlumniProfileById(params.id);
    return NextResponse.json({
      message: 'Alumni profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Error updating alumni profile:', error);
    return NextResponse.json(
      { 
        message: 'Failed to update alumni profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE a specific alumni profile
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

    // Get profile to delete the image from Cloudinary
    const profile = await getAlumniProfileById(params.id);
    if (!profile) {
      return NextResponse.json(
        { message: 'Alumni profile not found' },
        { status: 404 }
      );
    }
    
    // Delete image from Cloudinary if it exists
    if (profile.imagePublicId) {
      try {
        await deleteFromCloudinary(profile.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }
    
    // Delete alumni profile from database
    const deleteResult = await deleteAlumniProfile(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Alumni profile not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Alumni profile deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting alumni profile:', error);
    return NextResponse.json(
      { 
        message: 'Failed to delete alumni profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}