
export type User = {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
  profileComplete: boolean;
};

export type JobPosting = {
  id: number;
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
  id: number;
  jobId: number;
  userId: number;
  status: ApplicationStatus;
  appliedDate: string; // ISO date string
  resumeUrl?: string;
  coverLetterUrl?: string;
  feedback?: Feedback[];
  // From job join
  title?: string;
  company?: string;
  location?: string;
  department?: string;
  type?: string;
  // From user join (admin view)
  applicantName?: string;
  applicantEmail?: string;
};

export type Feedback = {
  id: number;
  applicationId: number;
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
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
};

export type Education = {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
};
