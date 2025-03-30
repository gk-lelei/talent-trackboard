
import React, { useState, useEffect } from "react";
import ApplicationList from "@/components/applications/ApplicationList";
import { useApplications } from "@/context/ApplicationsContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ApplicationsPage = () => {
  const { applications, isLoading, refetchApplications } = useApplications();
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Fetch applications when component mounts
    refetchApplications();
  }, [refetchApplications]);

  useEffect(() => {
    // Filter applications based on status
    if (statusFilter === "all") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((app) => app.status === statusFilter)
      );
    }
  }, [statusFilter, applications]);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Applications</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filter by status</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="screening">Screening</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offered">Offered</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-gray-600">
        Track and manage your job applications
      </p>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-600">
            {filteredApplications.length} application
            {filteredApplications.length !== 1 && "s"} found
          </p>
          <ApplicationList applications={filteredApplications} />
        </>
      )}
    </div>
  );
};

export default ApplicationsPage;
