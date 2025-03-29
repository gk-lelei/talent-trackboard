
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
  HelpCircle,
  CheckCircle,
  Lock
} from "lucide-react";
import { useSubscription } from "@/components/subscription/SubscriptionContext";
import PaymentModal from "@/components/subscription/PaymentModal";
import { Badge } from "@/components/ui/badge";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { plan, jobApplicationsCount, jobApplicationsLimit, isPremium } = useSubscription();

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
            
            {/* Subscription Badge */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Subscription Plan:</div>
                {isPremium ? (
                  <Badge className="bg-brand-500">Premium</Badge>
                ) : (
                  <Badge variant="outline">Free</Badge>
                )}
              </div>
              
              {!isPremium && (
                <div className="mt-3">
                  <div className="text-xs mb-1 flex justify-between">
                    <span>Applications</span>
                    <span>{jobApplicationsCount}/{jobApplicationsLimit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-brand-500 h-1.5 rounded-full" 
                      style={{ 
                        width: `${Math.min(100, (jobApplicationsCount / jobApplicationsLimit) * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 w-full text-xs"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    <Lock className="h-3 w-3 mr-1" />
                    Upgrade to Premium
                  </Button>
                </div>
              )}
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="applications">
              <ApplicationsPage />
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Notifications</h2>
                <p className="text-center text-gray-500 py-8">No new notifications</p>
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>
                <p className="text-gray-500 mb-4">Complete your profile to increase your chances of getting hired.</p>
                {/* Profile content would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="billing">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold">Billing</h2>
                
                {isPremium ? (
                  <div className="bg-brand-50 p-4 rounded-lg border border-brand-100">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-brand-600 h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">Premium Plan Active</h3>
                        <p className="text-gray-600">You're currently on the Premium plan with unlimited job applications.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700">You are currently on the free plan.</p>
                      <p className="text-gray-500 text-sm mt-1">Limited to {jobApplicationsLimit} job application.</p>
                    </div>
                    
                    <div className="bg-brand-50 p-6 rounded-lg border border-brand-100">
                      <h3 className="font-bold text-xl text-brand-700 mb-4">Upgrade to Premium</h3>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-brand-600 mr-2" />
                          <span>Apply for unlimited job positions</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-brand-600 mr-2" />
                          <span>Get priority application processing</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-brand-600 mr-2" />
                          <span>Access to exclusive job listings</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-brand-600 mr-2" />
                          <span>Advanced resume builder tools</span>
                        </li>
                      </ul>
                      <Button className="w-full" onClick={() => setShowPaymentModal(true)}>
                        Upgrade Now - $20/month
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                <p className="text-gray-500 mb-4">Manage your account settings and preferences.</p>
                {/* Settings content would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="help">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Help & Support</h2>
                <p className="text-gray-500 mb-4">Need assistance? Contact our support team.</p>
                <Button>Contact Support</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
    </div>
  );
};

export default UserProfilePage;
