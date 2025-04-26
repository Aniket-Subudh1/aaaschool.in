import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getAlumniProfiles,
  createAlumniProfile
} from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET all alumni profiles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get("active") === "true";
    
    const profiles = await getAlumniProfiles(onlyActive);
    
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching alumni profiles:', error);
    return NextResponse.json(
      { message: 'Failed to fetch alumni profiles' },
      { status: 500 }
    );
  }
}

// POST to create a new alumni profile
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
    
    // Handle image upload
    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;
    
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      try {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadResult = await uploadToCloudinary(
          imageBuffer, 
          'school-achievements/alumni',
          `alumni-${name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          imageFile.type
        );
        
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error uploading image to Cloudinary:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload profile image. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Create alumni profile
    const newProfile = await createAlumniProfile({
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
    });

    return NextResponse.json(
      { 
        message: 'Alumni profile created successfully', 
        profile: newProfile 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating alumni profile:', error);
    return NextResponse.json(
      { message: 'Failed to create alumni profile' },
      { status: 500 }
    );
  }
}