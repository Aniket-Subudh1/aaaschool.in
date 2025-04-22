import { NextRequest, NextResponse } from 'next/server';
import { getPhotosByAlbumId, createPhoto, getPhotoCountByAlbumId, getAlbumById } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const albumId = searchParams.get('albumId');
    
    if (!albumId) {
      return NextResponse.json(
        { message: 'Album ID is required' },
        { status: 400 }
      );
    }
    
    const photos = await getPhotosByAlbumId(albumId);
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { message: 'Failed to fetch photos' },
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
    const albumId = formData.get('albumId') as string;
    const caption = formData.get('caption') as string;
    const order = parseInt(formData.get('order') as string) || 0;
    
    if (!albumId) {
      return NextResponse.json(
        { message: 'Album ID is required' },
        { status: 400 }
      );
    }
    
    // Check if album exists
    const album = await getAlbumById(albumId);
    if (!album) {
      return NextResponse.json(
        { message: 'Album not found' },
        { status: 404 }
      );
    }
    
    // Check if album already has 10 photos
    const photoCount = await getPhotoCountByAlbumId(albumId);
    if (photoCount >= 10) {
      return NextResponse.json(
        { message: 'Maximum number of photos (10) reached for this album' },
        { status: 400 }
      );
    }
    
    // Handle the image upload
    const image = formData.get('image') as File;
    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { message: 'Image is required' },
        { status: 400 }
      );
    }
    
    const fileBuffer = Buffer.from(await image.arrayBuffer());
    
    const sanitizedFilename = `${album.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-photo-${Date.now()}`;
    
    
    const uploadResult = await uploadToCloudinary(
      fileBuffer, 
      `school-gallery/albums/${albumId}`,
      sanitizedFilename,
      image.type
    );
    
    const newPhoto = await createPhoto({
      albumId,
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      caption,
      order: order || photoCount + 1 
    });
    
    return NextResponse.json(
      { 
        message: 'Photo added to album successfully', 
        photo: newPhoto 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding photo:', error);
    return NextResponse.json(
      { message: 'Failed to add photo' },
      { status: 500 }
    );
  }
}