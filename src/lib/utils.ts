import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to highlight important words with teal color
export function highlightImportantWords(text: string): string {
  // List of important words to highlight (company names, brand names, org names, celebrities, founders, human names)
  const importantWords = [
    // Tech companies and brands
    'Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Facebook', 'Twitter', 'Tesla', 'NVIDIA', 'Intel',
    'OpenAI', 'Anthropic', 'DeepMind', 'Hugging Face', 'GitHub', 'GitLab', 'Docker', 'Kubernetes',
    'Salesforce', 'Oracle', 'IBM', 'Cisco', 'Adobe', 'Netflix', 'Spotify', 'Uber', 'Airbnb',
    'Samsung', 'Sony', 'Qualcomm', 'AMD', 'ARM', 'Red Hat', 'VMware', 'SAP', 'Accenture',
    
    // AI/ML specific companies and projects
    'ChatGPT', 'GPT', 'Claude', 'Gemini', 'Bard', 'Copilot', 'Midjourney', 'DALL-E', 'Stable Diffusion',
    'LLaMA', 'PaLM', 'BERT', 'GPT-4', 'GPT-3', 'Whisper', 'DALL·E', 'Imagen', 'Parti',
    
    // Founders and key people
    'Elon Musk', 'Sam Altman', 'Satya Nadella', 'Tim Cook', 'Mark Zuckerberg', 'Jack Dorsey',
    'Demis Hassabis', 'Yann LeCun', 'Geoffrey Hinton', 'Yoshua Bengio', 'Fei-Fei Li',
    'Andrew Ng', 'Lex Fridman', 'Karpathy', 'Sundar Pichai', 'Satya Nadella', 'Jensen Huang',
    'Reid Hoffman', 'Eric Schmidt', 'Larry Page', 'Sergey Brin', 'Jeff Bezos', 'Andy Jassy',
    'Shantanu Narayen', 'Chuck Robbins', 'Arvind Krishna', 'Pat Gelsinger', 'Lisa Su',
    
    // Organizations and institutions
    'MIT', 'Stanford', 'Harvard', 'Google Research', 'Microsoft Research', 'Facebook AI',
    'Allen Institute', 'OpenAI', 'Anthropic', 'DeepMind', 'EleutherAI', 'LAION',
    'Carnegie Mellon', 'Berkeley', 'Oxford', 'Cambridge', 'ETH Zurich',
    
    // Popular influencers and content creators
    'Lex Fridman', 'Andrew Ng', 'Yann LeCun', 'Karpathy', 'Santiago Valdarrama',
    'AI Coffee Break', 'Two Minute Papers', 'Arxiv Insights', 'Yannic Kilcher',
    
    // Popular tech terms that might be important in context
    'AI', 'ML', 'NLP', 'CV', 'LLM', 'API', 'SDK', 'IPO', 'VC', 'GPU', 'TPU'
  ];

  // Sort by length (longest first) to avoid partial replacements
  const sortedWords = [...importantWords].sort((a, b) => b.length - a.length);
  
  let highlightedText = text;
  
  // Replace each important word with a highlighted version
  sortedWords.forEach(word => {
    // Escape special regex characters
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create a regex that matches the word with word boundaries
    // Using a more specific approach to avoid matching partial words
    const regex = new RegExp(`(?<!\\w)${escapedWord}(?!\\w)`, 'gi');
    
    // Replace with highlighted span
    highlightedText = highlightedText.replace(regex, `<span class="text-teal-500 font-medium">$&</span>`);
  });
  
  return highlightedText;
}
