"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pt-6">
      <div className="space-y-6 text-center max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Welcome to Insearch</h1>
        <p className="text-muted-foreground">
          Select a section from the sidebar to get started
        </p>
        <div className="pt-4">
          <Link href="/app/home">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}