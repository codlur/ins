"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function PremiumPage() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if user is premium
    const premiumStatus = localStorage.getItem('isPremium') === 'true';
    setIsPremium(premiumStatus);
  }, []);

  const handleTogglePremium = () => {
    const newPremiumStatus = !isPremium;
    setIsPremium(newPremiumStatus);
    localStorage.setItem('isPremium', newPremiumStatus.toString());
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Premium</h1>
        <BadgeCheck className={`h-6 w-6 ${isPremium ? 'text-teal-500' : 'text-muted-foreground'}`} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <div className="pb-4 border-b border-muted mb-4">
            <h2 className="text-lg font-semibold">Premium Features</h2>
            <p className="text-sm text-muted-foreground">
              Unlock exclusive features and content with a Premium subscription
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                <div>
                  <h3 className="font-medium">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Get deeper insights into your AI tool usage and performance metrics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                <div>
                  <h3 className="font-medium">Priority Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Get faster responses from our expert team
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                <div>
                  <h3 className="font-medium">Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Access premium articles, research, and reports
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                <div>
                  <h3 className="font-medium">Early Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Be the first to try new features and tools
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className={isPremium ? "bg-muted text-muted-foreground" : "bg-teal-500 hover:bg-teal-600 text-white"}
                onClick={handleTogglePremium}
              >
                {isPremium ? "Cancel Premium" : "Upgrade to Premium"}
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="pb-4 border-b border-muted mb-4">
            <h2 className="text-lg font-semibold">Current Plan</h2>
            <p className="text-sm text-muted-foreground">
              {isPremium ? "Premium" : "Free"}
            </p>
          </div>
          <div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Basic Features</span>
                <span className="text-teal-500">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Standard Support</span>
                <span className="text-teal-500">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Advanced Analytics</span>
                <span className={isPremium ? "text-teal-500" : "text-muted-foreground"}>
                  {isPremium ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Priority Support</span>
                <span className={isPremium ? "text-teal-500" : "text-muted-foreground"}>
                  {isPremium ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Exclusive Content</span>
                <span className={isPremium ? "text-teal-500" : "text-muted-foreground"}>
                  {isPremium ? "✓" : "✗"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}