"use client";

import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";

// Mock company data - in a real app this would come from an API
const companies = [
  {
    id: '1',
    name: "OpenAI",
    description: "Leading artificial intelligence research laboratory",
    logo: "/openai-logo.png",
    website: "https://openai.com",
    founded: "2015",
    headquarters: "San Francisco, CA",
    employees: "1000+",
    funding: "$10B+",
    content: "OpenAI is an artificial intelligence research laboratory consisting of the for-profit OpenAI LP and its parent company, the non-profit OpenAI Inc. OpenAI conducts AI research with the goal of developing 'safe and beneficial' artificial general intelligence, which it defines as 'highly autonomous systems that outperform humans at most economically valuable work'."
  },
  {
    id: '2',
    name: "Anthropic",
    description: "AI safety and research company",
    logo: "/anthropic-logo.png",
    website: "https://anthropic.com",
    founded: "2021",
    headquarters: "San Francisco, CA",
    employees: "500+",
    funding: "$5B+",
    content: "Anthropic is an American AI safety company focused on developing and researching safe and steerable AI systems. The company was founded by former members of OpenAI, including Dario Amodei and Daniela Amodei. Anthropic is known for developing Claude, a large language model designed to be helpful, harmless, and honest."
  },
  {
    id: '3',
    name: "DeepMind",
    description: "AI research and deployment company",
    logo: "/deepmind-logo.png",
    website: "https://deepmind.com",
    founded: "2010",
    headquarters: "London, UK",
    employees: "1000+",
    funding: "Acquired by Google",
    content: "DeepMind Technologies is a British artificial intelligence company founded in 2010. The company was acquired by Google in 2014. DeepMind has created neural network systems that teach themselves to play video games in a fashion similar to how humans learn, and has also created systems that learn how to play simple board games. In 2016, DeepMind's AlphaGo program beat the world champion Go player Lee Sedol."
  }
];

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  // Find the company by ID
  const company = companies.find(c => c.id === params.id);
  
  // If company not found, show 404
  if (!company) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => window.history.back()}>
          ← Back to Companies
        </Button>
      </div>
      
      <div className="border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex-shrink-0" />
          <div>
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-muted-foreground mt-2">{company.description}</p>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Founded</p>
                <p className="font-medium">{company.founded}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Headquarters</p>
                <p className="font-medium">{company.headquarters}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="font-medium">{company.employees}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Funding</p>
                <p className="font-medium">{company.funding}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-muted-foreground">{company.content}</p>
        </div>
        
        <div className="mt-6">
          <Button asChild>
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}