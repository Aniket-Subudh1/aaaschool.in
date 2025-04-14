import clientPromise from './mongodb';
import { 
  Announcement, 
  Notification, 
  Holiday, 
  Feedback, 
  AdminUser 
} from './models';
import { ObjectId } from 'mongodb';

export async function getCollection(name: string) {
  const client = await clientPromise;
  const db = client.db('aaaschool');
  return db.collection(name);
}

// Announcements methods
export async function getAnnouncements(onlyActive = false) {
  const collection = await getCollection('announcements');
  const query = onlyActive ? { active: true } : {};
  return collection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getAnnouncementById(id: string) {
  const collection = await getCollection('announcements');
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createAnnouncement(announcement: Omit<Announcement, '_id' | 'createdAt' | 'updatedAt'>) {
  const collection = await getCollection('announcements');
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
  const collection = await getCollection('announcements');
  const now = new Date();
  const updateData = {
    ...announcement,
    updatedAt: now,
  };
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result;
}

export async function deleteAnnouncement(id: string) {
  const collection = await getCollection('announcements');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Notifications methods
export async function getNotifications(onlyActive = false) {
  const collection = await getCollection('notifications');
  const query = onlyActive ? { active: true } : {};
  return collection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getNotificationById(id: string) {
  const collection = await getCollection('notifications');
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createNotification(notification: Omit<Notification, '_id' | 'createdAt' | 'updatedAt'>) {
  const collection = await getCollection('notifications');
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
  const collection = await getCollection('notifications');
  const now = new Date();
  const updateData = {
    ...notification,
    updatedAt: now,
  };
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result;
}

export async function deleteNotification(id: string) {
  const collection = await getCollection('notifications');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Holidays methods
export async function getHolidays(onlyActive = false) {
  const collection = await getCollection('holidays');
  const query = onlyActive ? { active: true } : {};
  return collection
    .find(query)
    .sort({ date: 1 })
    .toArray();
}

export async function getHolidayById(id: string) {
  const collection = await getCollection('holidays');
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createHoliday(holiday: Omit<Holiday, '_id' | 'createdAt' | 'updatedAt'>) {
  const collection = await getCollection('holidays');
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
  const collection = await getCollection('holidays');
  const now = new Date();
  const updateData = {
    ...holiday,
    updatedAt: now,
  };
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result;
}

export async function deleteHoliday(id: string) {
  const collection = await getCollection('holidays');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Feedback methods
export async function getFeedback(status?: 'new' | 'read' | 'responded') {
  const collection = await getCollection('feedback');
  const query = status ? { status } : {};
  return collection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getFeedbackById(id: string) {
  const collection = await getCollection('feedback');
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function createFeedback(feedback: Omit<Feedback, '_id' | 'createdAt' | 'updatedAt' | 'status'>) {
  const collection = await getCollection('feedback');
  const now = new Date();
  const newFeedback = {
    ...feedback,
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newFeedback);
  return { ...newFeedback, _id: result.insertedId };
}

export async function updateFeedbackStatus(id: string, status: 'read' | 'responded', responseMessage?: string) {
  const collection = await getCollection('feedback');
  const now = new Date();
  const updateData: any = {
    status,
    updatedAt: now,
  };
  
  if (status === 'responded' && responseMessage) {
    updateData.responseMessage = responseMessage;
    updateData.responseDate = now;
  }
  
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result;
}

export async function deleteFeedback(id: string) {
  const collection = await getCollection('feedback');
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

// Admin User methods
export async function getAdminUserByUsername(username: string) {
  const collection = await getCollection('adminUsers');
  return collection.findOne({ username });
}

export async function createAdminUser(user: Omit<AdminUser, '_id' | 'createdAt' | 'updatedAt'>) {
  const collection = await getCollection('adminUsers');
  const now = new Date();
  const newUser = {
    ...user,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newUser);
  return { ...newUser, _id: result.insertedId };
}