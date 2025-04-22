import { NextRequest, NextResponse } from 'next/server';
import { getPhotoById, updatePhoto, deletePhoto } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const photo = await getPhotoById(params.id);
    
    if (!photo) {
      return NextResponse.json(
        { message: 'Photo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(photo);
  } catch (error) {
    console.error('Error fetching photo:', error);
    return NextResponse.json(
      { message: 'Failed to fetch photo' },
      { status: 500 }
    );
  }
}

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

    const body = await request.json();
    const { caption, order } = body;
    
    const photo = await getPhotoById(params.id);
    if (!photo) {
      return NextResponse.json(
        { message: 'Photo not found' },
        { status: 404 }
      );
    }
    
    const updateResult = await updatePhoto(params.id, {
      caption,
      order: order !== undefined ? order : photo.order
    });
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Photo not found' },
        { status: 404 }
      );
    }
    
    const updatedPhoto = await getPhotoById(params.id);
    return NextResponse.json({
      message: 'Photo updated successfully',
      photo: updatedPhoto
    });
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json(
      { message: 'Failed to update photo' },
      { status: 500 }
    );
  }
}

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

    // Get photo before deletion
    const photo = await getPhotoById(params.id);
    if (!photo) {
      return NextResponse.json(
        { message: 'Photo not found' },
        { status: 404 }
      );
    }
    
    // Delete the image from Cloudinary
    try {
      await deleteFromCloudinary(photo.imagePublicId);
    } catch (cloudinaryError) {
      console.error('Error deleting image from Cloudinary:', cloudinaryError);
      // Continue with deletion even if Cloudinary deletion fails
    }
    
    // Delete photo from database
    const deleteResult = await deletePhoto(params.id, photo.albumId);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Photo not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { message: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}