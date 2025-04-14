import { NextRequest, NextResponse } from 'next/server';
import { getAnnouncements, createAnnouncement } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const onlyActive = searchParams.get('active') === 'true';
      
      const announcements = await getAnnouncements(onlyActive);
      return NextResponse.json(announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return NextResponse.json(
        { message: 'Failed to fetch announcements' },
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
    const { title, active = true } = body;

    if (!title) {
      return NextResponse.json(
        { message: 'Title is required' },
        { status: 400 }
      );
    }

    const newAnnouncement = await createAnnouncement({
      title,
      active,
      date: body.date,
    });

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json(
      { message: 'Failed to create announcement' },
      { status: 500 }
    );
  }
}