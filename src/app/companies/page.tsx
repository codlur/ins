"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const companies = [
    {
      id: "1",
      name: "OpenAI",
      description: "Leading artificial intelligence research laboratory",
      logo: "/openai-logo.png",
      website: "https://openai.com"
    },
    {
      id: "2",
      name: "Anthropic",
      description: "AI safety and research company",
      logo: "/anthropic-logo.png",
      website: "https://anthropic.com"
    },
    {
      id: "3",
      name: "DeepMind",
      description: "AI research and deployment company",
      logo: "/deepmind-logo.png",
      website: "https://deepmind.com"
    },
    {
      id: "4",
      name: "Google AI",
      description: "Google's artificial intelligence division",
      logo: "/google-ai-logo.png",
      website: "https://ai.google"
    },
    {
      id: "5",
      name: "Microsoft AI",
      description: "Microsoft's artificial intelligence initiatives",
      logo: "/microsoft-ai-logo.png",
      website: "https://ai.microsoft.com"
    },
    {
      id: "6",
      name: "Amazon AI",
      description: "Amazon's machine learning and AI services",
      logo: "/amazon-ai-logo.png",
      website: "https://aws.amazon.com/ai"
    },
    {
      id: "7",
      name: "NVIDIA AI",
      description: "GPU and AI computing technology leader",
      logo: "/nvidia-ai-logo.png",
      website: "https://nvidia.com"
    },
    {
      id: "8",
      name: "IBM Watson",
      description: "IBM's cognitive computing platform",
      logo: "/ibm-watson-logo.png",
      website: "https://ibm.com/watson"
    },
    {
      id: "9",
      name: "Meta AI",
      description: "Meta's artificial intelligence research",
      logo: "/meta-ai-logo.png",
      website: "https://ai.facebook.com"
    },
    {
      id: "10",
      name: "Tesla AI",
      description: "Tesla's AI and autopilot technology",
      logo: "/tesla-ai-logo.png",
      website: "https://tesla.com"
    },
    {
      id: "11",
      name: "Apple AI",
      description: "Apple's machine learning and AI services",
      logo: "/apple-ai-logo.png",
      website: "https://apple.com"
    },
    {
      id: "12",
      name: "Salesforce Einstein",
      description: "Salesforce's AI platform",
      logo: "/salesforce-einstein-logo.png",
      website: "https://salesforce.com"
    }
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground mt-2">
            Leading companies in artificial intelligence and technology
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="w-full md:w-64 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCompanies.map((company) => (
          <Link key={company.id} href={`/companies/${company.id}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow block">
            <div className="flex items-start gap-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="flex-1">
                <h3 className="font-semibold">{company.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{company.description}</p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="rounded-lg border p-6 text-center mt-6">
          <p className="text-muted-foreground">No companies found matching your search.</p>
        </div>
      )}
    </div>
  );
}