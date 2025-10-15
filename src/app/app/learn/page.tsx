"use client";

import { Input } from "@/components/ui/input";
import { Search as SearchIcon, BookOpen, Lightbulb, Video, FileText } from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
  const learningResources = [
    {
      title: "AI Fundamentals",
      description: "Learn the basics of artificial intelligence and machine learning",
      icon: BookOpen,
      href: "#"
    },
    {
      title: "Tutorials & Guides",
      description: "Step-by-step tutorials to help you master AI concepts",
      icon: Lightbulb,
      href: "#"
    },
    {
      title: "Video Courses",
      description: "Comprehensive video content for visual learners",
      icon: Video,
      href: "#"
    },
    {
      title: "Research Papers",
      description: "Access to cutting-edge AI research and publications",
      icon: FileText,
      href: "#"
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Learning Center</h1>
        <p className="text-muted-foreground">
          Expand your knowledge with our curated AI learning resources
        </p>
      </div>

      <div className="relative max-w-2xl">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search learning resources..." 
          className="pl-10 py-6 text-base rounded-xl"
        />
      </div>

      <div className="space-y-6">
        {learningResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div key={index}>
              <Link href={resource.href} className="block">
                <div className="pb-6 hover:bg-muted/50 transition-colors cursor-pointer p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-10">
                    {resource.description}
                  </p>
                </div>
              </Link>
              {index < learningResources.length - 1 && (
                <div className="border-b border-muted"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 pb-4 border-b border-muted">Featured Courses</h2>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={item}>
              <div className="pb-6 hover:bg-muted/50 transition-colors cursor-pointer p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-muted rounded-lg w-16 h-16 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">AI Course {item}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Comprehensive guide to artificial intelligence concepts
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">33%</span>
                    </div>
                  </div>
                </div>
              </div>
              {index < 5 && (
                <div className="border-b border-muted"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}