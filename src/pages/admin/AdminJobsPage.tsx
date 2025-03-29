
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JobTable from "@/components/admin/JobTable";
import JobForm from "@/components/admin/JobForm";
import { toast } from "@/components/ui/use-toast";
import { MOCK_JOBS } from "@/constants/mockData";
import { JobPosting } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setJobs(MOCK_JOBS);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load job listings",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setEditingJob(job);
      setShowForm(true);
    }
  };

  const handleArchiveJob = (jobId: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: "archived" } : job
      )
    );
    
    toast({
      title: "Job Archived",
      description: "The job has been archived successfully.",
    });
  };

  const handleDeleteConfirm = (jobId: string) => {
    setDeleteJobId(jobId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteJob = () => {
    if (deleteJobId) {
      setJobs(jobs.filter((job) => job.id !== deleteJobId));
      setShowDeleteConfirm(false);
      
      toast({
        title: "Job Deleted",
        description: "The job has been deleted successfully.",
      });
    }
  };

  const handleSubmitJob = (formData: Partial<JobPosting>) => {
    if (editingJob) {
      // Update existing job
      setJobs(
        jobs.map((job) =>
          job.id === editingJob.id ? { ...job, ...formData } : job
        )
      );
      
      toast({
        title: "Job Updated",
        description: "The job has been updated successfully.",
      });
    } else {
      // Create new job
      const newJob: JobPosting = {
        id: `job${jobs.length + 1}`,
        title: formData.title || "Untitled Job",
        company: formData.company || "TechCorp",
        location: formData.location || "Remote",
        department: formData.department || "",
        type: formData.type || "Full-time",
        experience: formData.experience || "",
        description: formData.description || "",
        requirements: formData.requirements || [],
        responsibilities: formData.responsibilities || [],
        salary: formData.salary,
        posted: formData.posted || new Date().toISOString(),
        deadline: formData.deadline,
        status: formData.status || "active",
      };
      
      setJobs([newJob, ...jobs]);
      
      toast({
        title: "Job Created",
        description: "The new job has been created successfully.",
      });
    }
    
    setShowForm(false);
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true;
    return job.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Job Postings</h2>
        <Button onClick={handleCreateJob}>Create Job</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">
            Active ({jobs.filter((job) => job.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed ({jobs.filter((job) => job.status === "closed").length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived ({jobs.filter((job) => job.status === "archived").length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({jobs.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded w-64"></div>
                <div className="h-64 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ) : (
            <JobTable
              jobs={filteredJobs}
              onEdit={handleEditJob}
              onArchive={handleArchiveJob}
              onDelete={handleDeleteConfirm}
            />
          )}
        </TabsContent>
        <TabsContent value="closed" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded w-64"></div>
                <div className="h-64 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ) : (
            <JobTable
              jobs={filteredJobs}
              onEdit={handleEditJob}
              onArchive={handleArchiveJob}
              onDelete={handleDeleteConfirm}
            />
          )}
        </TabsContent>
        <TabsContent value="archived" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded w-64"></div>
                <div className="h-64 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ) : (
            <JobTable
              jobs={filteredJobs}
              onEdit={handleEditJob}
              onArchive={handleArchiveJob}
              onDelete={handleDeleteConfirm}
            />
          )}
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded w-64"></div>
                <div className="h-64 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ) : (
            <JobTable
              jobs={filteredJobs}
              onEdit={handleEditJob}
              onArchive={handleArchiveJob}
              onDelete={handleDeleteConfirm}
            />
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job" : "Create Job"}</DialogTitle>
            <DialogDescription>
              {editingJob
                ? "Update the details for this job posting."
                : "Create a new job posting to attract candidates."}
            </DialogDescription>
          </DialogHeader>
          <JobForm
            initialData={editingJob || undefined}
            onSubmit={handleSubmitJob}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job Posting</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job posting? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteJob}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobsPage;
