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