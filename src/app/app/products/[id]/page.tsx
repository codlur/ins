"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { StarRating } from "@/components/ui/star-rating";
import { ExternalLink, Play, Image as ImageIcon } from "lucide-react";

// Mock data for the product
const product = {
  id: 1,
  name: "AI Research Assistant",
  logo: "/placeholder.svg",
  category: "Productivity",
  description: "An advanced AI-powered research assistant that helps you stay ahead in the rapidly evolving world of artificial intelligence.",
  rating: 4.8,
  reviewCount: 124,
  overview: "Our AI Research Assistant leverages cutting-edge natural language processing to analyze thousands of research papers, patents, and articles daily. It identifies emerging trends, key players, and investment opportunities in the AI landscape.",
  launches: "Launched in Q2 2024 with initial support for computer vision and NLP research domains. Expanded to include robotics and reinforcement learning in Q3 2024.",
  useCases: [
    "Tracking competitor AI investments",
    "Identifying collaboration opportunities",
    "Monitoring regulatory changes in AI",
    "Finding talent in specialized AI fields"
  ],
  team: [
    { name: "Alex Johnson", role: "Lead AI Researcher" },
    { name: "Maria Garcia", role: "Data Scientist" },
    { name: "David Chen", role: "Product Manager" }
  ],
  images: [
    "/placeholder-image-1.jpg",
    "/placeholder-image-2.jpg",
    "/placeholder-image-3.jpg"
  ],
  videos: [
    "/demo-video.mp4"
  ]
};

export default function ProductDetailPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Logo */}
          <div className="bg-muted rounded-lg w-24 h-24 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
          
          {/* Product Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {product.category}
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-2xl">{product.description}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
            
            <Button>
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-4 border-b">
        <Button variant="ghost" className="border-b-2 border-primary rounded-none px-0">
          Overview
        </Button>
        <Button variant="ghost" className="rounded-none px-0">
          Launches
        </Button>
        <Button variant="ghost" className="rounded-none px-0">
          Use Cases
        </Button>
        <Button variant="ghost" className="rounded-none px-0">
          Team
        </Button>
      </div>
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground">{product.overview}</p>
          </section>
          
          {/* Launches */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Launches</h2>
            <p className="text-muted-foreground">{product.launches}</p>
          </section>
          
          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </section>
          
          {/* Team */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.team.map((member, index) => (
                <div key={index} className="border border-muted rounded-lg">
                  <div className="flex items-center gap-3 p-4">
                    <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="font-bold">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Media Section */}
        <div className="space-y-6">
          <div className="pb-4 border-b border-muted mb-4">
            <h3 className="text-lg font-semibold">Media</h3>
            <p className="text-sm text-muted-foreground">Images and videos showcasing the product</p>
          </div>
          <div className="space-y-4">
            {/* Images */}
            <div className="space-y-3">
              <h4 className="font-medium">Images</h4>
              <div className="grid grid-cols-2 gap-3">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-muted my-4"></div>
            
            {/* Videos */}
            <div className="space-y-3">
              <h4 className="font-medium">Videos</h4>
              <div className="space-y-3">
                {product.videos.map((video, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center gap-2">
                    <Play className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Demo Video</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}