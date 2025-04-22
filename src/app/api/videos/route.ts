import { NextRequest, NextResponse } from 'next/server';
import { getVideos, createVideo, extractYouTubeId } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    
    const videos = await getVideos(onlyActive);
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { message: 'Failed to fetch videos' },
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

    const body = await request.json();
    const { title, description, youtubeUrl, active = true } = body;
    
    if (!title || !youtubeUrl) {
      return NextResponse.json(
        { message: 'Title and YouTube URL are required' },
        { status: 400 }
      );
    }
    
    // Extract YouTube ID from URL
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json(
        { message: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }
    
    // Generate thumbnail URL
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    
    // Create video in database
    const newVideo = await createVideo({
      title,
      description,
      youtubeUrl,
      youtubeId,
      thumbnailUrl,
      active
    });
    
    return NextResponse.json(
      { 
        message: 'Video added successfully', 
        video: newVideo 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding video:', error);
    return NextResponse.json(
      { message: 'Failed to add video' },
      { status: 500 }
    );
  }
}