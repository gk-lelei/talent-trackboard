
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import JobTable from "@/components/admin/JobTable";
import JobForm from "@/components/admin/JobForm";
import { useJobs } from "@/context/JobsContext";
import { JobPosting } from "@/context/JobsContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminJobsPage = () => {
  const { jobs, isLoading, createJob, updateJob, deleteJob } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("active");

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (jobId: string) => {
    const job = jobs.find((j) => j.id.toString() === jobId);
    if (job) {
      setEditingJob(job);
      setShowForm(true);
    }
  };

  const handleArchiveJob = async (jobId: string) => {
    try {
      await updateJob(jobId, { status: "archived" });
      toast.success("Job archived successfully");
    } catch (error) {
      toast.error("Failed to archive job");
    }
  };

  const handleDeleteConfirm = (jobId: string) => {
    setDeleteJobId(jobId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteJob = async () => {
    if (deleteJobId) {
      try {
        await deleteJob(deleteJobId);
        setShowDeleteConfirm(false);
        toast.success("Job deleted successfully");
      } catch (error) {
        toast.error("Failed to delete job");
      }
    }
  };

  const handleSubmitJob = async (formData: Partial<JobPosting>) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id.toString(), formData);
        toast.success("Job updated successfully");
      } else {
        await createJob(formData);
        toast.success("Job created successfully");
      }
      setShowForm(false);
    } catch (error) {
      toast.error(editingJob ? "Failed to update job" : "Failed to create job");
    }
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
        
        <TabsContent value={activeTab} className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded w-64"></div>
                <div className="h-64 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ) : filteredJobs.length > 0 ? (
            <JobTable
              jobs={filteredJobs}
              onEdit={handleEditJob}
              onArchive={handleArchiveJob}
              onDelete={handleDeleteConfirm}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No {activeTab !== "all" ? activeTab : ""} jobs found
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this job posting? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteJob} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminJobsPage;
