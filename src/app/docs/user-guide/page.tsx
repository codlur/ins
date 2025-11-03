"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserGuideDoc() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-4 pl-0">
            <Link href="/docs">← Back to Documentation</Link>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">User Guide</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Detailed instructions on using all features of Acces.
          </p>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none mt-6">
        <h3>Navigation</h3>
        <p>
          The Acces interface is designed to be intuitive and easy to navigate:
        </p>
        <ul>
          <li><strong>Home</strong> - Your personalized feed of content based on your interests</li>
          <li><strong>Search</strong> - Find specific products, companies, or topics using our powerful search</li>
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
          Contributing to the Acces community is easy:
        </p>
        <ol>
          <li>Click the "Create" button in the sidebar</li>
          <li>Choose the type of content you want to create:
            <ul>
              <li><strong>Post</strong> - Share your thoughts, insights, or news</li>
              <li><strong>Launch</strong> - Announce a new product or feature (Premium only)</li>
              <li><strong>Product</strong> - Showcase a product (Business only)</li>
            </ul>
          </li>
          <li>Fill in the required information</li>
          <li>Submit your content for review</li>
        </ol>
        
        <h3>Managing Your Account</h3>
        <p>
          Your account settings can be accessed through the Profile section:
        </p>
        <ul>
          <li><strong>Profile Information</strong> - Update your name, bio, and profile picture</li>
          <li><strong>Preferences</strong> - Customize your feed and notification settings</li>
          <li><strong>Security</strong> - Manage your password and two-factor authentication</li>
          <li><strong>Billing</strong> - View and manage your subscription</li>
        </ul>
        
        <h3>Bookmarks</h3>
        <p>
          Save content for later by bookmarking:
        </p>
        <ol>
          <li>Find content you want to save</li>
          <li>Click the bookmark icon</li>
          <li>Acces all your bookmarks from the Bookmarks section</li>
        </ol>
      </div>
      
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button asChild size="sm">
          <Link href="/docs/api">← Previous: API Documentation</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/docs/faq">Next: FAQ →</Link>
        </Button>
      </div>
    </div>
  );
}