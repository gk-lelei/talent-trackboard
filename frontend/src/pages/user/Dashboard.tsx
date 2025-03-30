
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { jobsAPI, applicationsAPI } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    jobs: true,
    applications: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await jobsAPI.getAllJobs();
        setRecentJobs(jobsResponse.data.jobs.slice(0, 3));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(prev => ({ ...prev, jobs: false }));
      }

      try {
        const applicationsResponse = await applicationsAPI.getUserApplications();
        setApplications(applicationsResponse.data.applications.slice(0, 3));
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(prev => ({ ...prev, applications: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}!
          </p>
        </div>
        <Link to="/jobs">
          <Button>Browse All Jobs</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>
              Latest opportunities available
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading.jobs ? (
              <div className="flex justify-center py-6">
                <Loader className="animate-spin" />
              </div>
            ) : recentJobs.length > 0 ? (
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <Link 
                    to={`/jobs/${job.id}`} 
                    key={job.id}
                    className="block p-4 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground">{job.company} · {job.location}</div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-muted-foreground">No recent jobs available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
            <CardDescription>
              Track your recent applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading.applications ? (
              <div className="flex justify-center py-6">
                <Loader className="animate-spin" />
              </div>
            ) : applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => (
                  <Link 
                    to={`/applications/${application.id}`} 
                    key={application.id}
                    className="block p-4 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="font-medium">{application.job?.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Status: <span className="capitalize">{application.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-muted-foreground">No applications yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Improve your chances of getting hired
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                A complete profile helps employers learn more about your qualifications.
              </p>
              <Link to="/profile">
                <Button className="w-full">Update Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
