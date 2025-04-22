import getClientPromise from "./mongodb";
import { Announcement, Notification, Holiday, Feedback, AdminUser, Admission, Enquiry, StudyMaterial } from "./models";
import { ObjectId } from "mongodb";

export async function getCollection(name: string) {
  const client = await getClientPromise;
  const db = client.db("aaaschool");
  return db.collection(name);
}

// Announcements methods
export async function getAnnouncements(onlyActive = false) {
  const collection = await getCollection("announcements");
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getAnnouncementById(id: string) {
  const collection = await getCollection("announcements");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createAnnouncement(
  announcement: Omit<Announcement, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection("announcements");
  const now = new Date();
  const newAnnouncement = {
    ...announcement,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newAnnouncement);
  return { ...newAnnouncement, _id: result.insertedId };
}

export async function updateAnnouncement(id: string, announcement: Partial<Announcement>) {
  const collection = await getCollection("announcements");
  const now = new Date();
  const updateData = {
    ...announcement,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteAnnouncement(id: string) {
  const collection = await getCollection("announcements");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Notifications methods
export async function getNotifications(onlyActive = false) {
  const collection = await getCollection("notifications");
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getNotificationById(id: string) {
  const collection = await getCollection("notifications");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createNotification(
  notification: Omit<Notification, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection("notifications");
  const now = new Date();
  const newNotification = {
    ...notification,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newNotification);
  return { ...newNotification, _id: result.insertedId };
}

export async function updateNotification(id: string, notification: Partial<Notification>) {
  const collection = await getCollection("notifications");
  const now = new Date();
  const updateData = {
    ...notification,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteNotification(id: string) {
  const collection = await getCollection("notifications");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Holidays methods
export async function getHolidays(onlyActive = false) {
  const collection = await getCollection("holidays");
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ date: 1 }).toArray();
}


export async function createHoliday(holiday: Omit<Holiday, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getCollection("holidays");
  const now = new Date();
  const newHoliday = {
    ...holiday,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newHoliday);
  return { ...newHoliday, _id: result.insertedId };
}

export async function updateHoliday(id: string, holiday: Partial<Holiday>) {
  const collection = await getCollection("holidays");
  const now = new Date();
  const updateData = {
    ...holiday,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteHoliday(id: string) {
  const collection = await getCollection("holidays");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

export async function getHolidayById(id: string) {
  const collection = await getCollection("holidays");
  return collection.findOne({ _id: new ObjectId(id) });
}

// Feedback methods
export async function getFeedback(status?: "new" | "read" | "responded") {
  const collection = await getCollection("feedback");
  const query = status ? { status } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getFeedbackById(id: string) {
  const collection = await getCollection("feedback");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createFeedback(
  feedback: Omit<Feedback, "_id" | "createdAt" | "updatedAt" | "status">
) {
  const collection = await getCollection("feedback");
  const now = new Date();
  const newFeedback = {
    ...feedback,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newFeedback);
  return { ...newFeedback, _id: result.insertedId };
}

export async function updateFeedbackStatus(id: string, status: "read" | "responded", responseMessage?: string) {
  const collection = await getCollection("feedback");
  const now = new Date();
  const updateData: Record<string, unknown> = {
    status,
    updatedAt: now,
  };

  if (status === "responded" && responseMessage) {
    updateData.responseMessage = responseMessage;
    updateData.responseDate = now;
  }

  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteFeedback(id: string) {
  const collection = await getCollection("feedback");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Admin User methods
export async function getAdminUserByUsername(username: string) {
  const collection = await getCollection("adminUsers");
  return collection.findOne({ username });
}

export async function createAdminUser(user: Omit<AdminUser, "_id" | "createdAt" | "updatedAt">) {
  const collection = await getCollection("adminUsers");
  const now = new Date();
  const newUser = {
    ...user,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newUser);
  return { ...newUser, _id: result.insertedId };
}
export async function getEnquiries(status?: 'pending' | 'approved' | 'rejected') {
  const collection = await getCollection("enquiries");
  const query = status ? { status } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getEnquiryById(id: string) {
  const collection = await getCollection("enquiries");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function getEnquiryByNumber(enquiryNumber: string) {
  const collection = await getCollection("enquiries");
  return collection.findOne({ enquiryNumber });
}

export async function createEnquiry(
  enquiry: Omit<Enquiry, "_id" | "createdAt" | "updatedAt" | "status" | "enquiryNumber">
) {
  const collection = await getCollection("enquiries");
  const now = new Date();
  const newEnquiry = {
    ...enquiry,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newEnquiry);
  return { ...newEnquiry, _id: result.insertedId };
}

export async function updateEnquiry(id: string, data: Partial<Enquiry>) {
  const collection = await getCollection("enquiries");
  const now = new Date();
  const updateData = {
    ...data,
    updatedAt: now
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteEnquiry(id: string) {
  const collection = await getCollection("enquiries");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Generate a unique enquiry number
export async function generateEnquiryNumber() {
  const collection = await getCollection("enquiries");
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const prefix = `ENQ${year}${month}`;
  
  // Find the latest enquiry number with the current prefix
  const latestEnquiry = await collection
    .find({ enquiryNumber: { $regex: `^${prefix}` } })
    .sort({ enquiryNumber: -1 })
    .limit(1)
    .toArray();
  
  let nextNumber = 1;
  
  if (latestEnquiry.length > 0 && latestEnquiry[0].enquiryNumber) {
    const lastNumber = parseInt(latestEnquiry[0].enquiryNumber.slice(-4), 10);
    nextNumber = lastNumber + 1;
  }
  
  // Format with leading zeros (4 digits)
  const numberStr = nextNumber.toString().padStart(4, '0');
  return `${prefix}${numberStr}`;
}

// Admission methods
export async function getAdmissions(status?: 'pending' | 'reviewing' | 'approved' | 'rejected') {
  const collection = await getCollection("admissions");
  const query = status ? { status } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getAdmissionById(id: string) {
  const collection = await getCollection("admissions");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function getAdmissionByEnquiryNumber(enquiryNumber: string) {
  const collection = await getCollection("admissions");
  return collection.findOne({ enquiryNumber });
}

export async function createAdmission(
  admission: Omit<Admission, "_id" | "createdAt" | "updatedAt" | "status">
) {
  const collection = await getCollection("admissions");
  const now = new Date();
  const newAdmission = {
    ...admission,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newAdmission);
  return { ...newAdmission, _id: result.insertedId };
}

export async function updateAdmission(id: string, data: Partial<Admission>) {
  const collection = await getCollection("admissions");
  const now = new Date();
  const updateData = {
    ...data,
    updatedAt: now
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteAdmission(id: string) {
  const collection = await getCollection("admissions");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Generate admission number
export async function generateAdmissionNumber() {
  const collection = await getCollection("admissions");
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const prefix = `ADM${year}`;
  
  // Find the latest admission number with the current prefix
  const latestAdmission = await collection
    .find({ admissionNo: { $regex: `^${prefix}` } })
    .sort({ admissionNo: -1 })
    .limit(1)
    .toArray();
  
  let nextNumber = 1;
  
  if (latestAdmission.length > 0 && latestAdmission[0].admissionNo) {
    const lastNumber = parseInt(latestAdmission[0].admissionNo.slice(-4), 10);
    nextNumber = lastNumber + 1;
  }
  
  // Format with leading zeros (4 digits)
  const numberStr = nextNumber.toString().padStart(4, '0');
  return `${prefix}${numberStr}`;

  
}

export async function getATATRegistrations(status?: 'pending' | 'approved' | 'rejected') {
  const collection = await getCollection("atatRegistrations");
  const query = status ? { status } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}



export async function getATATRegistrationByNumber(registrationNumber: string) {
  const collection = await getCollection("atatRegistrations");
  return collection.findOne({ registrationNumber });
}


interface ATATRegistration {
  _id: ObjectId;
  registrationNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;

}

export async function updateATATRegistration(id: string, data: Partial<Omit<ATATRegistration, '_id' | 'createdAt' | 'updatedAt'>>) {
  const collection = await getCollection("atatRegistrations");
  const now = new Date();
  const updateData = {
    ...data,
    updatedAt: now
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteATATRegistration(id: string) {
  const collection = await getCollection("atatRegistrations");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Generate a unique registration number for ATAT
export async function generateRegistrationNumber() {
  const collection = await getCollection("atatRegistrations");
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const prefix = `ATAT${year}`;
  
  // Find the latest registration number with the current prefix
  const latestRegistration = await collection
    .find({ registrationNumber: { $regex: `^${prefix}` } })
    .sort({ registrationNumber: -1 })
    .limit(1)
    .toArray();
  
  let nextNumber = 1;
  
  if (latestRegistration.length > 0 && latestRegistration[0].registrationNumber) {
    const lastNumber = parseInt(latestRegistration[0].registrationNumber.slice(-4), 10);
    nextNumber = lastNumber + 1;
  }
  
  // Format with leading zeros (4 digits)
  const numberStr = nextNumber.toString().padStart(4, '0');
  return `${prefix}${numberStr}`;
}
export async function getATATRegistrationById(id: string) {
  try {
    const collection = await getCollection("atatRegistrations");
    return collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Error fetching ATAT registration by ID:', error);
    throw error;
  }
}


export async function getStudyMaterials(filters: { 
  category?: string, 
  class?: string, 
  type?: string, 
  active?: boolean 
} = {}) {
  const collection = await getCollection("studyMaterials");
  const query: Record<string, unknown> = {};
  
  if (filters.category) query.category = filters.category;
  if (filters.class) query.class = filters.class;
  if (filters.type) query.type = filters.type;
  if (filters.active !== undefined) query.active = filters.active;

  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function createStudyMaterial(
  material: Omit<StudyMaterial, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection("studyMaterials");
  const now = new Date();
  const newMaterial = {
    ...material,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newMaterial);
  return { ...newMaterial, _id: result.insertedId };
}


export function validateFileType(file: File): boolean {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'image/jpeg',
    'image/png'
  ];
  
  return allowedTypes.includes(file.type);
}


export function validateFileSize(file: File): boolean {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
}

export async function updateStudyMaterial(id: string, material: Partial<StudyMaterial>) {
  const collection = await getCollection("studyMaterials");
  const now = new Date();
  const updateData = {
    ...material,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteStudyMaterial(id: string) {
  const collection = await getCollection("studyMaterials");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

export async function getStudyMaterialById(id: string) {
  const collection = await getCollection("studyMaterials");
  return collection.findOne({ _id: new ObjectId(id) });
}