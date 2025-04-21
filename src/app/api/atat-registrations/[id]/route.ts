import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';
import { ObjectId } from 'mongodb';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAuth(request);
    
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Registration ID is required' },
        { status: 400 }
      );
    }
    // Get the collection
    const collection = await getCollection('atatRegistrations');
    
    // Fetch registration by ID
    const registration = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!registration) {
      return NextResponse.json(
        { message: 'Registration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error fetching ATAT registration:', error);
    return NextResponse.json(
      { message: 'Failed to fetch registration' },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Registration ID is required' },
        { status: 400 }
      );
    }
    
    // Parse request body
    const data = await request.json();
    
    // Get the collection
    const collection = await getCollection('atatRegistrations');
    
    // Add update timestamp
    const now = new Date();
    const updateData = {
      ...data,
      updatedAt: now
    };
    
    // Update registration
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return NextResponse.json(
        { message: 'Registration not found or update failed' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating ATAT registration:', error);
    return NextResponse.json(
      { message: 'Failed to update registration' },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete a registration by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Registration ID is required' },
        { status: 400 }
      );
    }
    
    // Get the collection
    const collection = await getCollection('atatRegistrations');
    
    // First, get the registration to access its cloudinary public IDs
    const registration = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!registration) {
      return NextResponse.json(
        { message: 'Registration not found' },
        { status: 404 }
      );
    }
    
    // Delete associated files from Cloudinary
    if (registration.photoPublicId) {
      try {
        await deleteFromCloudinary(registration.photoPublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting photo from Cloudinary:', cloudinaryError);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }
    
    if (registration.admitCardPublicId) {
      try {
        await deleteFromCloudinary(registration.admitCardPublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting admit card from Cloudinary:', cloudinaryError);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }
    
    // Delete registration from database
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Registration not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Registration deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting ATAT registration:', error);
    return NextResponse.json(
      { message: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}