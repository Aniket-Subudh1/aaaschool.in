import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getAcademicAchievements,
  createAcademicAchievement
} from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET all academic achievements
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get("active") === "true";
    
    const achievements = await getAcademicAchievements(onlyActive);
    
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Error fetching academic achievements:', error);
    return NextResponse.json(
      { message: 'Failed to fetch academic achievements' },
      { status: 500 }
    );
  }
}

// POST to create a new academic achievement
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
    
    // Handle photo upload
    let photoUrl: string | undefined;
    let photoPublicId: string | undefined;
    
    const photoFile = formData.get('photo') as File;
    if (photoFile && photoFile.size > 0) {
      try {
        const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
        const uploadResult = await uploadToCloudinary(
          photoBuffer, 
          'school-achievements/academic',
          `academic-${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          photoFile.type
        );
        
        photoUrl = uploadResult.secure_url;
        photoPublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error uploading photo to Cloudinary:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload photo. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Create academic achievement
    const newAchievement = await createAcademicAchievement({
      name,
      class: studentClass,
      photoUrl,
      photoPublicId,
      marks: marksNumber,
      stream,
      achievement,
      year,
      active
    });

    return NextResponse.json(
      { 
        message: 'Academic achievement created successfully', 
        achievement: newAchievement 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating academic achievement:', error);
    return NextResponse.json(
      { message: 'Failed to create academic achievement' },
      { status: 500 }
    );
  }
}