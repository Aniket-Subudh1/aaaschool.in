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

    return NextResponse.json(studyMaterials);
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
    
    // Extract form fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const classFilter = formData.get('class') as string;
    const type = formData.get('type') as string;
    const active = formData.get('active') === 'true';

    // Validate required fields
    if (!title || !category) {
      return NextResponse.json(
        { message: 'Title and category are required' },
        { status: 400 }
      );
    }

    // Handle file upload
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json(
        { message: 'File is required' },
        { status: 400 }
      );
    }

    // Validate file type and size
    if (!validateFileType(file)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only PDF, DOCX, DOC, JPG, and PNG are allowed.' },
        { status: 400 }
      );
    }

    if (!validateFileSize(file)) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await uploadToCloudinary(
      fileBuffer, 
      'school-documents', 
      `${title.replace(/\s+/g, '-').toLowerCase()}`
    ) as { secure_url: string; public_id: string };

    const newStudyMaterial = await createStudyMaterial({
      title,
      description,
      fileUrl: uploadResult.secure_url,
      filePublicId: uploadResult.public_id,
      fileType: file.type,
      fileSize: file.size,
      category: category as "School Brochure" | "Academic Calendar" | "Prescribed Booklist" | "Annual Report" | "Magazine" | "Admission Form" | "Transfer Certificate" | "Syllabus" | "Other",
      class: classFilter,
      type,
      uploadedBy: authResult.username || 'admin',
      active
    });
    return NextResponse.json(
      { 
        message: 'Study material uploaded successfully', 
        studyMaterial: newStudyMaterial 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading study material:', error);
    return NextResponse.json(
      { message: 'Failed to upload study material' },
      { status: 500 }
    );
  }
}