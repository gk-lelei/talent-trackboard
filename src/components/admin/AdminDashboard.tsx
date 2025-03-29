
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MOCK_JOBS, MOCK_APPLICATIONS } from "@/constants/mockData";
import StatCard from "./stats/StatCard";
import StatisticsCharts from "./stats/StatisticsCharts";
import RecentApplicationsList from "./stats/RecentApplicationsList";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Check,
  Clock,
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

  // Chart data
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

  const inReviewApplications = (applicationsByStatus.screening || 0) + 
    (applicationsByStatus.interview || 0) + 
    (applicationsByStatus.technical || 0);

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
        <StatCard 
          title="Total Jobs" 
          value={totalJobs} 
          description={`${activeJobs} active jobs`} 
          icon={Briefcase} 
        />
        
        <StatCard 
          title="Total Applications" 
          value={totalApplications} 
          description={`${applicationsByStatus.applied || 0} new applications`} 
          icon={FileText} 
        />
        
        <StatCard 
          title="In Review" 
          value={inReviewApplications} 
          description="Applications in progress" 
          icon={Clock} 
        />
        
        <StatCard 
          title="Hired" 
          value={applicationsByStatus.offered || 0} 
          description="Job offers extended" 
          icon={Check} 
        />
      </div>

      <StatisticsCharts 
        applicationChartData={applicationChartData}
        jobsByDepartment={jobsByDepartment}
      />

      <RecentApplicationsList applications={recentApplications} />
    </div>
  );
};

export default AdminDashboard;
