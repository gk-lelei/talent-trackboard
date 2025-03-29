
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useToast } from "@/components/ui/use-toast";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                toast({
                  title: "No new notifications",
                  description: "You're all caught up!"
                });
              }}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-medium">
                A
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
