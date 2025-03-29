
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_JOBS } from "@/constants/mockData";
import { Application } from "@/types";
import { Users, ChevronRight } from "lucide-react";

interface RecentApplicationsListProps {
  applications: Application[];
}

const RecentApplicationsList: React.FC<RecentApplicationsListProps> = ({ applications }) => {
  const jobs = MOCK_JOBS;
  
  return (
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
          {applications.map((application) => {
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
          
          {applications.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No recent applications
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplicationsList;
