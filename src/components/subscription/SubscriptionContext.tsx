
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

type PlanType = "free" | "premium";

interface SubscriptionContextType {
  plan: PlanType;
  jobApplicationsCount: number;
  jobApplicationsLimit: number;
  isPremium: boolean;
  canApplyForJob: boolean;
  upgradeAccount: () => void;
  incrementApplicationCount: () => void;
  resetApplicationCount: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<PlanType>(() => {
    const savedPlan = localStorage.getItem("subscription_plan");
    return (savedPlan as PlanType) || "free";
  });
  
  const [jobApplicationsCount, setJobApplicationsCount] = useState<number>(() => {
    const savedCount = localStorage.getItem("job_applications_count");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const jobApplicationsLimit = plan === "premium" ? Infinity : 1;
  const isPremium = plan === "premium";
  const canApplyForJob = jobApplicationsCount < jobApplicationsLimit || isPremium;

  useEffect(() => {
    localStorage.setItem("subscription_plan", plan);
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("job_applications_count", jobApplicationsCount.toString());
  }, [jobApplicationsCount]);

  const upgradeAccount = () => {
    setPlan("premium");
    toast({
      title: "Subscription Upgraded!",
      description: "Your account has been upgraded to Premium. You can now apply for unlimited jobs.",
    });
  };

  const incrementApplicationCount = () => {
    setJobApplicationsCount(prev => prev + 1);
  };

  const resetApplicationCount = () => {
    setJobApplicationsCount(0);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plan,
        jobApplicationsCount,
        jobApplicationsLimit,
        isPremium,
        canApplyForJob,
        upgradeAccount,
        incrementApplicationCount,
        resetApplicationCount
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
