import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, createNotification } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    
    const notifications = await getNotifications(onlyActive);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { message: 'Failed to fetch notifications' },
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
    const { title, icon, active = true } = body;

    if (!title || !icon) {
      return NextResponse.json(
        { message: 'Title and icon are required' },
        { status: 400 }
      );
    }

    const newNotification = await createNotification({
      title,
      icon,
      active,
      date: body.date,
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { message: 'Failed to create notification' },
      { status: 500 }
    );
  }
}