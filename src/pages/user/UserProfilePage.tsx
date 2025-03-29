
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Dashboard from "./Dashboard";
import ApplicationsPage from "./ApplicationsPage";
import { 
  User, 
  CreditCard, 
  Settings, 
  FileText, 
  LayoutDashboard,
  Bell,
  HelpCircle
} from "lucide-react";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20">
            <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
              <div className="h-14 w-14 rounded-full bg-brand-500 text-white flex items-center justify-center text-xl font-bold">
                J
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              <Button
                variant={activeTab === "applications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("applications")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Applications
              </Button>
              
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              
              <Button
                variant={activeTab === "billing" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("billing")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
              
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>

              <Button
                variant={activeTab === "help" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("help")}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <TabsContent value="dashboard" className="mt-0" hidden={activeTab !== "dashboard"}>
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="applications" className="mt-0" hidden={activeTab !== "applications"}>
            <ApplicationsPage />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0" hidden={activeTab !== "notifications"}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Notifications</h2>
              <p className="text-center text-gray-500 py-8">No new notifications</p>
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="mt-0" hidden={activeTab !== "profile"}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Profile</h2>
              <p className="text-gray-500 mb-4">Complete your profile to increase your chances of getting hired.</p>
              {/* Profile content would go here */}
            </div>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-0" hidden={activeTab !== "billing"}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Billing</h2>
              <p className="text-gray-500">You are currently on the free plan.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0" hidden={activeTab !== "settings"}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <p className="text-gray-500 mb-4">Manage your account settings and preferences.</p>
              {/* Settings content would go here */}
            </div>
          </TabsContent>
          
          <TabsContent value="help" className="mt-0" hidden={activeTab !== "help"}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Help & Support</h2>
              <p className="text-gray-500 mb-4">Need assistance? Contact our support team.</p>
              <Button>Contact Support</Button>
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
