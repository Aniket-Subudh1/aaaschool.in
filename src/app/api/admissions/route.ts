import { NextRequest, NextResponse } from 'next/server';
import { getAdmissions, createAdmission, getEnquiryByNumber } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';
import nodemailer from 'nodemailer';
import { uploadToCloudinary } from '@/lib/cloudinary';

// Email setup
let transporter: nodemailer.Transporter | null = null;

if (
  process.env.EMAIL_HOST &&
  process.env.EMAIL_PORT &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS
) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication for GET requests (admin only)
    const authResult = await verifyAuth(request);
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'pending' | 'reviewing' | 'approved' | 'rejected' | undefined;
    
    const admissions = await getAdmissions(status);
    return NextResponse.json(admissions);
  } catch (error) {
    console.error('Error fetching admissions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch admissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Allow public access for POST requests
    await verifyAuth(request, { allowPublic: true });

    const formData = await request.formData();
    
    // Get basic form fields
    const enquiryNumber = formData.get('enquiryNumber') as string;
    
    if (!enquiryNumber) {
      return NextResponse.json(
        { message: 'Enquiry number is required' },
        { status: 400 }
      );
    }
    
    // Verify that enquiry exists and is approved
    const enquiry = await getEnquiryByNumber(enquiryNumber);
    if (!enquiry) {
      return NextResponse.json(
        { message: 'Invalid enquiry number' },
        { status: 400 }
      );
    }
    
    if (enquiry.status !== 'approved') {
      return NextResponse.json(
        { message: 'Enquiry is not approved' },
        { status: 400 }
      );
    }
    
    // Extract all form fields
    const studentName = formData.get('studentName') as string;
    const className = formData.get('class') as string;
    const session = formData.get('session') as string;
    const gender = formData.get('gender') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const dateOfBirthInWords = formData.get('dateOfBirthInWords') as string;
    const bloodGroup = formData.get('bloodGroup') as string;
    
    // Parent details
    const motherName = formData.get('motherName') as string;
    const motherEducation = formData.get('motherEducation') as string;
    const motherOccupation = formData.get('motherOccupation') as string;
    const motherMobile = formData.get('motherMobile') as string;
    const motherEmail = formData.get('motherEmail') as string;
    
    const fatherName = formData.get('fatherName') as string;
    const fatherEducation = formData.get('fatherEducation') as string;
    const fatherOccupation = formData.get('fatherOccupation') as string;
    const fatherMobile = formData.get('fatherMobile') as string;
    const fatherEmail = formData.get('fatherEmail') as string;
    
    // Address details
    const residentialAddress = formData.get('residentialAddress') as string;
    const permanentAddress = formData.get('permanentAddress') as string;
    
    // Previous school details
    const lastSchoolName = formData.get('lastSchoolName') as string;
    const lastClassAttended = formData.get('lastClassAttended') as string;
    const lastSchoolBoard = formData.get('lastSchoolBoard') as string;
    const transferCertificateDetails = formData.get('transferCertificateDetails') as string;
    const transferCertificateNo = formData.get('transferCertificateNo') as string;
    const transferCertificateDate = formData.get('transferCertificateDate') as string;
    
    // Additional information
    const isSingleGirlChild = formData.get('isSingleGirlChild') === 'true';
    const isSpeciallyAbled = formData.get('isSpeciallyAbled') === 'true';
    const isEWS = formData.get('isEWS') === 'true';
    const category = formData.get('category') as 'SC' | 'ST' | 'General' | 'Handicapped';
    const aadharNo = formData.get('aadharNo') as string;
    
    // Validate required fields
    if (!studentName || !className || !session || !gender || !dateOfBirth || !dateOfBirthInWords || 
        !motherName || !fatherName || !residentialAddress) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }
    
    // Handle file uploads with Cloudinary
    let photoUrl: string | undefined = undefined;
    let photoPublicId: string | undefined = undefined;
    let birthCertificateUrl: string | undefined = undefined;
    let birthCertificatePublicId: string | undefined = undefined;
    
    // Upload student photo
        const photoFile = formData.get('photo') as File;
        if (photoFile && photoFile.size > 0) {
          try {
            const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
            const uploadResult = await uploadToCloudinary(
              photoBuffer, 
              'school-admissions/photos', 
              `${studentName.replace(/\s+/g, '-').toLowerCase()}`
            ) as { secure_url: string; public_id: string };
        
        photoUrl = uploadResult.secure_url;
        photoPublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error uploading photo to Cloudinary:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload student photo. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    // Upload birth certificate
    const birthCertificateFile = formData.get('birthCertificate') as File;
    if (birthCertificateFile && birthCertificateFile.size > 0) {
      try {
        const certificateBuffer = Buffer.from(await birthCertificateFile.arrayBuffer());
        const uploadResult = await uploadToCloudinary(
          certificateBuffer, 
          'school-admissions/certificates', 
          `birth-cert-${studentName.replace(/\s+/g, '-').toLowerCase()}`
        ) as { secure_url: string; public_id: string };
        
        birthCertificateUrl = uploadResult.secure_url;
        birthCertificatePublicId = uploadResult.public_id;
      } catch (uploadError) {
        console.error('Error uploading birth certificate to Cloudinary:', uploadError);
        return NextResponse.json(
          { message: 'Failed to upload birth certificate. Please try again.' },
          { status: 500 }
        );
      }
    }
    
    // Create admission record
    const admissionData = {
      enquiryNumber,
      enquiryId: enquiry._id.toString(),
      class: className,
      session,
      studentName,
      gender,
      dateOfBirth,
      dateOfBirthInWords,
      bloodGroup,
      photoUrl,
      photoPublicId,
      birthCertificateUrl,
      birthCertificatePublicId,
      
      // Parent details
      motherName,
      motherEducation,
      motherOccupation,
      motherMobile,
      motherEmail,
      
      fatherName,
      fatherEducation,
      fatherOccupation,
      fatherMobile,
      fatherEmail,
      
      // Address details
      residentialAddress,
      permanentAddress,
      
      // Previous school details
      lastSchoolName,
      lastClassAttended,
      lastSchoolBoard,
      transferCertificateDetails,
      transferCertificateNo,
      transferCertificateDate,
      
      // Additional information
      isSingleGirlChild,
      isSpeciallyAbled,
      isEWS,
      category,
      aadharNo,
      
      // Process siblings data if available
      siblings: getSiblingsData(formData),
      
      // Process academics data if available
      academics: getAcademicsData(formData)
    };
    
    const newAdmission = await createAdmission(admissionData);
    
    // Send notification email to admin
    if (
      transporter && 
      process.env.ADMIN_EMAIL
    ) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@school.edu',
        to: process.env.ADMIN_EMAIL,
        subject: 'New Admission Form Submitted',
        text: `
          A new admission form has been submitted.
          
          Enquiry Number: ${enquiryNumber}
          Student Name: ${studentName}
          Class: ${className}
          
          Please review this admission in the admin dashboard.
        `,
        html: `
          <h2>New Admission Form Submitted</h2>
          <p>A new admission form has been submitted with the following details:</p>
          
          <ul>
            <li><strong>Enquiry Number:</strong> ${enquiryNumber}</li>
            <li><strong>Student Name:</strong> ${studentName}</li>
            <li><strong>Class Applied For:</strong> ${className}</li>
          </ul>
          
          <p>Please review this admission in the admin dashboard.</p>
        `,
      });
    }
    
    return NextResponse.json(
      { message: 'Admission form submitted successfully', admission: newAdmission },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting admission form:', error);
    return NextResponse.json(
      { message: 'Failed to submit admission form' },
      { status: 500 }
    );
  }
}

// Helper function to extract siblings data from form
function getSiblingsData(formData: FormData) {
  const siblings: Array<{ name: string; age: string; school: string }> = [];
  let index = 0;
  
  while (formData.has(`siblings[${index}].name`)) {
    const name = formData.get(`siblings[${index}].name`) as string;
    const age = formData.get(`siblings[${index}].age`) as string;
    const school = formData.get(`siblings[${index}].school`) as string;
    
    if (name) {
      siblings.push({ name, age, school });
    }
    
    index++;
  }
  
  return siblings;
}

// Helper function to extract academics data from form
function getAcademicsData(formData: FormData) {
  const academics: Array<{
    subject: string;
    maxMarks: number;
    marksObtained: number;
    percentage: number;
    remarks: string;
  }> = [];
  let index = 0;
  
  while (formData.get(`academics[${index}].subject`)) {
    const subject = formData.get(`academics[${index}].subject`) as string;
    const maxMarks = parseInt(formData.get(`academics[${index}].maxMarks`) as string);
    const marksObtained = parseInt(formData.get(`academics[${index}].marksObtained`) as string);
    const remarks = formData.get(`academics[${index}].remarks`) as string;
    
    if (subject && !isNaN(maxMarks) && !isNaN(marksObtained)) {
      const percentage = (marksObtained / maxMarks) * 100;
      academics.push({ 
        subject, 
        maxMarks, 
        marksObtained, 
        percentage: parseFloat(percentage.toFixed(2)),
        remarks 
      });
    }
    
    index++;
  }
  
  return academics;
}