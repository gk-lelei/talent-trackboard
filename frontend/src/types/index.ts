
// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profileComplete: boolean;
}

export interface Profile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
}

export interface WorkExperience {
  id: number;
  userId: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  id: number;
  userId: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

// Job types
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  experience?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  posted: string;
  deadline?: string;
  status: 'active' | 'closed' | 'archived';
}

export interface JobFilters {
  search?: string;
  location?: string;
  department?: string;
  jobType?: string;
}

// Application types
export interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: 'applied' | 'screening' | 'interview' | 'technical' | 'offered' | 'rejected' | 'withdrawn';
  appliedDate: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  job?: Job;
  feedback?: Feedback[];
  user?: User;
}

export interface Feedback {
  id: number;
  applicationId: number;
  message: string;
  createdAt: string;
  fromAdmin: boolean;
}

// API response types
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
