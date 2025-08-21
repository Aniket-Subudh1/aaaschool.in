import { NextRequest, NextResponse } from 'next/server';
import { getBannerById, updateBanner, deleteBanner } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { deleteFromCloudinary, uploadToCloudinary } from '@/lib/cloudinary';

interface BannerUpdateData {
  title: string;
  linkUrl?: string;
  order: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  imagePublicId?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const banner = await getBannerById(params.id);
    
    if (!banner) {
      return NextResponse.json(
        { message: 'Banner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    return NextResponse.json(
      { message: 'Failed to fetch banner' },
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
    
    const title = formData.get('title') as string;
    const linkUrl = formData.get('linkUrl') as string || '';
    const order = parseInt(formData.get('order') as string) || 0;
    const active = formData.get('active') === 'true';
    const startDate = formData.get('startDate') as string || undefined;
    const endDate = formData.get('endDate') as string || undefined;
    const newImage = formData.get('image') as File | null;
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }

    // Get existing banner
    const existingBanner = await getBannerById(params.id);
    if (!existingBanner) {
      return NextResponse.json(
        { message: 'Banner not found' },
        { status: 404 }
      );
    }

    const updateData: BannerUpdateData = {
      title,
      linkUrl: linkUrl || undefined,
      order,
      active,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };

    // Handle image update if new image is provided
    if (newImage) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(newImage.type)) {
        return NextResponse.json(
          { message: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (newImage.size > maxSize) {
        return NextResponse.json(
          { message: 'File is too large. Maximum size is 5MB' },
          { status: 400 }
        );
      }

      // Upload new image
      const imageBuffer = Buffer.from(await newImage.arrayBuffer());
      const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      
      const uploadResult = await uploadToCloudinary(
        imageBuffer,
        'banners',
        `banner-${sanitizedTitle}-${Date.now()}`
      );

      // Delete old image
      if (existingBanner.imagePublicId) {
        try {
          await deleteFromCloudinary(existingBanner.imagePublicId);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }

      updateData.imageUrl = uploadResult.secure_url;
      updateData.imagePublicId = uploadResult.public_id;
    }
    
    const updateResult = await updateBanner(params.id, updateData);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Banner not found' },
        { status: 404 }
      );
    }
    
    const updatedBanner = await getBannerById(params.id);
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json(
      { message: 'Failed to update banner' },
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

    // Get banner to delete associated image
    const banner = await getBannerById(params.id);
    if (!banner) {
      return NextResponse.json(
        { message: 'Banner not found' },
        { status: 404 }
      );
    }

    // Delete image from cloudinary
    if (banner.imagePublicId) {
      try {
        await deleteFromCloudinary(banner.imagePublicId);
      } catch (error) {
        console.error('Error deleting banner image:', error);
      }
    }

    const deleteResult = await deleteBanner(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Banner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json(
      { message: 'Failed to delete banner' },
      { status: 500 }
    );
  }
}