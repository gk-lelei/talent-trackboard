
import axios from 'axios';

// Create an axios instance with base URL and default headers
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API endpoints
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
  
  getCurrentUser: () => 
    api.get('/auth/me')
};

// Jobs API endpoints
export const jobsAPI = {
  getAllJobs: (filters?: Record<string, string>) => 
    api.get('/jobs', { params: filters }),
  
  getJobById: (id: string) => 
    api.get(`/jobs/${id}`),
  
  // Admin endpoints
  createJob: (jobData: any) => 
    api.post('/jobs', jobData),
  
  updateJob: (id: string, jobData: any) => 
    api.put(`/jobs/${id}`, jobData),
  
  deleteJob: (id: string) => 
    api.delete(`/jobs/${id}`)
};

// Applications API endpoints
export const applicationsAPI = {
  getUserApplications: () => 
    api.get('/applications/my'),
  
  getApplicationById: (id: string) => 
    api.get(`/applications/${id}`),
  
  applyForJob: (jobId: string, data: any) => 
    api.post('/applications', { jobId, ...data }),
  
  addFeedback: (applicationId: string, message: string) => 
    api.post(`/applications/${applicationId}/feedback`, { message }),
  
  // Admin endpoints
  getAllApplications: () => 
    api.get('/applications'),
  
  updateApplicationStatus: (id: string, status: string) => 
    api.put(`/applications/${id}/status`, { status })
};

// User profile API endpoints
export const userAPI = {
  getUserProfile: () => 
    api.get('/users/profile'),
  
  updateUserProfile: (profileData: any) => 
    api.put('/users/profile', profileData),
  
  addWorkExperience: (experienceData: any) => 
    api.post('/users/experience', experienceData),
  
  updateWorkExperience: (id: string, experienceData: any) => 
    api.put(`/users/experience/${id}`, experienceData),
  
  deleteWorkExperience: (id: string) => 
    api.delete(`/users/experience/${id}`),
  
  addEducation: (educationData: any) => 
    api.post('/users/education', educationData),
  
  updateEducation: (id: string, educationData: any) => 
    api.put(`/users/education/${id}`, educationData),
  
  deleteEducation: (id: string) => 
    api.delete(`/users/education/${id}`),
  
  // Admin endpoint
  getAllUsers: () => 
    api.get('/users')
};

export default api;
