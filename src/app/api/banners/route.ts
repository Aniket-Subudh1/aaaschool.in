import { NextRequest, NextResponse } from 'next/server';
import { getBanners, createBanner } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    
    // Allow public access for getting active banners
    await verifyAuth(request, { allowPublic: true });
    
    const banners = await getBanners(onlyActive);
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { message: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication for creating banners
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
    const image = formData.get('image') as File;
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }
    
    if (!image) {
      return NextResponse.json(
        { message: 'Image is required' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(image.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (image.size > maxSize) {
      return NextResponse.json(
        { message: 'File is too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    // Upload image to cloudinary
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    
    const uploadResult = await uploadToCloudinary(
      imageBuffer,
      'banners',
      `banner-${sanitizedTitle}-${Date.now()}`
    );

    const newBanner = await createBanner({
      title,
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      linkUrl: linkUrl || undefined,
      order,
      active,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });

    return NextResponse.json(
      { 
        message: 'Banner created successfully', 
        banner: newBanner 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { message: 'Failed to create banner' },
      { status: 500 }
    );
  }
}