import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getSportsAchievementById,
  updateSportsAchievement,
  deleteSportsAchievement
} from '@/lib/db';

// GET a specific sports achievement
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const achievement = await getSportsAchievementById(params.id);
    
    if (!achievement) {
      return NextResponse.json(
        { message: 'Sports achievement not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Error fetching sports achievement:', error);
    return NextResponse.json(
      { message: 'Failed to fetch sports achievement' },
      { status: 500 }
    );
  }
}

// PUT to update a specific sports achievement
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
    const { name, class: studentClass, event, award, year, active } = body;
    
    // Validate required fields
    if (!name || !studentClass || !event || !award || !year) {
      return NextResponse.json(
        { message: 'Name, class, event, award, and year are required' },
        { status: 400 }
      );
    }
    
    // Update sports achievement
    const updateResult = await updateSportsAchievement(
      params.id,
      {
        name,
        class: studentClass,
        event,
        award,
        year,
        active
      }
    );
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Sports achievement not found' },
        { status: 404 }
      );
    }
    
    const updatedAchievement = await getSportsAchievementById(params.id);
    return NextResponse.json({
      message: 'Sports achievement updated successfully',
      achievement: updatedAchievement
    });
  } catch (error) {
    console.error('Error updating sports achievement:', error);
    return NextResponse.json(
      { 
        message: 'Failed to update sports achievement',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE a specific sports achievement
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
    
    // Delete sports achievement from database
    const deleteResult = await deleteSportsAchievement(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Sports achievement not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Sports achievement deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting sports achievement:', error);
    return NextResponse.json(
      { 
        message: 'Failed to delete sports achievement',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}