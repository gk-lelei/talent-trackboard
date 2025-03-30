
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// Context Providers
import { AuthProvider } from "./context/AuthContext";

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Route Protection
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// User Pages
import Dashboard from "./pages/user/Dashboard";
import ApplicationsPage from "./pages/user/ApplicationsPage";
import ApplicationDetailPage from "./pages/user/ApplicationDetailPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import JobApplyPage from "./pages/jobs/JobApplyPage";

// Admin Pages
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminJobsPage from "./pages/admin/AdminJobsPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminCandidatesPage from "./pages/admin/AdminCandidatesPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster position="top-right" richColors />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="jobs/:jobId" element={<JobDetailPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Protected User Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="apply/:jobId" element={<JobApplyPage />} />
                <Route path="applications" element={<ApplicationsPage />} />
                <Route path="applications/:applicationId" element={<ApplicationDetailPage />} />
                <Route path="profile" element={<UserProfilePage />} />
              </Route>
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="jobs" element={<AdminJobsPage />} />
                <Route path="applications" element={<AdminApplicationsPage />} />
                <Route path="candidates" element={<AdminCandidatesPage />} />
              </Route>
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
