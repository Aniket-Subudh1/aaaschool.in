import { NextRequest, NextResponse } from 'next/server';
import { 
  getStudyMaterialById, 
  updateStudyMaterial, 
  deleteStudyMaterial 
} from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Allow public access
    await verifyAuth(request, { allowPublic: true });

    const studyMaterial = await getStudyMaterialById(params.id);
    
    if (!studyMaterial) {
      return NextResponse.json(
        { message: 'Study material not found' },
        { status: 404 }
      );
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { filePublicId, uploadedBy, ...sanitizedMaterial } = studyMaterial;
    
    return NextResponse.json(sanitizedMaterial);
  } catch (error) {
    console.error('Error fetching study material:', error);
    return NextResponse.json(
      { message: 'Failed to fetch study material' },
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
    const updateResult = await updateStudyMaterial(params.id, body);
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Study material not found' },
        { status: 404 }
      );
    }
    
    const updatedStudyMaterial = await getStudyMaterialById(params.id);
    return NextResponse.json(updatedStudyMaterial);
  } catch (error) {
    console.error('Error updating study material:', error);
    return NextResponse.json(
      { message: 'Failed to update study material' },
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

    const studyMaterial = await getStudyMaterialById(params.id);
    if (!studyMaterial) {
      return NextResponse.json(
        { message: 'Study material not found' },
        { status: 404 }
      );
    }

    // Delete file from Cloudinary
    if (studyMaterial.filePublicId) {
      try {
        await deleteFromCloudinary(studyMaterial.filePublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting file from Cloudinary:', cloudinaryError);
      }
    }

    const deleteResult = await deleteStudyMaterial(params.id);
    
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Study material not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Study material deleted successfully' });
  } catch (error) {
    console.error('Error deleting study material:', error);
    return NextResponse.json(
      { message: 'Failed to delete study material' },
      { status: 500 }
    );
  }
}