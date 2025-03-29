
export type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  profileComplete: boolean;
};

export type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string;
  department: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  posted: string; // ISO date string
  deadline?: string; // ISO date string
  status: "active" | "closed" | "archived";
};

export type ApplicationStatus = 
  | "applied"
  | "screening" 
  | "interview" 
  | "technical" 
  | "offered" 
  | "rejected" 
  | "withdrawn";

export type Application = {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedDate: string; // ISO date string
  resumeUrl?: string;
  coverLetterUrl?: string;
  feedback?: Feedback[];
};

export type Feedback = {
  id: string;
  applicationId: string;
  message: string;
  createdAt: string; // ISO date string
  fromAdmin: boolean;
};

export type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: WorkExperience[];
  education?: Education[];
};

export type WorkExperience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
};
