
import { JobPosting, Application, Feedback } from "@/types";

export const MOCK_JOBS: JobPosting[] = [
  {
    id: "job1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    department: "Engineering",
    type: "Full-time",
    experience: "3+ years",
    description: "We are looking for a skilled Frontend Developer to join our team and help us build amazing user experiences.",
    requirements: [
      "3+ years of experience with React",
      "Proficient in TypeScript",
      "Experience with modern CSS frameworks like Tailwind",
      "Knowledge of state management solutions"
    ],
    responsibilities: [
      "Develop responsive web applications",
      "Work closely with designers to implement UI",
      "Optimize applications for maximum performance",
      "Ensure code quality through testing"
    ],
    salary: "$90,000 - $120,000",
    posted: "2023-08-15T00:00:00.000Z",
    deadline: "2023-09-15T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job2",
    title: "Backend Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    department: "Engineering",
    type: "Full-time",
    experience: "4+ years",
    description: "Join our team as a Backend Engineer and help us build scalable, robust services.",
    requirements: [
      "4+ years of experience with Node.js",
      "Experience with databases like PostgreSQL",
      "Knowledge of microservice architectures",
      "Understanding of cloud platforms (AWS/GCP/Azure)"
    ],
    responsibilities: [
      "Design and implement backend services",
      "Optimize database queries and structure",
      "Implement security best practices",
      "Create and maintain API documentation"
    ],
    salary: "$100,000 - $140,000",
    posted: "2023-08-01T00:00:00.000Z",
    deadline: "2023-09-01T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job3",
    title: "UX/UI Designer",
    company: "TechCorp",
    location: "Remote",
    department: "Design",
    type: "Full-time",
    experience: "2+ years",
    description: "We're looking for a talented UX/UI Designer to create beautiful, intuitive interfaces for our products.",
    requirements: [
      "2+ years of experience in UX/UI design",
      "Proficiency with design tools like Figma or Adobe XD",
      "Portfolio demonstrating UX thinking and UI skills",
      "Experience conducting user research"
    ],
    responsibilities: [
      "Create user-centered designs",
      "Develop wireframes and prototypes",
      "Collaborate with developers to implement designs",
      "Conduct usability testing"
    ],
    posted: "2023-08-10T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job4",
    title: "DevOps Engineer",
    company: "TechCorp",
    location: "New York, NY",
    department: "Infrastructure",
    type: "Full-time",
    experience: "3+ years",
    description: "Join us as a DevOps Engineer to help build and maintain our cloud infrastructure and CI/CD pipelines.",
    requirements: [
      "3+ years of experience with AWS or similar cloud platforms",
      "Experience with Docker and Kubernetes",
      "Knowledge of infrastructure as code (Terraform, CloudFormation)",
      "Experience with CI/CD pipelines"
    ],
    responsibilities: [
      "Design and implement cloud infrastructure",
      "Automate deployment processes",
      "Monitor system performance and reliability",
      "Improve security practices"
    ],
    salary: "$110,000 - $150,000",
    posted: "2023-07-25T00:00:00.000Z",
    deadline: "2023-08-25T00:00:00.000Z",
    status: "active"
  },
  {
    id: "job5",
    title: "Product Manager",
    company: "TechCorp",
    location: "San Francisco, CA",
    department: "Product",
    type: "Full-time",
    experience: "4+ years",
    description: "We're looking for an experienced Product Manager to lead the development of our flagship product.",
    requirements: [
      "4+ years of experience in product management",
      "Experience in the tech industry",
      "Strong analytical and problem-solving skills",
      "Excellent communication skills"
    ],
    responsibilities: [
      "Define product strategy and roadmap",
      "Work with engineering to deliver features",
      "Analyze market trends and customer feedback",
      "Ensure product meets business goals"
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
        message: "Great technical skills. We'd like to schedule a technical interview.",
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
        message: "Thank you for your application. Unfortunately, we've decided to proceed with candidates who have more experience with microservices.",
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
    message: "Great technical skills. We'd like to schedule a technical interview.",
    createdAt: "2023-08-05T11:20:00.000Z",
    fromAdmin: true
  },
  {
    id: "feed2",
    applicationId: "app4",
    message: "Thank you for your application. Unfortunately, we've decided to proceed with candidates who have more experience with microservices.",
    createdAt: "2023-08-02T13:10:00.000Z",
    fromAdmin: true
  }
];
