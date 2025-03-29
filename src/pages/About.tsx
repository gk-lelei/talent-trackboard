
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">About TalentTrack</h1>
        <p className="text-xl text-gray-600">
          Connecting exceptional talent with outstanding opportunities
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600">
            At TalentTrack, we believe that finding the right job shouldn't be a
            full-time job. Our mission is to streamline the job search and
            recruitment process, making it easier for job seekers to find roles
            that match their skills and aspirations, and for employers to
            discover exceptional talent.
          </p>
          <p className="text-gray-600">
            Founded in 2023, TalentTrack has quickly grown to become a trusted
            platform for professionals across various industries looking to advance
            their careers and for organizations seeking to build diverse and skilled
            teams.
          </p>
        </div>
        <div className="bg-brand-50 p-8 rounded-lg border border-brand-100">
          <h3 className="text-2xl font-bold text-brand-700 mb-4">Why Choose TalentTrack?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="bg-brand-500 text-white p-1 rounded-full mr-2 mt-1">✓</span>
              <span className="text-gray-700">Curated job listings from top employers</span>
            </li>
            <li className="flex items-start">
              <span className="bg-brand-500 text-white p-1 rounded-full mr-2 mt-1">✓</span>
              <span className="text-gray-700">Streamlined application process</span>
            </li>
            <li className="flex items-start">
              <span className="bg-brand-500 text-white p-1 rounded-full mr-2 mt-1">✓</span>
              <span className="text-gray-700">Real-time application tracking</span>
            </li>
            <li className="flex items-start">
              <span className="bg-brand-500 text-white p-1 rounded-full mr-2 mt-1">✓</span>
              <span className="text-gray-700">Personalized job recommendations</span>
            </li>
            <li className="flex items-start">
              <span className="bg-brand-500 text-white p-1 rounded-full mr-2 mt-1">✓</span>
              <span className="text-gray-700">Direct communication with employers</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-brand-700 text-white p-12 rounded-xl">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Our Team</h2>
          <p className="text-brand-100">
            TalentTrack is powered by a diverse team of professionals with
            backgrounds in HR, recruitment, technology, and design. Our combined
            expertise allows us to build a platform that truly understands the
            needs of both job seekers and employers.
          </p>
          <div className="pt-4">
            <Button asChild variant="outline" className="bg-white text-brand-700 hover:bg-white/90">
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Contact Us</h2>
        <p className="text-center text-gray-600">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="bg-white p-6 rounded-lg border border-gray-100 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
            <p className="text-gray-600">info@talenttrack.com</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="text-gray-600">support@talenttrack.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
