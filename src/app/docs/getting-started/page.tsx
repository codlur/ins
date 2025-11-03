"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GettingStartedDoc() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-4 pl-0">
            <Link href="/docs">← Back to Documentation</Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Learn the basics of Acces and how to get started quickly.
          </p>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none mt-6">
        <h3>Introduction</h3>
        <p>
          Welcome to Acces! This guide will help you get started with our platform quickly. 
          Acces is designed to help you discover and explore innovative products, news, and 
          launches in technology.
        </p>
        
        <h3>Creating Your Account</h3>
        <p>
          To get started with Acces, you'll need to create an account:
        </p>
        <ol>
          <li>Visit the <Link href="/signup" className="text-teal-500 hover:underline">sign up page</Link></li>
          <li>Enter your email address and create a password</li>
          <li>Verify your email address through the confirmation email</li>
          <li>Complete your profile information</li>
        </ol>
        
        <h3>Navigating the Interface</h3>
        <p>
          Once you've created your account and logged in, you'll be taken to your dashboard. 
          The main navigation is located on the left side of the screen:
        </p>
        <ul>
          <li><strong>Home</strong> - Your personalized feed of content</li>
          <li><strong>Search</strong> - Find specific products, companies, or topics</li>
          <li><strong>Chat</strong> - Communicate with other users and AI assistants</li>
          <li><strong>News</strong> - Stay up to date with the latest industry news</li>
          <li><strong>Products</strong> - Discover new and innovative products</li>
          <li><strong>Launches</strong> - See the latest product launches</li>
          <li><strong>Bookmarks</strong> - Acces your saved content</li>
          <li><strong>Premium</strong> - Upgrade for additional features</li>
          <li><strong>Profile</strong> - Manage your account settings</li>
        </ul>
        
        <h3>Creating Content</h3>
        <p>
          As a user, you can contribute to the Acces community by creating content:
        </p>
        <ol>
          <li>Click the "Create" button in the sidebar</li>
          <li>Choose the type of content you want to create (Post, Launch, or Product)</li>
          <li>Fill in the required information</li>
          <li>Submit your content for review</li>
        </ol>
        
        <h3>Next Steps</h3>
        <p>
          Now that you're familiar with the basics, explore our other documentation sections:
        </p>
        <ul>
          <li>Check out the <Link href="/docs/user-guide" className="text-teal-500 hover:underline">User Guide</Link> for detailed instructions</li>
          <li>Review the <Link href="/docs/api" className="text-teal-500 hover:underline">API Documentation</Link> if you're a developer</li>
          <li>Visit our <Link href="/docs/faq" className="text-teal-500 hover:underline">FAQ</Link> for answers to common questions</li>
        </ul>
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t">
        <div></div> {/* Empty div for spacing */}
        <Button asChild size="sm">
          <Link href="/docs/api">Next: API Documentation →</Link>
        </Button>
      </div>
    </div>
  );
}