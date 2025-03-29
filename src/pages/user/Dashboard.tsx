
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_APPLICATIONS, MOCK_JOBS } from "@/constants/mockData";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, AlertCircle, CheckCircle, Clock } from "lucide-react";

const Dashboard = () => {
  const applications = MOCK_APPLICATIONS;
  const jobs = MOCK_JOBS;
  
  // Get application statistics
  const totalApplications = applications.length;
  const activeApplications = applications.filter(app => 
    app.status !== "rejected" && app.status !== "withdrawn"
  ).length;
  
  const pendingFeedback = applications.filter(app => 
    app.status === "applied" || app.status === "screening"
  ).length;
  
  // Get recent applications (top 3)
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 3);
  
  // Get recommended jobs based on simple matching
  const recommendedJobs = jobs
    .filter(job => job.status === "active")
    .slice(0, 3);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Button asChild>
          <Link to="/jobs">Browse Jobs</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Briefcase className="h-10 w-10 text-brand-600 mr-4" />
              <div>
                <p className="text-3xl font-bold">{totalApplications}</p>
                <p className="text-sm text-gray-500">
                  {activeApplications} active applications
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-10 w-10 text-amber-500 mr-4" />
              <div>
                <p className="text-3xl font-bold">{pendingFeedback}</p>
                <p className="text-sm text-gray-500">
                  Awaiting response
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-10 w-10 text-red-500 mr-4" />
              <div>
                <p className="text-3xl font-bold">70%</p>
                <p className="text-sm text-gray-500">
                  <Link to="/profile" className="text-red-500 hover:underline">
                    Complete your profile
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Applications</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/applications">View All</Link>
            </Button>
          </div>
          <CardDescription>
            Track the status of your job applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((app) => {
              const job = jobs.find(j => j.id === app.jobId);
              if (!job) return null;

              const appliedDate = new Date(app.appliedDate);
              const timeAgo = formatDistanceToNow(appliedDate, { addSuffix: true });

              let statusIcon;
              let statusColor;

              switch (app.status) {
                case "applied":
                  statusIcon = <Clock className="h-4 w-4" />;
                  statusColor = "text-blue-600";
                  break;
                case "screening":
                case "interview":
                case "technical":
                  statusIcon = <Clock className="h-4 w-4" />;
                  statusColor = "text-amber-600";
                  break;
                case "offered":
                  statusIcon = <CheckCircle className="h-4 w-4" />;
                  statusColor = "text-green-600";
                  break;
                case "rejected":
                  statusIcon = <AlertCircle className="h-4 w-4" />;
                  statusColor = "text-red-600";
                  break;
                default:
                  statusIcon = <Clock className="h-4 w-4" />;
                  statusColor = "text-gray-600";
              }

              return (
                <div 
                  key={app.id} 
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <Link to={`/applications/${app.id}`} className="font-medium hover:text-brand-600 hover:underline">
                      {job.title}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {job.company} • Applied {timeAgo}
                    </p>
                  </div>
                  <div className={`flex items-center ${statusColor}`}>
                    {statusIcon}
                    <span className="ml-2 text-sm font-medium">{app.status}</span>
                  </div>
                </div>
              );
            })}
            
            {recentApplications.length === 0 && (
              <p className="text-center py-6 text-gray-500">
                No applications yet. Browse jobs to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Jobs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recommended Jobs</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/jobs">Browse All Jobs</Link>
            </Button>
          </div>
          <CardDescription>
            Jobs that match your profile and interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/jobs/${job.id}`} className="font-medium text-lg hover:text-brand-600 hover:underline">
                      {job.title}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {job.company} • {job.location}
                    </p>
                    <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {job.description}
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <Link to={`/apply/${job.id}`}>Apply</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
