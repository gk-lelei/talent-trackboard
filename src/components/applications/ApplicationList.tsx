
import React from "react";
import { Application, JobPosting } from "@/types";
import ApplicationCard from "./ApplicationCard";
import { MOCK_JOBS } from "@/constants/mockData";

interface ApplicationListProps {
  applications: Application[];
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
  // In a real app, you'd fetch jobs from your API
  const jobs = MOCK_JOBS;

  const getJob = (jobId: string): JobPosting => {
    return jobs.find(job => job.id === jobId) || {
      id: jobId,
      title: "Unknown Job",
      company: "Unknown Company",
      location: "Unknown Location",
      department: "Unknown",
      type: "Full-time",
      experience: "Unknown",
      description: "No description available",
      requirements: [],
      responsibilities: [],
      posted: new Date().toISOString(),
      status: "active"
    };
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
        <p className="mt-1 text-gray-500">
          You haven't applied to any jobs yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map(application => (
        <ApplicationCard 
          key={application.id} 
          application={application} 
          job={getJob(application.jobId)} 
        />
      ))}
    </div>
  );
};

export default ApplicationList;
