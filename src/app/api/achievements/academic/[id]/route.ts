import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getAcademicAchievementById,
  updateAcademicAchievement,
  deleteAcademicAchievement
} from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

// GET a specific academic achievement
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const achievement = await getAcademicAchievementById(params.id);
    
    if (!achievement) {
      return NextResponse.json(
        { message: 'Academic achievement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Error fetching academic achievement:', error);
    return NextResponse.json(
      { message: 'Failed to fetch academic achievement' },
      { status: 500 }
    );
  }
}

// PUT to update a specific academic achievement
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
    
    // Get current achievement to check if photo is being replaced
    const currentAchievement = await getAcademicAchievementById(params.id);
    if (!currentAchievement) {
      return NextResponse.json(
        { message: 'Academic achievement not found' },
        { status: 404 }
      );
    }
    
    // Extract achievement details
    const name = formData.get('name') as string;
    const studentClass = formData.get('class') as string;
    const marks = formData.get('marks') as string;
    const stream = formData.get('stream') as string;
    const achievement = formData.get('achievement') as string;
    const year = formData.get('year') as string;
    const active = formData.get('active') === 'true';
    
    // Validate required fields
    if (!name || !studentClass || !marks || !stream || !achievement || !year) {
      return NextResponse.json(
        { message: 'Name, class, marks, stream, achievement, and year are required' },
        { status: 400 }
      );
    }

    // Validate marks is a number
    const marksNumber = parseFloat(marks);
    if (isNaN(marksNumber) || marksNumber < 0 || marksNumber > 100) {
      return NextResponse.json(
        { message: 'Marks must be a valid number between 0 and 100' },
        { status: 400 }
      );
    }
    
    // Handle photo upload if a new photo is provided
    let photoUrl = currentAchievement.photoUrl;
    let photoPublicId = currentAchievement.photoPublicId;
    
    const photoFile = formData.get('photo') as File;
    if (photoFile && photoFile.size > 0) {
      try {
        // Upload new photo
        const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
        const uploadResult = await uploadToCloudinary(
          photoBuffer, 
          'school-achievements/academic',
          `academic-${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          photoFile.type
        );
        
        // Delete old photo if it exists
        if (currentAchievement.photoPublicId) {
          await deleteFromCloudinary(currentAchievement.photoPublicId);
        }
        
        photoUrl = uploadResult.secure_url;
        photoPublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error handling photo upload:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload photo. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    // Update academic achievement
    const updateResult = await updateAcademicAchievement(
      params.id,
      {
        name,
        class: studentClass,
        photoUrl,
        photoPublicId,
        marks: marksNumber,
        stream,
        achievement,
        year,
        active
      }
    );
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Academic achievement not found' },
        { status: 404 }
      );
    }
    
    const updatedAchievement = await getAcademicAchievementById(params.id);
    return NextResponse.json({
      message: 'Academic achievement updated successfully',
      achievement: updatedAchievement
    });
  } catch (error) {
    console.error('Error updating academic achievement:', error);
    return NextResponse.json(
      { 
        message: 'Failed to update academic achievement',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE a specific academic achievement
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

    // Get achievement to delete the photo from Cloudinary
    const achievement = await getAcademicAchievementById(params.id);
    if (!achievement) {
      return NextResponse.json(
        { message: 'Academic achievement not found' },
        { status: 404 }
      );
    }
    
    // Delete photo from Cloudinary if it exists
    if (achievement.photoPublicId) {
      try {
        await deleteFromCloudinary(achievement.photoPublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting photo from Cloudinary:', cloudinaryError);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }
    
    // Delete academic achievement from database
    const deleteResult = await deleteAcademicAchievement(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Academic achievement not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Academic achievement deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting academic achievement:', error);
    return NextResponse.json(
      { 
        message: 'Failed to delete academic achievement',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}