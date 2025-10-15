"use client";

import { useRouter } from "next/navigation";
import { BadgeCheck } from "lucide-react";

interface PremiumRedirectProps {
  sidebarCollapsed: boolean;
}

export function PremiumRedirect({ sidebarCollapsed }: PremiumRedirectProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Check if user is premium when they click
    const isPremium = localStorage.getItem('isPremium') === 'true';
    if (isPremium) {
      router.push('/app/premium');
    } else {
      router.push('/app/premium-sign-up');
    }
  };

  return (
    <div 
      className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
        sidebarCollapsed ? "justify-center" : "gap-3"
      } opacity-70 hover:opacity-100 cursor-pointer`}
      onClick={handleClick}
    >
      <BadgeCheck className="h-4 w-4" />
      {!sidebarCollapsed && "Premium"}
    </div>
  );
}