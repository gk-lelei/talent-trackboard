
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JobList from "@/components/jobs/JobList";
import { ArrowRight, Search, Briefcase, Users, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useJobs } from "@/context/JobsContext";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const navigate = useNavigate();
  const { fetchJobs } = useJobs();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Fetch featured jobs
  const { data: featuredJobs = [], isLoading } = useQuery({
    queryKey: ['featuredJobs'],
    queryFn: async () => {
      const res = await fetch('/api/jobs?limit=3');
      const data = await res.json();
      return data.jobs || [];
    }
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to jobs page with search params
    navigate(`/jobs?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`);
  };

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-800 to-brand-700 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 space-y-6 text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Find Your Dream Healthcare Career
            </h1>
            <p className="text-xl text-white max-w-xl">
              Browse through hundreds of healthcare opportunities and take the next step in your medical career journey with Metropolitan Medical Center.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-white/90">
                <Link to="/jobs">Browse Jobs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-2/5 md:pl-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-medium text-white mb-4">Quick Job Search</h3>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Input 
                    type="text" 
                    placeholder="Job title or keyword" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div>
                  <Input 
                    type="text" 
                    placeholder="Location" 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <Button type="submit" className="w-full bg-white text-brand-700 hover:bg-white/90">
                  <Search className="mr-2 h-4 w-4" /> Search Jobs
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Positions</h2>
          <Button asChild variant="outline">
            <Link to="/jobs">
              View All Positions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <JobList jobs={featuredJobs} />
        )}
      </section>

      {/* How it Works */}
      <section className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
            <p className="text-gray-600">
              Browse our curated healthcare job listings across various departments and specialties.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Apply with Ease</h3>
            <p className="text-gray-600">
              Complete your profile once and apply to multiple healthcare positions with just a few clicks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your application status and receive feedback directly on the platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto bg-brand-50 rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Join Our Healthcare Team?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create an account today and start applying to healthcare positions that match your skills and career goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/register">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/jobs">Browse Positions</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
