
import React, { createContext, useContext } from 'react';
import { applicationsAPI } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { useSubscription } from '@/components/subscription/SubscriptionContext';

export interface Feedback {
  id: number;
  applicationId: number;
  message: string;
  createdAt: string;
  fromAdmin: boolean;
}

export interface Application {
  id: number;
  jobId: number;
  userId: number;
  status: string;
  appliedDate: string;
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
}

interface ApplicationsContextType {
  applications: Application[];
  isLoading: boolean;
  error: Error | null;
  refetchApplications: () => void;
  getApplicationById: (id: string) => Promise<Application>;
  applyForJob: (jobId: string, data: any) => Promise<any>;
  addFeedback: (applicationId: string, message: string) => Promise<any>;
  updateApplicationStatus: (id: string, status: string) => Promise<any>;
  isAdmin: boolean;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export const ApplicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { incrementApplicationCount } = useSubscription();

  // Determine if user is admin (for API endpoint selection)
  const token = localStorage.getItem('token');
  let isAdmin = false;
  
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAdmin = payload.role === 'admin';
    } catch (e) {
      console.error('Error parsing JWT token');
    }
  }

  // Use different query based on user role
  const { data: applications = [], isLoading, error, refetch } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const res = await (isAdmin 
        ? applicationsAPI.getAllApplications() 
        : applicationsAPI.getUserApplications());
      return res.data.applications || [];
    },
    enabled: !!token // Only fetch if user is authenticated
  });

  const applyMutation = useMutation({
    mutationFn: ({ jobId, data }: { jobId: string, data: any }) => 
      applicationsAPI.applyForJob(jobId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      incrementApplicationCount(); // Update subscription application count
      toast({
        title: 'Application Submitted',
        description: 'Your application has been submitted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response?.data?.message || 'Failed to submit application.',
      });
    }
  });

  const feedbackMutation = useMutation({
    mutationFn: ({ applicationId, message }: { applicationId: string, message: string }) => 
      applicationsAPI.addFeedback(applicationId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: 'Feedback Sent',
        description: 'Your feedback has been sent successfully.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send feedback.',
      });
    }
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => 
      applicationsAPI.updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: 'Status Updated',
        description: 'Application status has been updated successfully.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update application status.',
      });
    }
  });

  const getApplicationById = async (id: string): Promise<Application> => {
    try {
      const res = await applicationsAPI.getApplicationById(id);
      return res.data.application;
    } catch (error) {
      throw new Error('Failed to fetch application');
    }
  };

  const applyForJob = async (jobId: string, data: any) => {
    return applyMutation.mutateAsync({ jobId, data });
  };

  const addFeedback = async (applicationId: string, message: string) => {
    return feedbackMutation.mutateAsync({ applicationId, message });
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    return statusMutation.mutateAsync({ id, status });
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        isLoading,
        error: error as Error | null,
        refetchApplications: refetch,
        getApplicationById,
        applyForJob,
        addFeedback,
        updateApplicationStatus,
        isAdmin
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
};
