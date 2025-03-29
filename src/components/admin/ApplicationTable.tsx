
import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Application, JobPosting } from "@/types";
import { format } from "date-fns";
import { MoreHorizontal, MessageSquare } from "lucide-react";

interface ApplicationTableProps {
  applications: Application[];
  jobs: JobPosting[];
  onStatusChange: (applicationId: string, newStatus: string) => void;
  onSendFeedback: (applicationId: string) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  jobs,
  onStatusChange,
  onSendFeedback,
}) => {
  const getJobTitle = (jobId: string) => {
    const job = jobs.find((job) => job.id === jobId);
    return job ? job.title : "Unknown Job";
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "screening":
      case "interview":
      case "technical":
        return "bg-yellow-100 text-yellow-800";
      case "offered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Job Position</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  <Link
                    to={`/admin/candidates/${application.userId}`}
                    className="text-brand-600 hover:underline"
                  >
                    {application.userId}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/admin/jobs/${application.jobId}`}
                    className="hover:underline"
                  >
                    {getJobTitle(application.jobId)}
                  </Link>
                </TableCell>
                <TableCell>{formatDate(application.appliedDate)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {application.resumeUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resume
                        </a>
                      </Button>
                    )}
                    {application.coverLetterUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={application.coverLetterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Cover Letter
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSendFeedback(application.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            onStatusChange(application.id, "screening")
                          }
                        >
                          Move to Screening
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onStatusChange(application.id, "interview")
                          }
                        >
                          Schedule Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onStatusChange(application.id, "technical")
                          }
                        >
                          Technical Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onStatusChange(application.id, "offered")}
                        >
                          Send Offer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onStatusChange(application.id, "rejected")
                          }
                        >
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
