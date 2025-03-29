
import React, { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";

interface JobFilterProps {
  onFilter: (filters: JobFilterValues) => void;
}

export interface JobFilterValues {
  search: string;
  location: string;
  department: string;
  jobType: string;
}

const JobFilter: React.FC<JobFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<JobFilterValues>({
    search: "",
    location: "",
    department: "",
    jobType: "",
  });

  const handleChange = (name: keyof JobFilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const clearFilters = () => {
    const resetFilters = {
      search: "",
      location: "",
      department: "",
      jobType: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            placeholder="Search jobs..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <Select
          value={filters.location}
          onValueChange={(value) => handleChange("location", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Location</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="san francisco">San Francisco, CA</SelectItem>
            <SelectItem value="new york">New York, NY</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.department}
          onValueChange={(value) => handleChange("department", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.jobType}
          onValueChange={(value) => handleChange("jobType", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        {(filters.search || filters.location || filters.department || filters.jobType) && (
          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
        <Button type="submit">Filter Jobs</Button>
      </div>
    </form>
  );
};

export default JobFilter;
