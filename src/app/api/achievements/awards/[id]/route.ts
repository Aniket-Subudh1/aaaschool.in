import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getAwardById,
  updateAward,
  deleteAward
} from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

// GET a specific award
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const award = await getAwardById(params.id);
    
    if (!award) {
      return NextResponse.json(
        { message: 'Award not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(award);
  } catch (error) {
    console.error('Error fetching award:', error);
    return NextResponse.json(
      { message: 'Failed to fetch award' },
      { status: 500 }
    );
  }
}

// PUT to update a specific award
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

    const formData = await request.formData();
    
    // Get current award to check if image is being replaced
    const currentAward = await getAwardById(params.id);
    if (!currentAward) {
      return NextResponse.json(
        { message: 'Award not found' },
        { status: 404 }
      );
    }
    
    // Extract award details
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const recipient = formData.get('recipient') as string;
    const active = formData.get('active') === 'true';
    
    // Validate required fields
    if (!title || !description || !date) {
      return NextResponse.json(
        { message: 'Title, description, and date are required' },
        { status: 400 }
      );
    }
    
    // Handle image upload if a new image is provided
    let imageUrl = currentAward.imageUrl;
    let imagePublicId = currentAward.imagePublicId;
    
    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0) {
      try {
        // Upload new image
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadResult = await uploadToCloudinary(
          imageBuffer, 
          'school-achievements/awards',
          `award-${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
          imageFile.type
        );
        
        // Delete old image if it exists
        if (currentAward.imagePublicId) {
          await deleteFromCloudinary(currentAward.imagePublicId);
        }
        
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error handling image upload:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload image. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    // Update award
    const updateResult = await updateAward(
      params.id,
      {
        title,
        description,
        date,
        imageUrl,
        imagePublicId,
        category,
        recipient,
        active
      }
    );
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Award not found' },
        { status: 404 }
      );
    }
    
    const updatedAward = await getAwardById(params.id);
    return NextResponse.json({
      message: 'Award updated successfully',
      award: updatedAward
    });
  } catch (error) {
    console.error('Error updating award:', error);
    return NextResponse.json(
      { 
        message: 'Failed to update award',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE a specific award
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

    // Get award to delete the image from Cloudinary
    const award = await getAwardById(params.id);
    if (!award) {
      return NextResponse.json(
        { message: 'Award not found' },
        { status: 404 }
      );
    }
    
    // Delete image from Cloudinary if it exists
    if (award.imagePublicId) {
      try {
        await deleteFromCloudinary(award.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }
    
    // Delete award from database
    const deleteResult = await deleteAward(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Award not found or already deleted' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Award deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting award:', error);
    return NextResponse.json(
      { 
        message: 'Failed to delete award',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}