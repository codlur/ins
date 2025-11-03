"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to the app home page
    router.push("/app/home");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <img 
            src="/acces-logo-white.png" 
            alt="Acces Logo" 
            className="absolute w-16 h-16 transition-opacity duration-300 ease-in-out opacity-0 dark:opacity-100" 
          />
          <img 
            src="/acces-logo-black.png" 
            alt="Acces Logo" 
            className="absolute w-16 h-16 transition-opacity duration-300 ease-in-out opacity-100 dark:opacity-0" 
          />
          <img 
            src="/acces-logo-teal.png" 
            alt="Acces Logo" 
            className="absolute w-16 h-16 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" 
          />
        </div>
        <h1 className="text-2xl font-light mb-2">Acces</h1>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}