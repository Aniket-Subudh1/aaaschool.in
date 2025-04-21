export interface Announcement {
  _id?: string;
  title: string;
  date?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  _id?: string;
  title: string;
  icon: string;
  date?: string;
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Holiday {
  _id?: string;
  date: string;
  name: string;
  type: 'national' | 'religious' | 'school' | 'exam';
  description?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Feedback {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  rating?: number;
  type: 'parent' | 'student' | 'alumni' | 'visitor';
  status: 'new' | 'read' | 'responded';
  createdAt: Date;
  updatedAt: Date;
  responseMessage?: string;
  responseDate?: Date;
}

export interface AdminUser {
  _id?: string;
  username: string;
  password: string; 
  email: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  updatedAt: Date;
}

export interface Enquiry {
  _id?: string;
  parentName: string;
  studentName: string;
  classApplied: string;
  mobileNumber: string;
  email?: string;
  location: string;
  enquiryNumber?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

// Updated Admission interface in src/lib/models.ts

export interface Admission {
  _id?: string;
  enquiryNumber: string;
  enquiryId: string;
  slNo?: string;
  admissionNo?: string;
  class: string;
  session: string;
  studentName: string;
  gender: string;
  dateOfBirth: string;
  dateOfBirthInWords: string;
  bloodGroup?: string;
  photoUrl?: string;
  photoPublicId?: string; 
  birthCertificateUrl?: string;
  birthCertificatePublicId?: string;
  
  // Parent details
  motherName: string;
  motherEducation?: string;
  motherOccupation?: string;
  motherMobile?: string;
  motherEmail?: string;
  
  fatherName: string;
  fatherEducation?: string;
  fatherOccupation?: string;
  fatherMobile?: string;
  fatherEmail?: string;
  
  // Address details
  residentialAddress: string;
  permanentAddress?: string;
  
  // Previous school details
  lastSchoolName?: string;
  lastClassAttended?: string;
  lastSchoolBoard?: string;
  transferCertificateDetails?: string;
  transferCertificateNo?: string;
  transferCertificateDate?: string;
  
  // Additional information
  isSingleGirlChild: boolean;
  isSpeciallyAbled: boolean;
  isEWS: boolean;
  category: 'SC' | 'ST' | 'General' | 'Handicapped';
  aadharNo?: string;
  
  // Sibling details
  siblings?: {
    name: string;
    age: string;
    school: string;
  }[];
  
  // Academic records
  academics?: {
    subject: string;
    maxMarks: number;
    marksObtained: number;
    percentage: number;
    remarks?: string;
  }[];
  
  // Status information
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}
export interface ATATRegistration {
  _id?: string;
  registrationNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  photoUrl: string;
  photoPublicId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  currentSchool: string;
  currentClass: string;
  applyingForClass: string;
  howDidYouHear: string;
  status: 'pending' | 'approved' | 'rejected';
  testDate: string;
  testVenue?: string;
  testTime?: string;
  admitCardUrl?: string;
  admitCardPublicId?: string;
  rank?: number;
  scholarshipPercentage?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}