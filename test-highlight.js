// Simple test for highlight function
const testString = "Google announces new AI model Gemini for enterprise use";
console.log("Original:", testString);

// Simple implementation of the highlight function for testing
function highlightImportantWords(text) {
  const importantWords = [
    'Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Facebook', 'Twitter', 'Tesla', 'NVIDIA', 'Intel',
    'OpenAI', 'Anthropic', 'DeepMind', 'Hugging Face', 'GitHub', 'GitLab', 'Docker', 'Kubernetes',
    'ChatGPT', 'GPT', 'Claude', 'Gemini', 'Bard', 'Copilot', 'Midjourney', 'DALL-E', 'Stable Diffusion',
    'Elon Musk', 'Sam Altman', 'Satya Nadella', 'Tim Cook', 'Mark Zuckerberg', 'Jack Dorsey',
    'Demis Hassabis', 'Yann LeCun', 'Geoffrey Hinton', 'Yoshua Bengio', 'Fei-Fei Li'
  ];

  let highlightedText = text;
  
  // Sort by length (longest first) to avoid partial replacements
  const sortedWords = [...importantWords].sort((a, b) => b.length - a.length);
  
  // Replace each important word with a highlighted version
  sortedWords.forEach(word => {
    // Escape special regex characters
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create a regex that matches the word with word boundaries
    const regex = new RegExp(`(?<!\\w)${escapedWord}(?!\\w)`, 'gi');
    
    // Replace with highlighted span
    highlightedText = highlightedText.replace(regex, `<span class="text-teal-500 font-medium">$&</span>`);
  });
  
  return highlightedText;
}

console.log("Highlighted:", highlightImportantWords(testString));