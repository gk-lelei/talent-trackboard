
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MOCK_JOBS } from "@/constants/mockData";
import { Building, MapPin } from "lucide-react";
import NotFound from "../NotFound";
import { useSubscription } from "@/components/subscription/SubscriptionContext";
import PaymentModal from "@/components/subscription/PaymentModal";

const JobApplyPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  
  const job = MOCK_JOBS.find((j) => j.id === jobId);
  const { canApplyForJob, incrementApplicationCount } = useSubscription();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [why, setWhy] = useState("");

  // Check subscription status on mount
  useEffect(() => {
    if (!canApplyForJob) {
      toast({
        title: "Application limit reached",
        description: "You've reached your free plan limit of 1 job application. Upgrade to Premium to apply for unlimited jobs.",
        variant: "destructive",
      });
      setShowPaymentModal(true);
    }
  }, [canApplyForJob]);

  if (!job) {
    return <NotFound />;
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetter(e.target.files[0]);
    }
  };

  const goToNextTab = () => {
    if (activeTab === "basic") {
      if (!fullName || !email || !resume) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill out all required fields",
        });
        return;
      }
      setActiveTab("additional");
    } else if (activeTab === "additional") {
      setActiveTab("review");
    }
  };

  const goToPreviousTab = () => {
    if (activeTab === "additional") {
      setActiveTab("basic");
    } else if (activeTab === "review") {
      setActiveTab("additional");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canApplyForJob) {
      setShowPaymentModal(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to submit application
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Increment application count
      incrementApplicationCount();
      
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted!",
      });
      
      navigate("/applications");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem submitting your application.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canApplyForJob && !showPaymentModal) {
    return <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Application Limit Reached</h2>
      <p className="mb-6">You've reached your free plan application limit.</p>
      <Button onClick={() => setShowPaymentModal(true)}>Upgrade to Premium</Button>
      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
    </div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h1 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            <span className="mr-4">{job.company}</span>
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="additional">Additional Info</TabsTrigger>
            <TabsTrigger value="review">Review & Submit</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter your personal details and upload your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV *</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={goToNextTab}>Continue</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="additional">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Add additional details to strengthen your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Input
                    id="coverLetter"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCoverLetterChange}
                  />
                  <p className="text-sm text-gray-500">
                    Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="why">
                    Why are you interested in this position?
                  </Label>
                  <Textarea
                    id="why"
                    value={why}
                    onChange={(e) => setWhy(e.target.value)}
                    placeholder="Tell us why you're a good fit for this role..."
                    rows={5}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={goToPreviousTab}>
                  Back
                </Button>
                <Button onClick={goToNextTab}>Continue</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
                <CardDescription>
                  Please review your application before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Full Name</div>
                      <div>{fullName}</div>
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div>{email}</div>
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div>{phone || "Not provided"}</div>
                    </div>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div>{linkedin || "Not provided"}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Documents</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Resume/CV</div>
                      <div>{resume?.name || "Not uploaded"}</div>
                    </div>
                    <div>
                      <div className="font-medium">Cover Letter</div>
                      <div>{coverLetter?.name || "Not uploaded"}</div>
                    </div>
                  </div>
                </div>

                {why && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Additional Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm whitespace-pre-line">{why}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Job Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={goToPreviousTab}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
    </div>
  );
};

export default JobApplyPage;
