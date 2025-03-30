
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  Users,
  LogOut,
  Home,
  FileBadge,
} from "lucide-react";

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="pb-12 border-r min-w-[240px] h-screen flex flex-col">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2 flex items-center space-x-2 mb-4">
          <FileBadge className="h-6 w-6" />
          <span className="font-bold text-lg">TalentTrack</span>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            <Link
              to="/admin"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                location.pathname === "/admin" ? "bg-accent" : "transparent"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/jobs"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                location.pathname === "/admin/jobs" ? "bg-accent" : "transparent"
              )}
            >
              <Briefcase className="h-4 w-4" />
              Manage Jobs
            </Link>
            <Link
              to="/admin/applications"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                location.pathname === "/admin/applications" ? "bg-accent" : "transparent"
              )}
            >
              <ClipboardList className="h-4 w-4" />
              Applications
            </Link>
            <Link
              to="/admin/candidates"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                location.pathname === "/admin/candidates" ? "bg-accent" : "transparent"
              )}
            >
              <Users className="h-4 w-4" />
              Candidates
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Actions
          </h2>
          <div className="space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent"
            >
              <Home className="h-4 w-4" />
              Back to Site
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-normal"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
