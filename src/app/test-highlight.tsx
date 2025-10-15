'use client';

import { highlightImportantWords } from "@/lib/utils";

export default function TestHighlight() {
  const testTitles = [
    "Google announces new AI model Gemini for enterprise use",
    "Elon Musk's Tesla unveils revolutionary self-driving technology",
    "OpenAI releases GPT-4 with enhanced reasoning capabilities",
    "Microsoft partners with NVIDIA to accelerate AI development",
    "Apple introduces new M3 chips for improved performance",
    "Meta's Mark Zuckerberg discusses future of the metaverse",
    "Amazon launches new AWS service for machine learning",
    "DeepMind's AlphaFold solves protein folding problem",
    "Anthropic releases Claude 3 with improved safety features",
    "GitHub introduces new AI-powered code review tools"
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Highlighting</h1>
      <div className="space-y-4">
        {testTitles.map((title, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Original:</h2>
            <p className="mb-4">{title}</p>
            <h2 className="text-lg font-semibold mb-2">Highlighted:</h2>
            <p dangerouslySetInnerHTML={{ __html: highlightImportantWords(title) }} />
          </div>
        ))}
      </div>
    </div>
  );
}