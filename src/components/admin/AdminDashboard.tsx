
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
  TrendingUp,
  LineChart,
  BarChart as BarChartIcon,
  PieChart
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

  // Enhanced chart data
  const applicationChartData = [
    { name: "Week 1", applications: 12, interviews: 5 },
    { name: "Week 2", applications: 19, interviews: 8 },
    { name: "Week 3", applications: 15, interviews: 6 },
    { name: "Week 4", applications: 27, interviews: 10 },
  ];
  
  const jobsByDepartment = [
    { name: "Engineering", value: 5 },
    { name: "Design", value: 2 },
    { name: "Product", value: 3 },
    { name: "Marketing", value: 1 },
    { name: "Sales", value: 2 },
  ];

  // New enhanced chart data
  const monthlyTrends = [
    { name: "Jan", applications: 45, hires: 3 },
    { name: "Feb", applications: 52, hires: 4 },
    { name: "Mar", applications: 61, hires: 5 },
    { name: "Apr", applications: 58, hires: 3 },
    { name: "May", applications: 63, hires: 6 },
    { name: "Jun", applications: 72, hires: 5 },
  ];
  
  const sourcesData = [
    { name: "LinkedIn", value: 42 },
    { name: "Indeed", value: 28 },
    { name: "Referral", value: 15 },
    { name: "Direct", value: 10 },
    { name: "Other", value: 5 },
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
          trend="+5% from last month"
          trendUp={true}
        />
        
        <StatCard 
          title="Total Applications" 
          value={totalApplications} 
          description={`${applicationsByStatus.applied || 0} new applications`} 
          icon={FileText} 
          trend="+12% from last month"
          trendUp={true}
        />
        
        <StatCard 
          title="In Review" 
          value={inReviewApplications} 
          description="Applications in progress" 
          icon={Clock} 
          trend="-3% from last month"
          trendUp={false}
        />
        
        <StatCard 
          title="Hired" 
          value={applicationsByStatus.offered || 0} 
          description="Job offers extended" 
          icon={Check} 
          trend="+8% from last month"
          trendUp={true}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StatisticsCharts 
          title="Recent Applications"
          description="Weekly application volume and interviews"
          icon={BarChartIcon}
          chartType="bar"
          data={applicationChartData}
          index="name"
          categories={["applications", "interviews"]}
          colors={["#0972fa", "#2CA58D"]}
          valueFormatter={(value) => `${value} applications`}
        />
        
        <StatisticsCharts 
          title="Jobs by Department"
          description="Current distribution of open positions"
          icon={PieChart}
          chartType="line"
          data={jobsByDepartment}
          index="name"
          categories={["value"]}
          colors={["#0A2463"]}
          valueFormatter={(value) => `${value} jobs`}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <StatisticsCharts 
          title="Monthly Application Trends"
          description="Applications received and candidates hired"
          icon={TrendingUp}
          chartType="line"
          data={monthlyTrends}
          index="name"
          categories={["applications", "hires"]}
          colors={["#0972fa", "#10b981"]}
          valueFormatter={(value) => `${value}`}
        />
        
        <StatisticsCharts 
          title="Application Sources"
          description="Where candidates are finding your jobs"
          icon={LineChart}
          chartType="bar"
          data={sourcesData}
          index="name"
          categories={["value"]}
          colors={["#8b5cf6"]}
          valueFormatter={(value) => `${value}%`}
        />
      </div>

      <RecentApplicationsList applications={recentApplications} />
    </div>
  );
};

export default AdminDashboard;
