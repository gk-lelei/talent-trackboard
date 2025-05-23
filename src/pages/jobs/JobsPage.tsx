
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobList from "@/components/jobs/JobList";
import JobFilter, { JobFilterValues } from "@/components/jobs/JobFilter";
import { MOCK_JOBS } from "@/constants/mockData";
import { JobPosting } from "@/types";

const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    }
  }, [searchParams]);

  useEffect(() => {
    // Simulate API call to fetch jobs
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const activeJobs = MOCK_JOBS.filter(job => job.status === "active");
        setJobs(activeJobs);
        
        // Apply initial filters if they exist
        if (initialFilters.search || initialFilters.location) {
          handleFilter(initialFilters);
        } else {
          setFilteredJobs(activeJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [initialFilters]);

  const handleFilter = (filters: JobFilterValues) => {
    let result = [...jobs];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.location && filters.location !== "all-locations") {
      const locationLower = filters.location.toLowerCase();
      result = result.filter(
        (job) => job.location.toLowerCase().includes(locationLower)
      );
    }

    if (filters.department && filters.department !== "all-departments") {
      const departmentValue = filters.department.toLowerCase();
      result = result.filter(
        (job) => job.department.toLowerCase() === departmentValue
      );
    }

    if (filters.jobType && filters.jobType !== "all-types") {
      result = result.filter(
        (job) => job.type === filters.jobType
      );
    }

    setFilteredJobs(result);
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
              {filteredJobs.length} position{filteredJobs.length !== 1 && "s"} found
            </p>
          </div>
          <JobList jobs={filteredJobs} />
        </div>
      )}
    </div>
  );
};

export default JobsPage;
