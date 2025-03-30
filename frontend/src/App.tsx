
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import { AuthProvider } from "./context/AuthContext";
import { JobsProvider } from "./context/JobsContext";
import { ApplicationsProvider } from "./context/ApplicationsContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Job Pages
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import JobApplyPage from "./pages/jobs/JobApplyPage";

// User Pages
import UserProfilePage from "./pages/user/UserProfilePage";
import Dashboard from "./pages/user/Dashboard";
import ApplicationsPage from "./pages/user/ApplicationsPage";
import ApplicationDetailPage from "./pages/user/ApplicationDetailPage";

// Admin Pages
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminJobsPage from "./pages/admin/AdminJobsPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminCandidatesPage from "./pages/admin/AdminCandidatesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <JobsProvider>
            <ApplicationsProvider>
              <Routes>
                {/* Main Routes with MainLayout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/jobs/:jobId" element={<JobDetailPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected Routes */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/apply/:jobId" element={<JobApplyPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                    <Route path="/applications/:applicationId" element={<ApplicationDetailPage />} />
                  </Route>
                </Route>

                {/* Admin Routes with AdminLayout */}
                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="jobs" element={<AdminJobsPage />} />
                    <Route path="applications" element={<AdminApplicationsPage />} />
                    <Route path="candidates" element={<AdminCandidatesPage />} />
                  </Route>
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ApplicationsProvider>
          </JobsProvider>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
