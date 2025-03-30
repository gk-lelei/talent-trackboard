
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AdminRoute = () => {
  const { user, loading, isAuthenticated } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to dashboard if not an admin
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Render children routes if admin
  return <Outlet />;
};

export default AdminRoute;
