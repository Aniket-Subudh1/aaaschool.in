import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getAwards,
  createAward,
 
} from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET all awards
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get("active") === "true";
    
    const awards = await getAwards(onlyActive);
    
    return NextResponse.json(awards);
  } catch (error) {
    console.error('Error fetching awards:', error);
    return NextResponse.json(
      { message: 'Failed to fetch awards' },
      { status: 500 }
    );
  }
}

// POST to create a new award
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
    
    // Extract award details
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const recipient = formData.get('recipient') as string;
    const active = formData.get('active') === 'true';
    
    // Validate required fields
    if (!title || !description || !date) {
      return NextResponse.json(
        { message: 'Title, description, and date are required' },
        { status: 400 }
      );
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
          'school-achievements/awards',
          `award-${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          imageFile.type
        );
        
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error uploading image to Cloudinary:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload image. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    if (!imageUrl) {
      return NextResponse.json(
        { message: 'Award image is required' },
        { status: 400 }
      );
    }

    // Create award
    const newAward = await createAward({
      title,
      description,
      date,
      imageUrl,
      imagePublicId: imagePublicId || '', 
      category,
      recipient,
      active
    });

    return NextResponse.json(
      { 
        message: 'Award created successfully', 
        award: newAward 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating award:', error);
    return NextResponse.json(
      { message: 'Failed to create award' },
      { status: 500 }
    );
  }
}