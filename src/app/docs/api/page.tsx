"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function APIDoc() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-4 pl-0">
            <Link href="/docs">← Back to Documentation</Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">API Documentation</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Comprehensive guide to using the Acces API for developers.
          </p>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none mt-6">
        <h3>Overview</h3>
        <p>
          The Acces API provides programmatic access to our platform's features, allowing developers
          to integrate Acces functionality into their own applications.
        </p>
        
        <h3>Authentication</h3>
        <p>
          All API requests require authentication using an API key. You can generate an API key from
          your account settings page.
        </p>
        <pre className="bg-muted p-4 rounded-lg">
          curl -H "Authorization: Bearer YOUR_API_KEY" \
          https://api.insearch.com/v1/products
        </pre>
        
        <h3>Rate Limits</h3>
        <p>
          The API has rate limits to ensure fair usage:
        </p>
        <ul>
          <li>100 requests per minute for free accounts</li>
          <li>1000 requests per minute for premium accounts</li>
          <li>10000 requests per minute for business accounts</li>
        </ul>
        
        <h3>Endpoints</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">GET /v1/products</h4>
            <p className="text-sm text-muted-foreground">Retrieve a list of products</p>
            <div className="mt-2">
              <h5 className="text-sm font-medium">Parameters</h5>
              <ul className="text-xs">
                <li>limit (integer, optional) - Number of results to return (default: 20)</li>
                <li>offset (integer, optional) - Number of results to skip (default: 0)</li>
              </ul>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">GET /v1/products/&#123;id&#125;</h4>
            <p className="text-sm text-muted-foreground">Retrieve details for a specific product</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold">POST /v1/products</h4>
            <p className="text-sm text-muted-foreground">Create a new product listing</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button asChild size="sm">
          <Link href="/docs/getting-started">← Previous: Getting Started</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/docs/user-guide">Next: User Guide →</Link>
        </Button>
      </div>
    </div>
  );
}