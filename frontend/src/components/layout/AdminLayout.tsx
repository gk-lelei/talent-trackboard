
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-muted/20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.name}</p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
