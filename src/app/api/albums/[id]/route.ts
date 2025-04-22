import { NextRequest, NextResponse } from 'next/server';
import { getAlbumById, updateAlbum, deleteAlbum, getPhotosByAlbumId } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const album = await getAlbumById(params.id);
    
    if (!album) {
      return NextResponse.json(
        { message: 'Album not found' },
        { status: 404 }
      );
    }
    
    // Get photos for this album as well
    const photos = await getPhotosByAlbumId(params.id);
    
    return NextResponse.json({
      album,
      photos
    });
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json(
      { message: 'Failed to fetch album' },
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
    const { title, description, active } = body;
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }
    
    const updateResult = await updateAlbum(params.id, {
      title,
      description,
      active
    });
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Album not found' },
        { status: 404 }
      );
    }
    
    const updatedAlbum = await getAlbumById(params.id);
    return NextResponse.json({
      message: 'Album updated successfully',
      album: updatedAlbum
    });
  } catch (error) {
    console.error('Error updating album:', error);
    return NextResponse.json(
      { message: 'Failed to update album' },
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

    // Get album and associated photos before deletion
    const album = await getAlbumById(params.id);
    if (!album) {
      return NextResponse.json(
        { message: 'Album not found' },
        { status: 404 }
      );
    }
    
    const photos = await getPhotosByAlbumId(params.id);
    
    // Delete the cover image from Cloudinary
    try {
      await deleteFromCloudinary(album.coverImagePublicId);
    } catch (cloudinaryError) {
      console.error('Error deleting cover image from Cloudinary:', cloudinaryError);
      // Continue with deletion even if Cloudinary deletion fails
    }
    
    // Delete all photos from Cloudinary
    for (const photo of photos) {
      try {
        await deleteFromCloudinary(photo.imagePublicId);
      } catch (cloudinaryError) {
        console.error(`Error deleting photo ${photo._id} from Cloudinary:`, cloudinaryError);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }
    
    // Delete album from database
    const deleteResult = await deleteAlbum(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Album not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Album and associated photos deleted successfully',
      deletedPhotosCount: photos.length
    });
  } catch (error) {
    console.error('Error deleting album:', error);
    return NextResponse.json(
      { message: 'Failed to delete album' },
      { status: 500 }
    );
  }
}