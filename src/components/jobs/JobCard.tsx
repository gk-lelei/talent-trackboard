
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Building, Tag } from "lucide-react";
import { JobPosting } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: JobPosting;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const postedDate = new Date(job.posted);
  const postedTimeAgo = formatDistanceToNow(postedDate, { addSuffix: true });

  return (
    <div className="job-card bg-white p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h3 className="text-xl font-medium text-gray-900">{job.title}</h3>
        <div className="mt-2 md:mt-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {job.type}
          </span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Building className="h-4 w-4 mr-2" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Tag className="h-4 w-4 mr-2" />
          <span>{job.department}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>Posted {postedTimeAgo}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        {job.salary && (
          <div className="text-brand-600 font-medium">{job.salary}</div>
        )}
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </Button>
          <Button asChild size="sm" className="flex-1 sm:flex-none">
            <Link to={`/apply/${job.id}`}>Apply Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
