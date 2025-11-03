"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompanyProfilePage() {
  const params = useParams();
  const companyId = params.id as string;
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock company data - in a real app this would come from an API
  const companies = [
    {
      id: "openai",
      name: "OpenAI",
      description: "Leading artificial intelligence research laboratory",
      logo: "/openai-logo.png",
      website: "https://openai.com",
      founded: "2015",
      headquarters: "San Francisco, CA",
      employees: "100-200",
      funding: "$10B+",
      about: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity. We conduct fundamental research in artificial intelligence with the goal of developing safe and beneficial AGI.",
      products: [
        "GPT-4",
        "ChatGPT",
        "DALL-E",
        "Whisper",
        "Embeddings API"
      ]
    },
    {
      id: "anthropic",
      name: "Anthropic",
      description: "AI safety and research company",
      logo: "/anthropic-logo.png",
      website: "https://anthropic.com",
      founded: "2021",
      headquarters: "San Francisco, CA",
      employees: "100-200",
      funding: "$1B+",
      about: "Anthropic is focused on developing safe and interpretable AI systems. The company was founded by former OpenAI researchers and is known for its Constitutional AI approach to training AI systems.",
      products: [
        "Claude",
        "Claude 2",
        "Constitutional AI"
      ]
    },
    {
      id: "deepmind",
      name: "DeepMind",
      description: "AI research and deployment company",
      logo: "/deepmind-logo.png",
      website: "https://deepmind.com",
      founded: "2010",
      headquarters: "London, UK",
      employees: "1000+",
      funding: "Acquired by Google",
      about: "DeepMind is a British AI company that was acquired by Google in 2014. The company is known for its breakthroughs in reinforcement learning and game-playing AI systems.",
      products: [
        "AlphaGo",
        "AlphaZero",
        "AlphaFold",
        "Gemini (collaboration with Google)"
      ]
    },
    {
      id: "google-ai",
      name: "Google AI",
      description: "Google's artificial intelligence division",
      logo: "/google-ai-logo.png",
      website: "https://ai.google",
      founded: "2017",
      headquarters: "Mountain View, CA",
      employees: "10000+",
      funding: "Part of Alphabet",
      about: "Google AI is Google's dedicated AI research division. The team works on a wide range of AI research and applications across Google's products and services.",
      products: [
        "BERT",
        "Transformer",
        "LaMDA",
        "PaLM",
        "Gemini"
      ]
    },
    {
      id: "microsoft-ai",
      name: "Microsoft AI",
      description: "Microsoft's artificial intelligence initiatives",
      logo: "/microsoft-ai-logo.png",
      website: "https://ai.microsoft.com",
      founded: "2017",
      headquarters: "Redmond, WA",
      employees: "10000+",
      funding: "Part of Microsoft",
      about: "Microsoft AI is Microsoft's comprehensive approach to artificial intelligence, integrating AI capabilities across all Microsoft products and services.",
      products: [
        "Azure AI",
        "Copilot",
        "GitHub Copilot",
        "Microsoft 365 AI"
      ]
    },
    {
      id: "amazon-ai",
      name: "Amazon AI",
      description: "Amazon's machine learning and AI services",
      logo: "/amazon-ai-logo.png",
      website: "https://aws.amazon.com/ai",
      founded: "2014",
      headquarters: "Seattle, WA",
      employees: "10000+",
      funding: "Part of Amazon",
      about: "Amazon AI provides machine learning and AI services through AWS, as well as AI features in Amazon's consumer products.",
      products: [
        "SageMaker",
        "Alexa",
        "Rekognition",
        "Polly"
      ]
    },
    {
      id: "nvidia-ai",
      name: "NVIDIA AI",
      description: "GPU and AI computing technology leader",
      logo: "/nvidia-ai-logo.png",
      website: "https://nvidia.com",
      founded: "1993",
      headquarters: "Santa Clara, CA",
      employees: "20000+",
      funding: "Public company",
      about: "NVIDIA is a technology company that designs GPUs for gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market.",
      products: [
        "CUDA",
        "TensorRT",
        "RAPIDS",
        "Omniverse"
      ]
    },
    {
      id: "ibm-watson",
      name: "IBM Watson",
      description: "IBM's cognitive computing platform",
      logo: "/ibm-watson-logo.png",
      website: "https://ibm.com/watson",
      founded: "2011",
      headquarters: "Armonk, NY",
      employees: "10000+",
      funding: "Part of IBM",
      about: "IBM Watson is IBM's suite of enterprise-ready AI services, applications, and tooling. Named after IBM's first CEO, Thomas J. Watson.",
      products: [
        "Watson Assistant",
        "Watson Discovery",
        "Watson Studio",
        "Watsonx"
      ]
    },
    {
      id: "meta-ai",
      name: "Meta AI",
      description: "Meta's artificial intelligence research",
      logo: "/meta-ai-logo.png",
      website: "https://ai.facebook.com",
      founded: "2013",
      headquarters: "Menlo Park, CA",
      employees: "10000+",
      funding: "Part of Meta",
      about: "Meta AI is Meta's AI research division, focused on advancing the field of artificial intelligence through fundamental research and practical applications.",
      products: [
        "PyTorch",
        "Llama",
        "Segment Anything Model (SAM)",
        "Make-A-Video"
      ]
    },
    {
      id: "tesla-ai",
      name: "Tesla AI",
      description: "Tesla's AI and autopilot technology",
      logo: "/tesla-ai-logo.png",
      website: "https://tesla.com",
      founded: "2003",
      headquarters: "Austin, TX",
      employees: "100000+",
      funding: "Public company",
      about: "Tesla's AI division focuses on autonomous driving technology and robotics, including the development of the Full Self-Driving (FSD) system.",
      products: [
        "Autopilot",
        "Full Self-Driving",
        "Dojo",
        "Optimus"
      ]
    },
    {
      id: "apple-ai",
      name: "Apple AI",
      description: "Apple's machine learning and AI services",
      logo: "/apple-ai-logo.png",
      website: "https://apple.com",
      founded: "1976",
      headquarters: "Cupertino, CA",
      employees: "150000+",
      funding: "Public company",
      about: "Apple AI focuses on integrating AI and machine learning into Apple's ecosystem of devices and services, emphasizing privacy and user experience.",
      products: [
        "Siri",
        "Core ML",
        "Create ML",
        "Neural Engine"
      ]
    },
    {
      id: "salesforce-einstein",
      name: "Salesforce Einstein",
      description: "Salesforce's AI platform",
      logo: "/salesforce-einstein-logo.png",
      website: "https://salesforce.com",
      founded: "1999",
      headquarters: "San Francisco, CA",
      employees: "70000+",
      funding: "Public company",
      about: "Salesforce Einstein brings AI to every business user through predictive analytics, natural language processing, and machine learning capabilities.",
      products: [
        "Einstein Analytics",
        "Einstein Discovery",
        "Einstein Next Best Action",
        "Einstein Voice"
      ]
    }
  ];

  useEffect(() => {
    if (companyId) {
      const foundCompany = companies.find(c => c.id === companyId);
      setCompany(foundCompany);
      setLoading(false);
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
        <div className="rounded-lg border p-6 text-center">
          <h1 className="text-2xl font-bold">Company Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The company you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-4" asChild>
            <a href="/app/companies">Back to Companies</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
          <p className="text-muted-foreground mt-2">
            {company.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {company.about}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products & Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {company.products.map((product: string, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <span className="font-medium">{product}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Founded</h4>
                <p className="text-muted-foreground">{company.founded}</p>
              </div>
              <div>
                <h4 className="font-medium">Headquarters</h4>
                <p className="text-muted-foreground">{company.headquarters}</p>
              </div>
              <div>
                <h4 className="font-medium">Employees</h4>
                <p className="text-muted-foreground">{company.employees}</p>
              </div>
              <div>
                <h4 className="font-medium">Funding</h4>
                <p className="text-muted-foreground">{company.funding}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-32 flex items-center justify-center">
                <span className="text-muted-foreground">Company Logo</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}