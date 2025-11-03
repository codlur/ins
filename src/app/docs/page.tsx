"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("gettingStarted");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  const menuItems = [
    {
      id: "gettingStarted" as const,
      title: "Getting Started"
    },
    {
      id: "api" as const,
      title: "API Documentation"
    },
    {
      id: "userGuide" as const,
      title: "User Guide"
    },
    {
      id: "faq" as const,
      title: "FAQ"
    }
  ];

  const contentItems = [
    {
      id: "gettingStarted",
      title: "Getting Started",
      description: "Learn the basics of Acces and how to get started quickly.",
      content: [
        {
          heading: "Introduction",
          text: "Welcome to Acces! This guide will help you get started with our platform quickly. Acces is designed to help you discover and explore innovative products, news, and launches in technology."
        },
        {
          heading: "Creating Your Account",
          text: "To get started with Acces, you'll need to create an account:",
          list: [
            "Visit the sign up page",
            "Enter your email address and create a password",
            "Verify your email address through the confirmation email",
            "Complete your profile information"
          ]
        },
        {
          heading: "Navigating the Interface",
          text: "Once you've created your account and logged in, you'll be taken to your dashboard. The main navigation is located on the left side of the screen:",
          list: [
            "Home - Your personalized feed of content",
            "Search - Find specific products, companies, or topics",
            "Chat - Communicate with other users and AI assistants",
            "News - Stay up to date with the latest industry news",
            "Products - Discover new and innovative products",
            "Launches - See the latest product launches"
          ]
        }
      ]
    },
    {
      id: "api",
      title: "API Documentation",
      description: "Comprehensive guide to using the Acces API for developers.",
      content: [
        {
          heading: "Overview",
          text: "The Acces API provides programmatic access to our platform's features, allowing developers to integrate Acces functionality into their own applications."
        },
        {
          heading: "Authentication",
          text: "All API requests require authentication using an API key. You can generate an API key from your account settings page.",
          code: "curl -H \"Authorization: Bearer YOUR_API_KEY\" \\\nhttps://api.access.com/v1/products"
        },
        {
          heading: "Rate Limits",
          text: "The API has rate limits to ensure fair usage:",
          list: [
            "100 requests per minute for free accounts",
            "1000 requests per minute for premium accounts",
            "10000 requests per minute for business accounts"
          ]
        }
      ]
    },
    {
      id: "userGuide",
      title: "User Guide",
      description: "Detailed instructions on using all features of Acces.",
      content: [
        {
          heading: "Navigation",
          text: "The Acces interface is designed to be intuitive and easy to navigate:",
          list: [
            "Home - Your personalized feed of content based on your interests",
            "Search - Find specific products, companies, or topics using our powerful search",
            "Chat - Communicate with other users and AI assistants",
            "News - Stay up to date with the latest industry news",
            "Products - Discover new and innovative products",
            "Launches - See the latest product launches",
            "Bookmarks - Acces your saved content",
            "Premium - Upgrade for additional features",
            "Profile - Manage your account settings"
          ]
        }
      ]
    },
    {
      id: "faq",
      title: "FAQ",
      description: "Frequently asked questions and troubleshooting tips.",
      content: [
        {
          heading: "How do I reset my password?",
          text: "If you've forgotten your password, you can reset it by clicking the \"Forgot Password\" link on the login page. Enter your email address and follow the instructions sent to your inbox."
        },
        {
          heading: "How do I upgrade to Premium?",
          text: "You can upgrade to Premium by visiting the Premium section in your account. Premium users get access to additional features like creating launches and products, advanced search filters, and priority support."
        }
      ]
    }
  ];

  const activeContent = contentItems.find(item => item.id === activeSection) || contentItems[0];

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 pt-4 max-w-7xl mx-auto w-full">
      {/* Header with Logo, Search, and Theme Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {/* Logo Section */}
          <div className="flex h-14 items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span 
                  className="text-2xl font-normal transition-colors duration-300 ease-in-out hover:text-teal-500" 
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  Acces
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search documentation..." 
              className="pl-10 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      
      {/* Horizontal Menu */}
      <div className="flex space-x-6 mb-6 border-b pb-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`whitespace-nowrap py-2 text-sm font-medium ${activeSection === item.id ? 'text-teal-500 border-b-2 border-teal-500' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 gap-6">
        {/* Sidebar Sub-items */}
        <div className="w-48 border-r pr-4 hidden md:block">
          <div className="space-y-1">
            {activeContent.content.map((item, index) => (
              <button
                key={index}
                className="block py-1.5 text-sm text-muted-foreground hover:text-foreground pl-2 hover:bg-accent rounded text-left w-full"
              >
                {item.heading}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{activeContent.title}</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {activeContent.description}
          </p>
          
          {/* Content Items */}
          <div className="space-y-8">
            {activeContent.content.map((item, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold mb-3">{item.heading}</h2>
                <p className="text-muted-foreground mb-4">{item.text}</p>
                
                {item.list && (
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    {item.list.map((listItem, listIndex) => (
                      <li key={listIndex} className="text-muted-foreground">{listItem}</li>
                    ))}
                  </ul>
                )}
                
                {item.code && (
                  <pre className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                    <code>{item.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold text-lg mb-3">Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/support">Contact Support</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/community">Community Forum</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* On this page sidebar */}
        <div className="w-48 hidden lg:block">
          <div className="sticky top-24">
            <h3 className="font-semibold text-sm mb-3">On this page</h3>
            <ul className="space-y-2">
              {activeContent.content.map((item, index) => (
                <li key={index}>
                  <button className="text-sm text-muted-foreground hover:text-foreground text-left w-full">
                    {item.heading}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}