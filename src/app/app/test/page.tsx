'use client';

import { NewsCard } from "@/components/news-card";

export default function TestHighlightingPage() {
  // Test data with various important words
  const testNewsItems = [
    {
      title: "Google announces new AI model Gemini for enterprise use",
      sourceName: "TechCrunch",
      sourceUrl: "https://techcrunch.com",
      publishedAt: new Date().toISOString()
    },
    {
      title: "Elon Musk's Tesla unveils revolutionary self-driving technology powered by NVIDIA chips",
      sourceName: "The Verge",
      sourceUrl: "https://theverge.com",
      publishedAt: new Date().toISOString()
    },
    {
      title: "OpenAI releases GPT-4 with enhanced reasoning capabilities",
      sourceName: "MIT Technology Review",
      sourceUrl: "https://technologyreview.com",
      publishedAt: new Date().toISOString()
    },
    {
      title: "Microsoft partners with GitHub to improve developer tools",
      sourceName: "TechCrunch",
      sourceUrl: "https://techcrunch.com",
      publishedAt: new Date().toISOString()
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">News Card Highlighting Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testNewsItems.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            sourceName={item.sourceName}
            sourceUrl={item.sourceUrl}
            publishedAt={item.publishedAt}
          />
        ))}
      </div>
    </div>
  );
}