
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { MOCK_APPLICATIONS, MOCK_JOBS } from "@/constants/mockData";
import { format } from "date-fns";
import { FileText, PaperclipIcon, MessageSquare } from "lucide-react";
import NotFound from "../NotFound";

const ApplicationDetailPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  
  const application = MOCK_APPLICATIONS.find(app => app.id === applicationId);
  
  if (!application) {
    return <NotFound />;
  }
  
  const job = MOCK_JOBS.find(j => j.id === application.jobId);
  
  if (!job) {
    return <NotFound />;
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

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

  const getStatusTimeline = (status: string) => {
    const allStatuses = ["applied", "screening", "interview", "technical", "offered"];
    const currentIndex = allStatuses.indexOf(status);
    
    if (status === "rejected") {
      return (
        <div className="relative pt-6">
          <div className="flex items-center mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full w-full"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <div>Applied</div>
            <div>Screening</div>
            <div>Interview</div>
            <div>Technical</div>
            <div>Offer</div>
          </div>
        </div>
      );
    }
    
    const progressPercent = currentIndex >= 0 ? 
      Math.min(100, (currentIndex / (allStatuses.length - 1)) * 100) : 0;
    
    return (
      <div className="relative pt-6">
        <div className="flex items-center mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-brand-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <div className={currentIndex >= 0 ? "text-brand-600 font-medium" : ""}>Applied</div>
          <div className={currentIndex >= 1 ? "text-brand-600 font-medium" : ""}>Screening</div>
          <div className={currentIndex >= 2 ? "text-brand-600 font-medium" : ""}>Interview</div>
          <div className={currentIndex >= 3 ? "text-brand-600 font-medium" : ""}>Technical</div>
          <div className={currentIndex >= 4 ? "text-brand-600 font-medium" : ""}>Offer</div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Link 
            to="/applications"
            className="text-sm text-brand-600 hover:underline"
          >
            ← Back to applications
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <CardDescription>{job.company} • {job.location}</CardDescription>
                </div>
                <div className={`status-badge ${getStatusClass(application.status)}`}>
                  {getStatusText(application.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {getStatusTimeline(application.status)}
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Application Timeline</h3>
                <div className="relative border-l-2 border-gray-200 pl-8 pb-6 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-10 mt-1.5 rounded-full border-4 border-white bg-brand-600 h-4 w-4"></div>
                    <h4 className="font-medium">Applied</h4>
                    <p className="text-sm text-gray-500">{formatDate(application.appliedDate)}</p>
                    <p className="mt-2 text-sm">Your application was successfully submitted.</p>
                  </div>
                  
                  {application.status !== "applied" && (
                    <div className="relative">
                      <div className="absolute -left-10 mt-1.5 rounded-full border-4 border-white bg-amber-500 h-4 w-4"></div>
                      <h4 className="font-medium">Application Reviewed</h4>
                      <p className="text-sm text-gray-500">{formatDate(new Date(new Date(application.appliedDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString())}</p>
                      <p className="mt-2 text-sm">Your application has been reviewed by the hiring team.</p>
                    </div>
                  )}
                  
                  {(application.status === "interview" || application.status === "technical" || application.status === "offered") && (
                    <div className="relative">
                      <div className="absolute -left-10 mt-1.5 rounded-full border-4 border-white bg-amber-500 h-4 w-4"></div>
                      <h4 className="font-medium">Interview Scheduled</h4>
                      <p className="text-sm text-gray-500">{formatDate(new Date(new Date(application.appliedDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())}</p>
                      <p className="mt-2 text-sm">Your interview has been scheduled with the hiring manager.</p>
                    </div>
                  )}
                  
                  {application.status === "offered" && (
                    <div className="relative">
                      <div className="absolute -left-10 mt-1.5 rounded-full border-4 border-white bg-green-500 h-4 w-4"></div>
                      <h4 className="font-medium">Offer Extended</h4>
                      <p className="text-sm text-gray-500">{formatDate(new Date(new Date(application.appliedDate).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString())}</p>
                      <p className="mt-2 text-sm">Congratulations! An offer has been extended to you.</p>
                    </div>
                  )}
                  
                  {application.status === "rejected" && (
                    <div className="relative">
                      <div className="absolute -left-10 mt-1.5 rounded-full border-4 border-white bg-red-500 h-4 w-4"></div>
                      <h4 className="font-medium">Application Not Selected</h4>
                      <p className="text-sm text-gray-500">{formatDate(new Date(new Date(application.appliedDate).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString())}</p>
                      <p className="mt-2 text-sm">Thank you for your interest. The position has been filled with another candidate.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {application.feedback && application.feedback.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" /> Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.feedback.map((feedback, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="whitespace-pre-line">{feedback.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDate(feedback.createdAt)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Applied On:</span>
                <span className="font-medium">{formatDate(application.appliedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium status-badge ${getStatusClass(application.status)}`}>
                  {getStatusText(application.status)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Job Type:</span>
                <span className="font-medium">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{job.location}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {application.resumeUrl && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" /> View Resume
                  </a>
                </Button>
              )}
              
              {application.coverLetterUrl && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={application.coverLetterUrl} target="_blank" rel="noopener noreferrer">
                    <PaperclipIcon className="h-4 w-4 mr-2" /> View Cover Letter
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link to={`/jobs/${job.id}`}>View Job Details</Link>
              </Button>
              
              {application.status === "applied" && (
                <Button variant="outline" className="w-full">
                  Withdraw Application
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
