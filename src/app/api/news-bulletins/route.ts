import { NextRequest, NextResponse } from 'next/server';
import { getNewsBulletins, createNewsBulletin } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    
    const bulletins = await getNewsBulletins(onlyActive);
    return NextResponse.json(bulletins);
  } catch (error) {
    console.error('Error fetching news bulletins:', error);
    return NextResponse.json(
      { message: 'Failed to fetch news bulletins' },
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
    const title = formData.get('title') as string;
    const publishDateStr = formData.get('publishDate') as string;
    const active = formData.get('active') === 'true';
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }
    
    // Parse publish date (default to current date if not provided)
    const publishDate = publishDateStr ? new Date(publishDateStr) : new Date();
    
    // Handle the bulletin image upload
    const bulletinImage = formData.get('image') as File;
    if (!bulletinImage || !(bulletinImage instanceof File)) {
      return NextResponse.json(
        { message: 'Bulletin image is required' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const fileBuffer = Buffer.from(await bulletinImage.arrayBuffer());
    
    // Generate a clean filename
    const sanitizedFilename = `news-bulletin-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    
    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      fileBuffer, 
      'school-gallery/news-bulletins',
      sanitizedFilename,
      bulletinImage.type
    );
    
    // Create news bulletin in database
    const newBulletin = await createNewsBulletin({
      title,
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      publishDate,
      active
    });
    
    return NextResponse.json(
      { 
        message: 'News bulletin created successfully', 
        bulletin: newBulletin 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating news bulletin:', error);
    return NextResponse.json(
      { message: 'Failed to create news bulletin' },
      { status: 500 }
    );
  }
}