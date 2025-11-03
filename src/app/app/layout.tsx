"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { 
  HomeIcon,
  MessageCircle,
  Rss, 
  Star,
  Rocket,
  Bookmark,
  BadgeCheck,
  User,
  PanelLeft,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { useIsClient } from "@/hooks/use-is-client";

const AdminViewContext = createContext({
  isAdminView: true,
  setIsAdminView: (value: boolean) => {}
});

export const useAdminView = () => useContext(AdminViewContext);

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isClient = useIsClient();
  const [isAdminView, setIsAdminView] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const pathname = usePathname();
  const { user, setUser, signOut } = useUser();
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);

  const getCurrentTabName = () => {
    if (pathname?.startsWith('/app/create')) {
      return "";
    }
    
    return "Access";
  };

  // Update view count when pathname changes
  useEffect(() => {
    setViewCount(prev => prev + 1);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showBusinessDropdown && !(event.target as Element).closest('.business-dropdown')) {
        setShowBusinessDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBusinessDropdown]);

  if (!isClient) {
    return null;
  }

  return (
    <AdminViewContext.Provider value={{ isAdminView, setIsAdminView }}>
      <div className="flex min-h-screen bg-background">
        {/* Main content - full width since sidebar is removed */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/acces-logo-white.png" 
                    alt="Acces Logo" 
                    className="absolute w-8 h-8 transition-opacity duration-300 ease-in-out opacity-0 dark:opacity-100" 
                  />
                  <img 
                    src="/acces-logo-black.png" 
                    alt="Acces Logo" 
                    className="absolute w-8 h-8 transition-opacity duration-300 ease-in-out opacity-100 dark:opacity-0" 
                  />
                  <img 
                    src="/acces-logo-teal.png" 
                    alt="Acces Logo" 
                    className="absolute w-8 h-8 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" 
                  />
                </div>
                <span 
                  className="text-2xl font-normal transition-colors duration-300 ease-in-out hover:text-teal-500" 
                  style={{ 
                    fontFamily: 'var(--font-geist-sans)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Acces
                </span>
              </div>
              {/* Navigation links */}
              <nav className="hidden md:flex items-center gap-4 ml-4">
                <Link 
                  href="/app/home" 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link 
                  href="/app/news" 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  News
                </Link>
                <Link 
                  href="/app/companies" 
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Companies
                </Link>
                <div className="business-dropdown relative">
                  <button
                    onClick={() => setShowBusinessDropdown(!showBusinessDropdown)}
                    className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                  >
                    Business
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {showBusinessDropdown && (
                    <div className="absolute left-0 mt-2 w-64 bg-background border rounded-md shadow-lg z-50">
                      <Link 
                        href="/advertise" 
                        className="block px-4 py-2 text-sm hover:bg-muted"
                        onClick={() => setShowBusinessDropdown(false)}
                      >
                        Advertise
                      </Link>
                      <Link 
                        href="/list-business" 
                        className="block px-4 py-2 text-sm hover:bg-muted"
                        onClick={() => setShowBusinessDropdown(false)}
                      >
                        List your Business (Newsletter or news)
                      </Link>
                    </div>
                  )}
                </div>
                <a 
                  href="https://x.com/codlur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Contact Us
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Views: {viewCount}</span>
              </div>
              <ModeToggle />
            </div>
          </header>

          {/* Page content with side spacing and centered content */}
          <main className="flex-1 p-4 md:p-6">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminViewContext.Provider>
  );
}