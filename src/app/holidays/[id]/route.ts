import { NextRequest, NextResponse } from 'next/server';
import { getHolidayById, updateHoliday, deleteHoliday } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const holiday = await getHolidayById(params.id);
    
    if (!holiday) {
      return NextResponse.json(
        { message: 'Holiday not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(holiday);
  } catch (error) {
    console.error('Error fetching holiday:', error);
    return NextResponse.json(
      { message: 'Failed to fetch holiday' },
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
    const updateResult = await updateHoliday(params.id, body);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Holiday not found' },
        { status: 404 }
      );
    }
    
    const updatedHoliday = await getHolidayById(params.id);
    return NextResponse.json(updatedHoliday);
  } catch (error) {
    console.error('Error updating holiday:', error);
    return NextResponse.json(
      { message: 'Failed to update holiday' },
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

    const deleteResult = await deleteHoliday(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Holiday not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    return NextResponse.json(
      { message: 'Failed to delete holiday' },
      { status: 500 }
    );
  }
}