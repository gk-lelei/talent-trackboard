
import React, { createContext, useContext, useState } from 'react';
import { jobsAPI } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

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
  posted: string;
  deadline?: string;
  status: 'active' | 'closed' | 'archived';
}

interface JobFilters {
  search?: string;
  location?: string;
  department?: string;
  jobType?: string;
}

interface JobsContextType {
  jobs: JobPosting[];
  isLoading: boolean;
  error: Error | null;
  fetchJobs: (filters?: JobFilters) => void;
  getJobById: (id: string) => Promise<JobPosting>;
  createJob: (jobData: Omit<JobPosting, 'id' | 'posted' | 'status'>) => Promise<any>;
  updateJob: (id: string, jobData: Partial<JobPosting>) => Promise<any>;
  deleteJob: (id: string) => Promise<any>;
  filters: JobFilters;
  setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<JobFilters>({});
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading, error, refetch } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      const res = await jobsAPI.getAllJobs(filters as Record<string, string>);
      return res.data.jobs || [];
    }
  });

  const fetchJobs = (newFilters?: JobFilters) => {
    if (newFilters) {
      setFilters(newFilters);
    } else {
      refetch();
    }
  };

  const getJobById = async (id: string): Promise<JobPosting> => {
    try {
      const res = await jobsAPI.getJobById(id);
      return res.data.job;
    } catch (error) {
      throw new Error('Failed to fetch job');
    }
  };

  const createJobMutation = useMutation({
    mutationFn: (jobData: Omit<JobPosting, 'id' | 'posted' | 'status'>) => 
      jobsAPI.createJob(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job Created',
        description: 'Job posting has been created successfully.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create job posting.',
      });
    }
  });

  const updateJobMutation = useMutation({
    mutationFn: ({ id, jobData }: { id: string, jobData: Partial<JobPosting> }) => 
      jobsAPI.updateJob(id, jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job Updated',
        description: 'Job posting has been updated successfully.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update job posting.',
      });
    }
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id: string) => jobsAPI.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job Deleted',
        description: 'Job posting has been deleted successfully.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete job posting.',
      });
    }
  });

  const createJob = async (jobData: Omit<JobPosting, 'id' | 'posted' | 'status'>) => {
    return createJobMutation.mutateAsync(jobData);
  };

  const updateJob = async (id: string, jobData: Partial<JobPosting>) => {
    return updateJobMutation.mutateAsync({ id, jobData });
  };

  const deleteJob = async (id: string) => {
    return deleteJobMutation.mutateAsync(id);
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        isLoading,
        error: error as Error | null,
        fetchJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
        filters,
        setFilters,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
