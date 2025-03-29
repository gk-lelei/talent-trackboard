
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Settings, 
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/admin",
    },
    {
      title: "Job Listings",
      icon: <Briefcase className="h-5 w-5" />,
      path: "/admin/jobs",
    },
    {
      title: "Applications",
      icon: <FileText className="h-5 w-5" />,
      path: "/admin/applications",
    },
    {
      title: "Candidates",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/candidates",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-brand-700">TalentTrack</h1>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-brand-600 ${
                    isActive
                      ? "bg-brand-50 text-brand-600 border-r-4 border-brand-500"
                      : ""
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full flex items-center justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-5 w-5 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
