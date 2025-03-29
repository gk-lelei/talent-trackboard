
import React, { useState, useEffect } from "react";
import ApplicationTable from "@/components/admin/ApplicationTable";
import FeedbackForm from "@/components/admin/FeedbackForm";
import { toast } from "@/components/ui/use-toast";
import { MOCK_APPLICATIONS, MOCK_JOBS } from "@/constants/mockData";
import { Application, JobPosting, Feedback } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentApplicationId, setCurrentApplicationId] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setApplications(MOCK_APPLICATIONS);
        setJobs(MOCK_JOBS);
        setFilteredApplications(MOCK_APPLICATIONS);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load applications",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...applications];

    if (statusFilter !== "all") {
      result = result.filter(app => app.status === statusFilter);
    }

    if (jobFilter !== "all") {
      result = result.filter(app => app.jobId === jobFilter);
    }

    setFilteredApplications(result);
  }, [statusFilter, jobFilter, applications]);

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus as Application["status"] } : app
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Application status has been updated to ${newStatus}.`,
    });
  };

  const handleSendFeedback = (applicationId: string) => {
    setCurrentApplicationId(applicationId);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = (message: string) => {
    const now = new Date().toISOString();
    const newFeedback: Feedback = {
      id: `feed${Date.now()}`,
      applicationId: currentApplicationId,
      message,
      createdAt: now,
      fromAdmin: true,
    };
    
    setApplications(
      applications.map((app) =>
        app.id === currentApplicationId
          ? {
              ...app,
              feedback: app.feedback
                ? [...app.feedback, newFeedback]
                : [newFeedback],
            }
          : app
      )
    );
    
    toast({
      title: "Feedback Sent",
      description: "Your feedback has been sent to the applicant.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="text-sm text-gray-500">
          {filteredApplications.length} application
          {filteredApplications.length !== 1 && "s"} found
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Job</span>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="technical">Technical Interview</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-64"></div>
            <div className="h-64 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ) : (
        <ApplicationTable
          applications={filteredApplications}
          jobs={jobs}
          onStatusChange={handleStatusChange}
          onSendFeedback={handleSendFeedback}
        />
      )}

      <FeedbackForm
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleSubmitFeedback}
        applicationId={currentApplicationId}
      />
    </div>
  );
};

export default AdminApplicationsPage;
