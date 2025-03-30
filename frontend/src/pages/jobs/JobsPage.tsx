
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobList from "@/components/jobs/JobList";
import JobFilter, { JobFilterValues } from "@/components/jobs/JobFilter";
import { useJobs } from "@/context/JobsContext";

const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const { jobs, isLoading, fetchJobs } = useJobs();
  const [initialFilters, setInitialFilters] = useState<JobFilterValues>({
    search: "",
    location: "",
    department: "",
    jobType: "",
  });

  // Get search parameters from URL if they exist
  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    const locationQuery = searchParams.get("location") || "";
    
    if (searchQuery || locationQuery) {
      setInitialFilters({
        search: searchQuery,
        location: locationQuery,
        department: "",
        jobType: "",
      });
      
      // Apply filters from URL
      fetchJobs({
        search: searchQuery,
        location: locationQuery
      });
    }
  }, [searchParams, fetchJobs]);

  const handleFilter = (filters: JobFilterValues) => {
    fetchJobs({
      search: filters.search,
      location: filters.location !== "all-locations" ? filters.location : undefined,
      department: filters.department !== "all-departments" ? filters.department : undefined,
      jobType: filters.jobType !== "all-types" ? filters.jobType : undefined,
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Healthcare Careers</h1>
      <p className="text-gray-600 text-lg">Find your ideal role in healthcare at Metropolitan Medical Center</p>

      <JobFilter onFilter={handleFilter} initialValues={initialFilters} />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-64"></div>
            <div className="h-64 bg-gray-200 rounded w-full"></div>
            <div className="h-64 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              {jobs.length} position{jobs.length !== 1 && "s"} found
            </p>
          </div>
          <JobList jobs={jobs} />
        </div>
      )}
    </div>
  );
};

export default JobsPage;
