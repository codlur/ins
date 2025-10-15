"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck, Sparkles, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PremiumSignUpPage() {
  const router = useRouter();

  const handleUpgrade = (plan: string) => {
    // In a real app, this would redirect to a payment processor
    // For now, we'll simulate upgrading the user
    if (plan !== 'free') {
      localStorage.setItem('isPremium', 'true');
    }
    // Redirect to the premium page after "upgrading"
    router.push('/app/premium');
  };

  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Basic access to our platform",
      features: [
        "Read, write and engage with posts and news",
        "Insearch AI chat",
        "Discover products and applications",
        "Bookmark"
      ],
      cta: "Current Plan",
      popular: false
    },
    {
      name: "Premium",
      price: "$5",
      description: "Enhanced features for power users",
      features: [
        "Everything in free tier",
        "Verified badge",
        "Creator Program (get paid to post)",
        "Create Launches"
      ],
      cta: "Upgrade to Premium",
      popular: true
    },
    {
      name: "Business",
      price: "$25",
      description: "Advanced tools for businesses",
      features: [
        "Business Profile with Premium badge",
        "Everything inside Premium",
        "Boost Posts, launches & products",
        "Advanced analytics and promotional tool"
      ],
      cta: "Get Business Plan",
      popular: false
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Upgrade to Premium</h1>
        <BadgeCheck className="h-6 w-6 text-muted-foreground" />
      </div>
      
      <div className="text-center py-8">
        <Sparkles className="h-12 w-12 text-teal-500 mx-auto mb-4" />
        <h2 className="text-3xl font-light mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock exclusive features and content with our premium plans.
        </p>
      </div>
      
      <div className="space-y-6 max-w-5xl mx-auto">
        {tiers.map((tier, index) => (
          <div key={index}>
            <div className={`p-6 rounded-lg ${tier.popular ? 'border-2 border-teal-500 relative bg-muted/50' : 'border border-muted'}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white text-xs px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold flex items-center justify-center">
                  {tier.name}
                  {tier.name === "Business" && (
                    <BadgeCheck className="h-5 w-5 text-yellow-500 ml-2" />
                  )}
                </h3>
                <div className="my-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.name !== 'Free' && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>
              <div className="mb-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className={`w-full ${
                  tier.popular 
                    ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                    : tier.name === "Business"
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => handleUpgrade(tier.name.toLowerCase())}
              >
                {tier.cta}
              </Button>
            </div>
            {index < tiers.length - 1 && (
              <div className="border-b border-muted my-6"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}