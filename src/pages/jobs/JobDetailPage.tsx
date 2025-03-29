
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_JOBS } from "@/constants/mockData";
import { format, parseISO } from "date-fns";
import {
  Building,
  MapPin,
  CalendarDays,
  Briefcase,
  Clock,
  DollarSign,
  Share2,
} from "lucide-react";
import NotFound from "../NotFound";

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  
  const job = MOCK_JOBS.find((j) => j.id === jobId);

  if (!job) {
    return <NotFound />;
  }

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMMM dd, yyyy");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-8 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="mr-4">{job.company}</span>
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{job.location}</span>
                </div>
              </div>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" /> {job.type}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                Posted {format(parseISO(job.posted), "MMM dd")}
              </Badge>
              {job.deadline && (
                <Badge variant="outline" className="flex items-center gap-1 text-red-600 border-red-200">
                  <Clock className="h-3 w-3" />
                  Apply by {format(parseISO(job.deadline), "MMM dd")}
                </Badge>
              )}
            </div>
            
            <div className="pt-2">
              <Link to={`/apply/${job.id}`}>
                <Button className="w-full sm:w-auto">Apply Now</Button>
              </Link>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="text-gray-700">
                    {requirement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-gray-700">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Posted On:</span>
                <span className="font-medium">{formatDate(job.posted)}</span>
              </div>
              {job.deadline && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Apply Before:</span>
                  <span className="font-medium">{formatDate(job.deadline)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Job Type:</span>
                <span className="font-medium">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department:</span>
                <span className="font-medium">{job.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{job.experience}</span>
              </div>
              {job.salary && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary:</span>
                  <span className="font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-600" /> {job.salary}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                TechCorp is a leading technology company focused on creating innovative software solutions for businesses around the world.
              </p>
              <div className="flex justify-between">
                <span className="text-gray-600">Industry:</span>
                <span className="font-medium">Technology</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company Size:</span>
                <span className="font-medium">500-1000 employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Founded:</span>
                <span className="font-medium">2010</span>
              </div>
            </CardContent>
          </Card>
          
          <Link to={`/apply/${job.id}`}>
            <Button className="w-full">Apply for This Job</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
