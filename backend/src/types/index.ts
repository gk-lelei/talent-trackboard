
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  profileComplete: boolean;
  createdAt: Date;
}

export interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  posted: Date;
  deadline?: Date;
  status: 'active' | 'closed' | 'archived';
}

export type ApplicationStatus = 
  | 'applied'
  | 'screening' 
  | 'interview' 
  | 'technical' 
  | 'offered' 
  | 'rejected' 
  | 'withdrawn';

export interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: ApplicationStatus;
  appliedDate: Date;
  resumeUrl?: string;
  coverLetterUrl?: string;
}

export interface Feedback {
  id: number;
  applicationId: number;
  message: string;
  createdAt: Date;
  fromAdmin: boolean;
}

export interface ProfileData {
  id?: number;
  userId: number;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WorkExperience {
  id?: number;
  userId: number;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface Education {
  id?: number;
  userId: number;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
}

export interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface CustomRequest extends Express.Request {
  user?: DecodedToken;
}
