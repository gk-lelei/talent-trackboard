
import React from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/types";
import { Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RecentApplicationsListProps {
  applications: Application[];
}

const RecentApplicationsList: React.FC<RecentApplicationsListProps> = ({
  applications,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Applied</Badge>
        );
      case "screening":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Screening</Badge>
        );
      case "interview":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">Interview</Badge>
        );
      case "offered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Offered</Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd, yyyy");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Latest candidate applications</CardDescription>
        </div>
        <Clock className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-brand-100 text-brand-700">
                      {getInitials(application.candidateName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      <Link 
                        to={`/admin/applications/${application.id}`}
                        className="hover:underline text-brand-600"
                      >
                        {application.candidateName}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.jobTitle} at {application.company}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div>{getStatusBadge(application.status)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(application.appliedDate)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No recent applications
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplicationsList;
