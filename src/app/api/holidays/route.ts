import { NextRequest, NextResponse } from 'next/server';
import { getHolidays, createHoliday } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get('active') === 'true';
    
    const holidays = await getHolidays(onlyActive);
    return NextResponse.json({
      message: 'Holidays retrieved successfully',
      holidays: holidays,
      count: holidays.length
    });
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return NextResponse.json(
      { message: 'Failed to fetch holidays' },
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
    const { date, name, type, active = true } = body;

    if (!date || !name || !type) {
      return NextResponse.json(
        { message: 'Date, name, and type are required' },
        { status: 400 }
      );
    }

    const newHoliday = await createHoliday({
      date,
      name,
      type,
      description: body.description,
      active,
    });

    return NextResponse.json({
      message: 'Holiday added successfully',
      holiday: newHoliday
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating holiday:', error);
    return NextResponse.json(
      { 
        message: 'Failed to create holiday',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}