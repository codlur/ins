"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DocsSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: "Getting Started Guide",
      excerpt: "Learn the basics of Acces and how to get started quickly with our platform.",
      url: "/docs/getting-started"
    },
    {
      id: 2,
      title: "API Authentication",
      excerpt: "How to authenticate your requests when using the Acces API.",
      url: "/docs/api/authentication"
    },
    {
      id: 3,
      title: "Creating Your First Post",
      excerpt: "Step-by-step instructions for creating content on Acces.",
      url: "/docs/user-guide/creating-content"
    },
    {
      id: 4,
      title: "Premium Features",
      excerpt: "Overview of the additional features available with a Premium subscription.",
      url: "/docs/premium"
    },
    {
      id: 5,
      title: "Troubleshooting Login Issues",
      excerpt: "Solutions for common authentication problems.",
      url: "/docs/faq/login-issues"
    }
  ];

  const filteredResults = searchResults.filter(result => 
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-4 pl-0">
            <Link href="/docs">← Back to Documentation</Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Documentation Search</h2>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search documentation..."
            className="pl-10 py-4 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mt-6">
        {searchQuery ? (
          <>
            <h3 className="text-base font-semibold mb-3">
              Search Results {filteredResults.length > 0 ? `(${filteredResults.length})` : ""}
            </h3>
            
            {filteredResults.length > 0 ? (
              <div className="space-y-3">
                {filteredResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:bg-accent">
                    <h4 className="font-semibold">
                      <Link href={result.url} className="hover:underline">
                        {result.title}
                      </Link>
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">{result.excerpt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No results found for "{searchQuery}". Try different keywords.
                </p>
                <Button variant="outline" className="mt-3" asChild size="sm">
                  <Link href="/docs">View All Documentation</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <Search className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              Enter a search term to find relevant documentation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}