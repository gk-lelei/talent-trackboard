
import { JobPosting, Application, Feedback } from "@/types";

export const MOCK_JOBS: JobPosting[] = [
  {
    id: "job1",
    title: "Senior Registered Nurse",
    company: "Metropolitan Medical Center",
    location: "Chicago, IL",
    department: "Nursing",
    type: "Full-time",
    experience: "3+ years",
    description: "We're seeking an experienced Registered Nurse to join our Emergency Department team. The ideal candidate will have strong clinical skills and a passion for patient care in fast-paced environments.",
    requirements: [
      "BSN degree required, MSN preferred",
      "Current RN license in the state of Illinois",
      "BLS and ACLS certifications",
      "3+ years of experience in emergency/critical care"
    ],
    responsibilities: [
      "Provide direct patient care and assessments",
      "Administer medications and treatments as prescribed",
      "Collaborate with interdisciplinary healthcare team",
      "Document patient care accurately and thoroughly"
    ],
    salary: "$75,000 - $95,000",
    posted: "2023-08-15T00:00:00.000Z",
    deadline: "2023-09-15T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job2",
    title: "Medical Laboratory Technician",
    company: "Metropolitan Medical Center",
    location: "Chicago, IL",
    department: "Laboratory",
    type: "Full-time",
    experience: "2+ years",
    description: "Join our laboratory team as a Medical Laboratory Technician and help us deliver accurate diagnostic test results for patient care.",
    requirements: [
      "Associate's degree in Medical Laboratory Technology",
      "ASCP certification required",
      "2+ years of experience in a clinical laboratory setting",
      "Knowledge of laboratory information systems"
    ],
    responsibilities: [
      "Perform laboratory tests on blood, tissue and other samples",
      "Maintain laboratory equipment and quality control",
      "Log and properly store specimens",
      "Report test results accurately and promptly"
    ],
    salary: "$55,000 - $70,000",
    posted: "2023-08-01T00:00:00.000Z",
    deadline: "2023-09-01T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job3",
    title: "Physical Therapist",
    company: "Metropolitan Medical Center",
    location: "Remote",
    department: "Rehabilitation",
    type: "Full-time",
    experience: "1+ years",
    description: "We're looking for a compassionate Physical Therapist to provide rehabilitation services to our patients and help them regain mobility and function.",
    requirements: [
      "Doctor of Physical Therapy degree",
      "Current PT license in the state of practice",
      "1+ year of clinical experience",
      "Experience with electronic medical records"
    ],
    responsibilities: [
      "Evaluate patients' physical conditions",
      "Develop and implement treatment plans",
      "Document patient progress and outcomes",
      "Educate patients and families on home exercise programs"
    ],
    posted: "2023-08-10T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job4",
    title: "Hospital Administrator",
    company: "Metropolitan Medical Center",
    location: "Chicago, IL",
    department: "Administration",
    type: "Full-time",
    experience: "5+ years",
    description: "Join our leadership team as a Hospital Administrator to oversee day-to-day operations and ensure excellence in patient care and operational efficiency.",
    requirements: [
      "Master's degree in Healthcare Administration or related field",
      "5+ years of experience in healthcare management",
      "Knowledge of healthcare regulations and compliance",
      "Strong leadership and communication skills"
    ],
    responsibilities: [
      "Oversee daily hospital operations",
      "Develop and implement policies and procedures",
      "Manage budgets and resource allocation",
      "Ensure compliance with healthcare regulations"
    ],
    salary: "$110,000 - $140,000",
    posted: "2023-07-25T00:00:00.000Z",
    deadline: "2023-08-25T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job5",
    title: "Clinical Dietitian",
    company: "Metropolitan Medical Center",
    location: "Chicago, IL",
    department: "Nutrition",
    type: "Full-time",
    experience: "2+ years",
    description: "We're seeking a Clinical Dietitian to provide nutrition assessments, counseling, and medical nutrition therapy to patients across various departments.",
    requirements: [
      "Bachelor's or Master's degree in Dietetics or Nutrition",
      "Registered Dietitian (RD) credential",
      "2+ years of clinical dietetics experience",
      "Knowledge of nutrition care process and documentation"
    ],
    responsibilities: [
      "Assess patients' nutritional status and needs",
      "Develop and implement nutrition care plans",
      "Provide medical nutrition therapy for various conditions",
      "Educate patients and families on nutrition management"
    ],
    posted: "2023-08-05T00:00:00.000Z",
    status: "active"
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app1",
    jobId: "job1",
    userId: "user123",
    status: "applied",
    appliedDate: "2023-08-16T10:30:00.000Z",
    resumeUrl: "/resumes/resume1.pdf",
    coverLetterUrl: "/cover-letters/cover1.pdf"
  },
  {
    id: "app2",
    jobId: "job3",
    userId: "user123",
    status: "screening",
    appliedDate: "2023-08-12T14:15:00.000Z",
    resumeUrl: "/resumes/resume1.pdf"
  },
  {
    id: "app3",
    jobId: "job4",
    userId: "user123",
    status: "interview",
    appliedDate: "2023-08-01T09:45:00.000Z",
    resumeUrl: "/resumes/resume1.pdf",
    coverLetterUrl: "/cover-letters/cover2.pdf",
    feedback: [
      {
        id: "feed1",
        applicationId: "app3",
        message: "Great healthcare administration experience. We'd like to schedule an interview with our Chief Operating Officer.",
        createdAt: "2023-08-05T11:20:00.000Z",
        fromAdmin: true
      }
    ]
  },
  {
    id: "app4",
    jobId: "job2",
    userId: "user123",
    status: "rejected",
    appliedDate: "2023-07-25T16:00:00.000Z",
    resumeUrl: "/resumes/resume1.pdf",
    feedback: [
      {
        id: "feed2",
        applicationId: "app4",
        message: "Thank you for your application. Unfortunately, we've decided to proceed with candidates who have more experience with hospital laboratory systems.",
        createdAt: "2023-08-02T13:10:00.000Z",
        fromAdmin: true
      }
    ]
  }
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: "feed1",
    applicationId: "app3",
    message: "Great healthcare administration experience. We'd like to schedule an interview with our Chief Operating Officer.",
    createdAt: "2023-08-05T11:20:00.000Z",
    fromAdmin: true
  },
  {
    id: "feed2",
    applicationId: "app4",
    message: "Thank you for your application. Unfortunately, we've decided to proceed with candidates who have more experience with hospital laboratory systems.",
    createdAt: "2023-08-02T13:10:00.000Z",
    fromAdmin: true
  }
];
