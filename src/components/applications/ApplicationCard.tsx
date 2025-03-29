
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application, JobPosting } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, ExternalLink } from "lucide-react";

interface ApplicationCardProps {
  application: Application;
  job: JobPosting;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, job }) => {
  const appliedDate = new Date(application.appliedDate);
  const timeAgo = formatDistanceToNow(appliedDate, { addSuffix: true });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "applied":
        return "status-applied";
      case "screening":
      case "interview":
      case "technical":
        return "status-screening";
      case "offered":
        return "status-offered";
      case "rejected":
        return "status-rejected";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied";
      case "screening":
        return "Screening";
      case "interview":
        return "Interview";
      case "technical":
        return "Technical Interview";
      case "offered":
        return "Offer Extended";
      case "rejected":
        return "Not Selected";
      case "withdrawn":
        return "Withdrawn";
      default:
        return status;
    }
  };

  const hasFeedback = application.feedback && application.feedback.length > 0;

  return (
    <Card className="overflow-hidden transform transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <div className="text-sm text-gray-500">{job.company}</div>
          </div>
          <span className={`status-badge ${getStatusClass(application.status)}`}>
            {getStatusText(application.status)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Applied:</span>
            <span>{timeAgo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Location:</span>
            <span>{job.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Job Type:</span>
            <span>{job.type}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        {hasFeedback && (
          <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 hover:bg-amber-50">
            <MessageCircle className="h-4 w-4 mr-1" />
            View Feedback
          </Button>
        )}
        <Button variant="outline" size="sm" asChild>
          <Link to={`/applications/${application.id}`}>
            <ExternalLink className="h-4 w-4 mr-1" />
            Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
