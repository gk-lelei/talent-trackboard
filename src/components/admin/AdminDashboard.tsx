
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_JOBS, MOCK_APPLICATIONS } from "@/constants/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Application } from "@/types";
import { BarChart, LineChart } from "@/components/ui/chart";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Check,
  Clock,
  Activity,
  ChevronRight 
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const jobs = MOCK_JOBS;
  const applications = MOCK_APPLICATIONS;
  
  // Calculate statistics
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status === "active").length;
  const totalApplications = applications.length;
  
  const applicationsByStatus = applications.reduce((acc: Record<string, number>, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});
  
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  // Some dummy chart data
  const applicationChartData = [
    { name: "Week 1", applications: 12 },
    { name: "Week 2", applications: 19 },
    { name: "Week 3", applications: 15 },
    { name: "Week 4", applications: 27 },
  ];
  
  const jobsByDepartment = [
    { name: "Engineering", value: 5 },
    { name: "Design", value: 2 },
    { name: "Product", value: 3 },
    { name: "Marketing", value: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex space-x-2">
          <Button asChild>
            <Link to="/admin/jobs/new">Create Job Posting</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              {activeJobs} active jobs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {applicationsByStatus.applied || 0} new applications
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(applicationsByStatus.screening || 0) + 
                (applicationsByStatus.interview || 0) + 
                (applicationsByStatus.technical || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Applications in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applicationsByStatus.offered || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Job offers extended
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Recent job applications received
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart 
              data={applicationChartData}
              index="name"
              categories={["applications"]}
              colors={["#0972fa"]}
              valueFormatter={(value) => `${value} applications`}
              className="h-[200px]"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Department</CardTitle>
            <CardDescription>
              Distribution of open positions
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <LineChart 
              data={jobsByDepartment}
              index="name"
              categories={["value"]}
              colors={["#2CA58D"]}
              valueFormatter={(value) => `${value} jobs`}
              className="h-[200px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Recently submitted job applications
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/applications">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application) => {
              const job = jobs.find((job) => job.id === application.jobId);
              return (
                <div
                  key={application.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2">
                      <Users className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {application.userId}
                      </p>
                      <p className="text-xs text-gray-500">
                        Applied for {job?.title || "Unknown Job"}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/admin/applications/${application.id}`}
                    className="text-sm font-medium text-brand-600 hover:underline"
                  >
                    View
                  </Link>
                </div>
              );
            })}
            
            {recentApplications.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No recent applications
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
