import { NextRequest, NextResponse } from 'next/server';
import { getNewsBulletinById, updateNewsBulletin, deleteNewsBulletin } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bulletin = await getNewsBulletinById(params.id);
    
    if (!bulletin) {
      return NextResponse.json(
        { message: 'News bulletin not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(bulletin);
  } catch (error) {
    console.error('Error fetching news bulletin:', error);
    return NextResponse.json(
      { message: 'Failed to fetch news bulletin' },
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

    const formData = await request.formData();
    
    // Get the existing bulletin
    const bulletin = await getNewsBulletinById(params.id);
    if (!bulletin) {
      return NextResponse.json(
        { message: 'News bulletin not found' },
        { status: 404 }
      );
    }
    
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
    
    // Parse publish date
    const publishDate = publishDateStr ? new Date(publishDateStr) : bulletin.publishDate;
    
    const updateData: {
      title: string;
      publishDate: Date;
      active: boolean;
      imageUrl?: string;
      imagePublicId?: string;
    } = {
      title,
      publishDate,
      active
    };
    
    // Check if a new image was uploaded
    const newImage = formData.get('image') as File;
    if (newImage && newImage instanceof File && newImage.size > 0) {
      // Delete the old image from Cloudinary
      try {
        await deleteFromCloudinary(bulletin.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting old image from Cloudinary:', cloudinaryError);
      }
      
      const fileBuffer = Buffer.from(await newImage.arrayBuffer());
      
      const sanitizedFilename = `news-bulletin-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
      
      const uploadResult = await uploadToCloudinary(
        fileBuffer, 
        'school-gallery/news-bulletins',
        sanitizedFilename,
        newImage.type
      );
      
      updateData.imageUrl = uploadResult.secure_url;
      updateData.imagePublicId = uploadResult.public_id;
    }
    
    const updateResult = await updateNewsBulletin(params.id, updateData);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'News bulletin not found' },
        { status: 404 }
      );
    }
    
    const updatedBulletin = await getNewsBulletinById(params.id);
    return NextResponse.json({
      message: 'News bulletin updated successfully',
      bulletin: updatedBulletin
    });
  } catch (error) {
    console.error('Error updating news bulletin:', error);
    return NextResponse.json(
      { message: 'Failed to update news bulletin' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const bulletin = await getNewsBulletinById(params.id);
    if (!bulletin) {
      return NextResponse.json(
        { message: 'News bulletin not found' },
        { status: 404 }
      );
    }
    
    try {
      await deleteFromCloudinary(bulletin.imagePublicId);
    } catch (cloudinaryError) {
      console.error('Error deleting image from Cloudinary:', cloudinaryError);
    }
    
    const deleteResult = await deleteNewsBulletin(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'News bulletin not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'News bulletin deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting news bulletin:', error);
    return NextResponse.json(
      { message: 'Failed to delete news bulletin' },
      { status: 500 }
    );
  }
}