import { NextRequest, NextResponse } from 'next/server';
import { 
  getStudyMaterials, 
  createStudyMaterial,
  validateFileType,
  validateFileSize
} from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const classFilter = searchParams.get('class') || undefined;
    const type = searchParams.get('type') || undefined;
    const active = searchParams.get('active') === 'true';

    const studyMaterials = await getStudyMaterials({
      category,
      class: classFilter,
      type,
      active
    });

    // Sanitize the response to remove sensitive information
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
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    
    // Extract form fields with improved validation
    const title = formData.get('title')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const category = formData.get('category')?.toString().trim();
    const classFilter = formData.get('class')?.toString().trim();
    const type = formData.get('type')?.toString().trim();
    const active = formData.get('active') === 'true';

    // Comprehensive validation
    const validationErrors: string[] = [];
    if (!title) validationErrors.push('Title is required');
    if (!category) validationErrors.push('Category is required');
    if (!classFilter) validationErrors.push('Class is required');

    // Handle file upload
    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      validationErrors.push('File is required');
    }

    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    // Type assertion is safe now
    const uploadedFile = file as File;

    // Validate file type and size
    if (!validateFileType(uploadedFile)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only PDF, DOCX, DOC, JPG, and PNG are allowed.' },
        { status: 400 }
      );
    }

    if (!validateFileSize(uploadedFile)) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    // Generate a clean filename
    const sanitizedFilename = (title || 'untitled')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const uploadResult = await uploadToCloudinary(
      fileBuffer, 
      'school-documents', 
      sanitizedFilename,
      uploadedFile.type
    );

    // Create study material record
    const newStudyMaterial = await createStudyMaterial({
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
    console.error('Error uploading study material:', error);
    return NextResponse.json(
      { 
        message: 'Failed to upload study material', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}