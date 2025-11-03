"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function XPage() {
  const router = useRouter();

  useEffect(() => {
    // The middleware will handle the redirection logic
    // This page should never be visible to the user
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-light mb-2">Redirecting...</h1>
        <p className="text-muted-foreground">You should be redirected shortly.</p>
      </div>
    </div>
  );
}