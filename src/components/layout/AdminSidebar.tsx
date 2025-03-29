
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Settings, 
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const AdminSidebar = () => {
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
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
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      path: "/admin/analytics",
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      path: "/admin/notifications",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
    },
    {
      title: "Help",
      icon: <HelpCircle className="h-5 w-5" />,
      path: "/admin/help",
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 min-h-screen flex flex-col relative transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className={cn(
        "p-6 flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && <h1 className="text-2xl font-bold text-brand-700">TalentTrack</h1>}
        {collapsed && <LayoutDashboard className="h-6 w-6 text-brand-700" />}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border shadow-sm bg-white text-gray-500 hover:text-gray-700"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                             (item.path !== "/admin" && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-brand-600",
                    isActive ? "bg-brand-50 text-brand-600 border-r-4 border-brand-500" : "",
                    collapsed ? "justify-center px-0" : ""
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <span className={cn(collapsed ? "mx-auto" : "mr-3")}>{item.icon}</span>
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={cn(
        "p-4 border-t border-gray-200", 
        collapsed ? "flex justify-center" : ""
      )}>
        <Button 
          variant="ghost" 
          className={cn(
            "text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed ? "p-2 w-auto" : "w-full flex items-center justify-start"
          )}
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
