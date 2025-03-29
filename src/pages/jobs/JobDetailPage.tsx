
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_JOBS } from "@/constants/mockData";
import { Calendar, MapPin, Building, Briefcase, DollarSign, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import NotFound from "../NotFound";
import { useSubscription } from "@/components/subscription/SubscriptionContext";
import PaymentModal from "@/components/subscription/PaymentModal";
import { toast } from "@/components/ui/use-toast";

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const job = MOCK_JOBS.find((j) => j.id === jobId);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const { 
    canApplyForJob, 
    jobApplicationsCount, 
    jobApplicationsLimit, 
    isPremium 
  } = useSubscription();

  if (!job) {
    return <NotFound />;
  }

  const handleApplyClick = () => {
    if (canApplyForJob) {
      // Navigate to application page
      navigate(`/apply/${jobId}`);
    } else {
      // Show subscription modal
      toast({
        title: "Application limit reached",
        description: "You've reached your free plan limit of 1 job application. Upgrade to Premium to apply for unlimited jobs.",
        variant: "destructive",
      });
      setShowPaymentModal(true);
    }
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd, yyyy");
  };

  // Find similar jobs in the same department
  const similarJobs = MOCK_JOBS.filter(j => 
    j.id !== job.id && 
    j.department === job.department && 
    j.status === "active"
  ).slice(0, 2);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Job header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="bg-brand-50 text-brand-700 hover:bg-brand-100">
                  {job.type}
                </Badge>
                {job.department && (
                  <Badge variant="outline" className="bg-accent-50 text-accent-600 hover:bg-accent-100">
                    {job.department}
                  </Badge>
                )}
                {job.experience && (
                  <Badge variant="outline">
                    {job.experience}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted: {formatDate(job.posted)}</span>
              </div>
              <Button onClick={handleApplyClick} size="lg" className="px-8">
                Apply Now
              </Button>
              
              {!isPremium && (
                <div className="mt-2 text-xs text-gray-500">
                  {jobApplicationsLimit - jobApplicationsCount} application{jobApplicationsCount === 0 ? "" : "s"} left on free plan
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
          {job.salary && (
            <div className="flex items-center text-lg font-medium">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              <span>{job.salary}</span>
            </div>
          )}
          
          {job.deadline && (
            <div className="flex items-center text-lg font-medium">
              <Clock className="h-5 w-5 mr-2 text-amber-600" />
              <span>Apply before: {formatDate(job.deadline)}</span>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Key Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-gray-700">{responsibility}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="text-gray-700">{requirement}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4">
            <Button onClick={handleApplyClick} size="lg">
              Apply for this position
            </Button>
            <div className="mt-4 text-gray-600 flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>Applications reviewed on a rolling basis</span>
            </div>
          </div>
        </div>

        {/* Similar jobs */}
        {similarJobs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Similar Positions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {similarJobs.map(similarJob => (
                <div 
                  key={similarJob.id} 
                  className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold">
                    <Link 
                      to={`/jobs/${similarJob.id}`}
                      className="text-brand-600 hover:underline"
                    >
                      {similarJob.title}
                    </Link>
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="mr-4">{similarJob.company}</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{similarJob.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
    </div>
  );
};

export default JobDetailPage;
