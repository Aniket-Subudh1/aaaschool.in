import getClientPromise from "./mongodb";
import { Announcement, Notification, Holiday, Feedback, AdminUser, Admission, Enquiry, StudyMaterial, Album, Photo, Video, NewsBulletin, Award, SportsAchievement, AlumniProfile, Faculty, AcademicAchievement } from "./models";
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


export function validateFileSize(file: File): boolean {
  const maxSize = 50 * 1024 * 1024;
  console.log('Validating file size:', file.size, 'bytes, max allowed:', maxSize, 'bytes');
  return file.size <= maxSize;
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

export async function getAlbums(onlyActive = false) {
  const collection = await getCollection("albums");
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getAlbumById(id: string) {
  const collection = await getCollection("albums");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createAlbum(
  album: Omit<Album, "_id" | "createdAt" | "updatedAt" | "imageCount">
) {
  const collection = await getCollection("albums");
  const now = new Date();
  const newAlbum = {
    ...album,
    imageCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newAlbum);
  return { ...newAlbum, _id: result.insertedId };
}

export async function updateAlbum(id: string, album: Partial<Album>) {
  const collection = await getCollection("albums");
  const now = new Date();
  const updateData = {
    ...album,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteAlbum(id: string) {
  const collection = await getCollection("albums");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

export async function incrementAlbumImageCount(id: string) {
  const collection = await getCollection("albums");
  const now = new Date();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { 
      $inc: { imageCount: 1 },
      $set: { updatedAt: now }
    }
  );
  return result;
}

export async function decrementAlbumImageCount(id: string) {
  const collection = await getCollection("albums");
  const now = new Date();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { 
      $inc: { imageCount: -1 },
      $set: { updatedAt: now }
    }
  );
  return result;
}

// Photo methods
export async function getPhotosByAlbumId(albumId: string) {
  const collection = await getCollection("photos");
  return collection.find({ albumId }).sort({ order: 1 }).toArray();
}

export async function getPhotoById(id: string) {
  const collection = await getCollection("photos");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createPhoto(
  photo: Omit<Photo, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection("photos");
  const now = new Date();
  const newPhoto = {
    ...photo,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newPhoto);
  
  // Update album image count
  await incrementAlbumImageCount(photo.albumId);
  
  return { ...newPhoto, _id: result.insertedId };
}

export async function updatePhoto(id: string, photo: Partial<Photo>) {
  const collection = await getCollection("photos");
  const now = new Date();
  const updateData = {
    ...photo,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deletePhoto(id: string, albumId: string) {
  const collection = await getCollection("photos");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  
  // Update album image count
  if (result.deletedCount > 0) {
    await decrementAlbumImageCount(albumId);
  }
  
  return result;
}

export async function getPhotoCountByAlbumId(albumId: string): Promise<number> {
  const collection = await getCollection("photos");
  return collection.countDocuments({ albumId });
}

// Video methods
export async function getVideos(onlyActive = false) {
  const collection = await getCollection("videos");
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function getVideoById(id: string) {
  const collection = await getCollection("videos");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createVideo(
  video: Omit<Video, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection("videos");
  const now = new Date();
  const newVideo = {
    ...video,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newVideo);
  return { ...newVideo, _id: result.insertedId };
}

export async function updateVideo(id: string, video: Partial<Video>) {
  const collection = await getCollection("videos");
  const now = new Date();
  const updateData = {
    ...video,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteVideo(id: string) {
  const collection = await getCollection("videos");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// News Bulletin methods
export async function getNewsBulletins(onlyActive = false) {
  const collection = await getCollection("newsBulletins");
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ publishDate: -1 }).toArray();
}

export async function getNewsBulletinById(id: string) {
  const collection = await getCollection("newsBulletins");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createNewsBulletin(
  bulletin: Omit<NewsBulletin, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection("newsBulletins");
  const now = new Date();
  const newBulletin = {
    ...bulletin,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newBulletin);
  return { ...newBulletin, _id: result.insertedId };
}

export async function updateNewsBulletin(id: string, bulletin: Partial<NewsBulletin>) {
  const collection = await getCollection("newsBulletins");
  const now = new Date();
  const updateData = {
    ...bulletin,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteNewsBulletin(id: string) {
  const collection = await getCollection("newsBulletins");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// YouTube ID extraction utility
export function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}


const AWARDS_COLLECTION = "awards";
const SPORTS_ACHIEVEMENTS_COLLECTION = "sportsAchievements";
const ALUMNI_PROFILES_COLLECTION = "alumniProfiles";



// Get all awards with optional active filter
export async function getAwards(onlyActive = false) {
  const collection = await getCollection(AWARDS_COLLECTION);
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ date: -1 }).toArray();
}

// Get a single award by ID
export async function getAwardById(id: string) {
  const collection = await getCollection(AWARDS_COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
}

// Create a new award
export async function createAward(
  award: Omit<Award, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection(AWARDS_COLLECTION);
  const now = new Date();
  const newAward = {
    ...award,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newAward);
  return { ...newAward, _id: result.insertedId };
}

// Update an existing award
export async function updateAward(id: string, award: Partial<Award>) {
  const collection = await getCollection(AWARDS_COLLECTION);
  const now = new Date();
  const updateData = {
    ...award,
    updatedAt: now
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

// Delete an award
export async function deleteAward(id: string) {
  const collection = await getCollection(AWARDS_COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}


export async function getSportsAchievements(onlyActive = false) {
  const collection = await getCollection(SPORTS_ACHIEVEMENTS_COLLECTION);
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ year: -1, name: 1 }).toArray();
}

// Get a single sports achievement by ID
export async function getSportsAchievementById(id: string) {
  const collection = await getCollection(SPORTS_ACHIEVEMENTS_COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
}

// Create a new sports achievement
export async function createSportsAchievement(
  achievement: Omit<SportsAchievement, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection(SPORTS_ACHIEVEMENTS_COLLECTION);
  const now = new Date();
  const newAchievement = {
    ...achievement,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newAchievement);
  return { ...newAchievement, _id: result.insertedId };
}

// Update an existing sports achievement
export async function updateSportsAchievement(id: string, achievement: Partial<SportsAchievement>) {
  const collection = await getCollection(SPORTS_ACHIEVEMENTS_COLLECTION);
  const now = new Date();
  const updateData = {
    ...achievement,
    updatedAt: now
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

// Delete a sports achievement
export async function deleteSportsAchievement(id: string) {
  const collection = await getCollection(SPORTS_ACHIEVEMENTS_COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}


// Get all alumni profiles with optional active filter
export async function getAlumniProfiles(onlyActive = false) {
  const collection = await getCollection(ALUMNI_PROFILES_COLLECTION);
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ graduationYear: -1, name: 1 }).toArray();
}

// Get a single alumni profile by ID
export async function getAlumniProfileById(id: string) {
  const collection = await getCollection(ALUMNI_PROFILES_COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createAlumniProfile(
  profile: Omit<AlumniProfile, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection(ALUMNI_PROFILES_COLLECTION);
  const now = new Date();
  const newProfile = {
    ...profile,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newProfile);
  return { ...newProfile, _id: result.insertedId };
}

export async function updateAlumniProfile(id: string, profile: Partial<AlumniProfile>) {
  const collection = await getCollection(ALUMNI_PROFILES_COLLECTION);
  const now = new Date();
  const updateData = {
    ...profile,
    updatedAt: now
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteAlumniProfile(id: string) {
  const collection = await getCollection(ALUMNI_PROFILES_COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}
export async function getFaculty(onlyActive = false) {
  const collection = await getCollection("faculty");
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ name: 1 }).toArray();
}

export async function getFacultyById(id: string) {
  const collection = await getCollection("faculty");
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function getFacultyByDepartment(department: string, onlyActive = false) {
  const collection = await getCollection("faculty");
  const query = onlyActive 
    ? { department, active: true } 
    : { department };
  return collection.find(query).sort({ name: 1 }).toArray();
}

export async function createFaculty(
  faculty: Omit<Faculty, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection("faculty");
  const now = new Date();
  const newFaculty = {
    ...faculty,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newFaculty);
  return { ...newFaculty, _id: result.insertedId };
}

export async function updateFaculty(id: string, faculty: Partial<Faculty>) {
  const collection = await getCollection("faculty");
  const now = new Date();
  const updateData = {
    ...faculty,
    updatedAt: now,
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteFaculty(id: string) {
  const collection = await getCollection("faculty");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}


const ACADEMIC_ACHIEVEMENTS_COLLECTION = "academicAchievements";

export async function getAcademicAchievements(onlyActive = false) {
  const collection = await getCollection(ACADEMIC_ACHIEVEMENTS_COLLECTION);
  const query = onlyActive ? { active: true } : {};
  return collection.find(query).sort({ year: -1, marks: -1 }).toArray();
}

export async function getAcademicAchievementById(id: string) {
  const collection = await getCollection(ACADEMIC_ACHIEVEMENTS_COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createAcademicAchievement(
  achievement: Omit<AcademicAchievement, "_id" | "createdAt" | "updatedAt">
) {
  const collection = await getCollection(ACADEMIC_ACHIEVEMENTS_COLLECTION);
  const now = new Date();
  const newAchievement = {
    ...achievement,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newAchievement);
  return { ...newAchievement, _id: result.insertedId };
}

export async function updateAcademicAchievement(id: string, achievement: Partial<AcademicAchievement>) {
  const collection = await getCollection(ACADEMIC_ACHIEVEMENTS_COLLECTION);
  const now = new Date();
  const updateData = {
    ...achievement,
    updatedAt: now
  };
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return result;
}

export async function deleteAcademicAchievement(id: string) {
  const collection = await getCollection(ACADEMIC_ACHIEVEMENTS_COLLECTION);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}