import { NextRequest, NextResponse } from 'next/server';
import { getVideoById, updateVideo, deleteVideo, extractYouTubeId } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const video = await getVideoById(params.id);
    
    if (!video) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { message: 'Failed to fetch video' },
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
    const { title, description, youtubeUrl, active } = body;
    
    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }
    
    const video = await getVideoById(params.id);
    if (!video) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }
    
    interface VideoUpdate {
      title: string;
      description?: string;
      active?: boolean;
      youtubeUrl?: string;
      youtubeId?: string;
      thumbnailUrl?: string;
    }
    
    const updateData: VideoUpdate = {
      title,
      description,
      active
    };
    
    // Only update YouTube info if URL has changed
    if (youtubeUrl && youtubeUrl !== video.youtubeUrl) {
      const youtubeId = extractYouTubeId(youtubeUrl);
      if (!youtubeId) {
        return NextResponse.json(
          { message: 'Invalid YouTube URL' },
          { status: 400 }
        );
      }
      
      updateData.youtubeUrl = youtubeUrl;
      updateData.youtubeId = youtubeId;
      updateData.thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    }
    
    const updateResult = await updateVideo(params.id, updateData);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }
    
    const updatedVideo = await getVideoById(params.id);
    return NextResponse.json({
      message: 'Video updated successfully',
      video: updatedVideo
    });
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json(
      { message: 'Failed to update video' },
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

    // Get video before deletion
    const video = await getVideoById(params.id);
    if (!video) {
      return NextResponse.json(
        { message: 'Video not found' },
        { status: 404 }
      );
    }
    
    // Delete video from database
    const deleteResult = await deleteVideo(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Video not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { message: 'Failed to delete video' },
      { status: 500 }
    );
  }
}