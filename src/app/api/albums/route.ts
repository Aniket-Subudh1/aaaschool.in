import { NextRequest, NextResponse } from 'next/server';
import { getAlbums, createAlbum } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    
    const albums = await getAlbums(onlyActive);
    return NextResponse.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json(
      { message: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
    const description = formData.get('description') as string;
    const active = formData.get('active') === 'true';
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }
    
    // Handle the cover image upload
    const coverImage = formData.get('coverImage') as File;
    if (!coverImage || !(coverImage instanceof File)) {
      return NextResponse.json(
        { message: 'Cover image is required' },
        { status: 400 }
      );
    }
    
    const fileBuffer = Buffer.from(await coverImage.arrayBuffer());
    
    const sanitizedFilename = title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    const uploadResult = await uploadToCloudinary(
      fileBuffer, 
      'school-gallery/albums',
      sanitizedFilename,
      coverImage.type
    );
    
    const newAlbum = await createAlbum({
      title,
      description,
      coverImageUrl: uploadResult.secure_url,
      coverImagePublicId: uploadResult.public_id,
      active
    });
    
    return NextResponse.json(
      { 
        message: 'Album created successfully', 
        album: newAlbum 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating album:', error);
    return NextResponse.json(
      { message: 'Failed to create album' },
      { status: 500 }
    );
  }
}