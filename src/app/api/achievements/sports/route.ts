import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getSportsAchievements,
  createSportsAchievement
} from '@/lib/db';

// GET all sports achievements
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get("active") === "true";
    
    const achievements = await getSportsAchievements(onlyActive);
    
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Error fetching sports achievements:', error);
    return NextResponse.json(
      { message: 'Failed to fetch sports achievements' },
      { status: 500 }
    );
  }
}

// POST to create a new sports achievement
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
    const { name, class: studentClass, event, award, year, active = true } = body;
    
    // Validate required fields
    if (!name || !studentClass || !event || !award || !year) {
      return NextResponse.json(
        { message: 'Name, class, event, award, and year are required' },
        { status: 400 }
      );
    }
    
    // Create sports achievement
    const newAchievement = await createSportsAchievement({
      name,
      class: studentClass,
      event,
      award,
      year,
      active
    });

    return NextResponse.json(
      { 
        message: 'Sports achievement created successfully', 
        achievement: newAchievement 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating sports achievement:', error);
    return NextResponse.json(
      { message: 'Failed to create sports achievement' },
      { status: 500 }
    );
  }
}