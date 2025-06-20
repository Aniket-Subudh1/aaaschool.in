import { NextRequest, NextResponse } from 'next/server';
import { 
  getStudyMaterials, 
  createStudyMaterial,
  validateFileType,
} from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const classFilter = searchParams.get('class') || undefined;
    const type = searchParams.get('type') || undefined;
    const active = searchParams.get('active') === 'true';

    await verifyAuth(request, { allowPublic: true });

    const studyMaterials = await getStudyMaterials({
      category,
      class: classFilter,
      type,
      active
    });

    return NextResponse.json(
      studyMaterials.map(material => ({
        _id: material._id,
        title: material.title,
        description: material.description,
        fileUrl: material.fileUrl,
        fileType: material.fileType,
        fileSize: material.fileSize,
        category: material.category,
        class: material.class,
        type: material.type,
        active: material.active
      }))
    );
  } catch (error) {
    console.error('Error fetching study materials:', error);
    return NextResponse.json(
      { message: 'Failed to fetch study materials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/study-materials - Starting upload process');
    
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      console.log('Authentication failed:', authResult.error);
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Authentication successful for user:', authResult.username);

    let formData;
    try {
      formData = await request.formData();
      console.log('FormData received successfully');
    } catch (formError) {
      console.error('Error parsing FormData:', formError);
      return NextResponse.json(
        { message: 'Invalid form data. File might be too large.' },
        { status: 400 }
      );
    }
    
    // Extract form fields with improved validation
    const title = formData.get('title')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const category = formData.get('category')?.toString().trim();
    const classFilter = formData.get('class')?.toString().trim();
    const type = formData.get('type')?.toString().trim();
    const active = formData.get('active') === 'true';

    console.log('Form fields extracted:', {
      title,
      description,
      category,
      class: classFilter,
      type,
      active
    });

    // Comprehensive validation
    const validationErrors: string[] = [];
    if (!title) validationErrors.push('Title is required');
    if (!category) validationErrors.push('Category is required');
    if (!classFilter) validationErrors.push('Class is required');

    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      validationErrors.push('File is required');
    }

    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return NextResponse.json(
        { message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    const uploadedFile = file as File;
    console.log('File details:', {
      name: uploadedFile.name,
      size: uploadedFile.size,
      type: uploadedFile.type
    });

    if (!validateFileType(uploadedFile)) {
      console.log('Invalid file type:', uploadedFile.type);
      return NextResponse.json(
        { message: 'Invalid file type. Only PDF, DOCX, DOC, JPG, and PNG are allowed.' },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    if (uploadedFile.size > MAX_FILE_SIZE) {
      console.log('File too large:', uploadedFile.size, 'bytes');
      return NextResponse.json(
        { message: 'File size exceeds 50MB limit' },
        { status: 400 }
      );
    }

    console.log('File validation passed, converting to buffer...');

    let fileBuffer;
    try {
      fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      console.log('File converted to buffer, size:', fileBuffer.length, 'bytes');
    } catch (bufferError) {
      console.error('Error converting file to buffer:', bufferError);
      return NextResponse.json(
        { message: 'Error processing file. Please try again.' },
        { status: 500 }
      );
    }

    // Generate a clean filename
    const sanitizedFilename = (title || 'untitled')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .trim();

    console.log('Uploading to cloud storage...');

    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(
        fileBuffer, 
        'school-documents', 
        sanitizedFilename,
        uploadedFile.type
      );
      console.log('Cloud upload successful:', uploadResult.secure_url);
    } catch (uploadError) {
      console.error('Error uploading to cloud storage:', uploadError);
      return NextResponse.json(
        { message: 'Failed to upload file to storage. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Creating database record...');

    // Create study material record
    let newStudyMaterial;
    try {
      newStudyMaterial = await createStudyMaterial({
        title: title || '',
        description: description || '',
        fileUrl: uploadResult.secure_url,
        filePublicId: uploadResult.public_id,
        fileType: uploadedFile.type,
        fileSize: uploadedFile.size,
        category: category as "School Brochure" | "Academic Calendar" | "Prescribed Booklist" | "Annual Report" | "Magazine" | "Admission Form" | "Transfer Certificate" | "Syllabus" | "Other",
        class: classFilter,
        type: type || '',
        uploadedBy: authResult.username || 'admin',
        active
      });
      console.log('Database record created successfully:', newStudyMaterial._id);
    } catch (dbError) {
      console.error('Error creating database record:', dbError);
      
      // Try to cleanup uploaded file if database save fails
      try {
        const { deleteFromCloudinary } = await import('@/lib/cloudinary');
        await deleteFromCloudinary(uploadResult.public_id);
        console.log('Cleaned up uploaded file after database error');
      } catch (cleanupError) {
        console.error('Failed to cleanup uploaded file:', cleanupError);
      }
      
      return NextResponse.json(
        { message: 'Failed to save study material record. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Upload process completed successfully');

    return NextResponse.json(
      { 
        message: 'Study material uploaded successfully', 
        studyMaterial: {
          _id: newStudyMaterial._id,
          title: newStudyMaterial.title,
          fileUrl: newStudyMaterial.fileUrl,
          category: newStudyMaterial.category,
          class: newStudyMaterial.class
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in study materials upload:', error);
    return NextResponse.json(
      { 
        message: 'An unexpected error occurred. Please try again.', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}