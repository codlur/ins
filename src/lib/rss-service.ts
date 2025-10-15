import Parser from 'rss-parser';

// RSS feed URLs for the specified sources
const RSS_FEEDS = {
  'Futurism': 'https://futurism.com/feed',
  'The Verge': 'https://www.theverge.com/rss/index.xml',
  'TechCrunch': 'https://techcrunch.com/feed/',
  'ZDNET': 'https://www.zdnet.com/news/rss.xml',
  'Decrypt': 'https://decrypt.co/feed',
  'CNBC': 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
  'GitHub': 'https://github.blog/feed/',
  'Medium': 'https://medium.com/feed/tag/technology',
  'Medium AI': 'https://medium.com/feed/tag/artificial-intelligence',
  'BBC News': 'http://feeds.bbci.co.uk/news/rss.xml',
  'TechCrunch AI': 'https://techcrunch.com/tag/artificial-intelligence/feed/',
  'TechCrunch Apps': 'https://techcrunch.com/category/apps/feed/',
  'The Register': 'https://www.theregister.com/software/ai_ml/headlines.atom',
  // New RSS sources
  'CNBC AI': 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=19854910',
  'NVIDIA': 'https://blogs.nvidia.com/blog/category/generative-ai/feed/',
  'Crunchbase AI': 'https://news.crunchbase.com/sections/ai/feed/',
  'NY Times AI': 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/spotlight/artificial-intelligence/rss.xml',
  // Additional source
  'Futurism Ethics': 'https://futurism.com/category/ethics/feed'
};

// Source logos mapping
export const RSS_SOURCE_LOGOS: Record<string, string> = {
  'Futurism': '/futurism-logo.png',
  'The Verge': '/the-verge-logo.png',
  'TechCrunch': '/techcrunch-logo.png',
  'ZDNET': '/zdnet-logo.png',
  'Decrypt': '/decrypt-logo.png',
  'CNBC': '/cnbc-logo.png',
  'GitHub': '/github-logo.png',
  'Medium': '/medium-logo.png',
  'Medium AI': '/medium-logo.png',
  'BBC News': '/bbc-logo.png',
  'TechCrunch AI': '/techcrunch-logo.png',
  'TechCrunch Apps': '/techcrunch-logo.png',
  'The Register': '/the-register-logo.png',
  // New logo mappings
  'CNBC AI': '/cnbc-logo.png',
  'NVIDIA': '/nvidia-logo.png',
  'Crunchbase AI': '/crunchbase-logo.png',
  'NY Times AI': '/nytimes-logo.png',
  // Additional logo mapping
  'Futurism Ethics': '/futurism-logo.png',
  // Default logo
  'default': '/globe.svg'
};

export interface RSSArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export interface RSSResponse {
  status: string;
  totalResults: number;
  articles: RSSArticle[];
};

const parser = new Parser({
  timeout: 15000, // 15 second timeout
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
  }
});

// Keywords for AI/ML and generative AI content
const AI_KEYWORDS = [
  'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
  'generative ai', 'genai', 'gpt', 'chatgpt', 'llm', 'large language model',
  'ai model', 'ai assistant', 'natural language processing', 'nlp',
  'computer vision', 'reinforcement learning', 'transformer',
  'stable diffusion', 'dall-e', 'midjourney', 'imagen',
  'influencer', 'social media', 'content creator', 'youtube', 'tiktok', 'instagram'
];

// Function to check if text contains AI-related keywords
function isAIContent(text: string | null): boolean {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  
  // Check if the text contains any AI keywords
  return AI_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// Function to check if text is primarily English
function isEnglishText(text: string | null): boolean {
  if (!text) return true; // Null/empty text is considered valid
  
  // Remove HTML tags and URLs
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/https?:\/\/[^\s]+/g, '');
  
  // Check for common non-English characters
  const nonEnglishPattern = /[\u0600-\u06FF\u0400-\u04FF\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/;
  
  // If we find non-English characters, it's likely not English
  if (nonEnglishPattern.test(cleanText)) {
    return false;
  }
  
  // Additional check: if the text is very short, assume it's OK
  if (cleanText.length < 10) {
    return true;
  }
  
  return true;
}

// Function to validate image URL
function isValidImageUrl(url: string | null | undefined): string | null {
  if (!url || url === '' || url === 'null' || url === 'undefined') {
    return null;
  }
  
  // Check if it's a valid HTTP/HTTPS URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // For data URLs (base64 encoded images), allow them
  if (url.startsWith('data:image')) {
    return url;
  }
  
  return null;
}

// Function to extract image URL from RSS item content
function extractImageFromContent(content: string | null): string | null {
  if (!content) return null;
  
  // Look for img tags in the content
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = content.match(imgRegex);
  
  if (match && match[1]) {
    const imgUrl = match[1];
    // Validate the extracted URL
    return isValidImageUrl(imgUrl);
  }
  
  return null;
}

// Function to extract image URL from RSS item
function extractImageFromItem(item: any): string | null {
  return isValidImageUrl(item.enclosure?.url) || 
         isValidImageUrl(item['media:content']?.url) || 
         extractImageFromContent(item['content:encoded'] || item.content) || 
         null;
}

export async function fetchRSSNews(page: number = 1, limit: number = 50): Promise<RSSResponse> {
  try {
    const articles: RSSArticle[] = [];
    
    // Calculate date for last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Log for debugging - remove in production
    console.log('Filtering RSS articles for last 7 days:', sevenDaysAgo.toISOString(), 'to', now.toISOString());
    
    // Fetch from all RSS feeds concurrently with better error handling
    const feedPromises = Object.entries(RSS_FEEDS).map(async ([sourceName, feedUrl]) => {
      try {
        const feed = await parser.parseURL(feedUrl);
        
        // Filter items to only include those from the last 7 days
        const recentItems = feed.items.filter(item => {
          if (!item.isoDate && !item.pubDate) return false;
          const itemDate = new Date(item.isoDate || item.pubDate!);
          return itemDate >= sevenDaysAgo && itemDate <= now;
        });
        
        // Take more articles from each source to ensure we have enough after filtering
        // Increased from 30 to 50 to capture more articles over 7 days
        const feedArticles = recentItems.slice(0, 50).map(item => ({
          source: {
            id: sourceName,  // Use the exact source name as the ID to match the logo mapping
            name: sourceName
          },
          author: item.creator || item.author || item['dc:creator'] || null,
          title: item.title || 'Untitled',
          description: item.contentSnippet || item.summary || item.content || null,
          url: item.link || '',
          urlToImage: extractImageFromItem(item),
          publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
          content: item['content:encoded'] || item.content || null
        }));
        
        return feedArticles;
      } catch (error) {
        console.error(`Error fetching RSS feed from ${sourceName} (${feedUrl}):`, error);
        // Return empty array instead of failing completely
        return [];
      }
    });
    
    // Wait for all feeds to be fetched with a timeout
    const feedResults = await Promise.all(feedPromises);
    
    // Flatten the results and add to articles array
    feedResults.forEach(feedArticles => {
      articles.push(...feedArticles);
    });
    
    // Filter articles based on criteria
    const filteredArticles = articles.filter(article => {
      // Filter out pypi.org articles
      if (article.url.includes('pypi.org')) {
        return false;
      }
      
      // Filter out non-English articles
      if (!isEnglishText(article.title) || !isEnglishText(article.description)) {
        return false;
      }
      
      // Filter to only include AI/ML and Influencer/AI content
      if (!isAIContent(article.title) && !isAIContent(article.description)) {
        return false;
      }
      
      // Filter out articles with invalid URLs
      if (!article.url || article.url.length < 10) {
        return false;
      }
      
      return true;
    });
    
    // Sort articles by published date (newest first)
    filteredArticles.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    
    // If we don't have enough articles, try to fetch more by reducing filters
    let finalArticles = filteredArticles;
    if (filteredArticles.length < 10) {
      // Fallback: include more general tech articles if we don't have enough AI content
      const lessFilteredArticles = articles.filter(article => {
        // Still filter out pypi.org and non-English
        if (article.url.includes('pypi.org')) return false;
        if (!isEnglishText(article.title) || !isEnglishText(article.description)) return false;
        if (!article.url || article.url.length < 10) return false;
        return true;
      });
      
      // Sort and take the top articles
      lessFilteredArticles.sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
      
      // Combine AI articles with general tech articles, prioritizing AI content
      finalArticles = [...filteredArticles, ...lessFilteredArticles].slice(0, 200);
    }
    
    // Implement pagination
    const startIndex = (page - 1) * limit;
    const paginatedArticles = finalArticles.slice(startIndex, startIndex + limit);
    
    return {
      status: 'ok',
      totalResults: finalArticles.length,
      articles: paginatedArticles
    };
  } catch (error) {
    console.error('Error fetching RSS news:', error);
    // Return a fallback with some default content
    return {
      status: 'ok', // Still return ok status but with fewer articles
      totalResults: 0,
      articles: []
    };
  }
}

// Function to fetch news from a specific RSS source
export async function fetchRSSNewsFromSource(sourceName: string, page: number = 1, limit: number = 30): Promise<RSSResponse> {
  try {
    const feedUrl = RSS_FEEDS[sourceName as keyof typeof RSS_FEEDS];
    if (!feedUrl) {
      throw new Error(`RSS feed not found for source: ${sourceName}`);
    }
    
    const feed = await parser.parseURL(feedUrl);
    
    // Calculate date for last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Filter items to only include those from the last 7 days
    const recentItems = feed.items.filter(item => {
      if (!item.isoDate && !item.pubDate) return false;
      const itemDate = new Date(item.isoDate || item.pubDate!);
      return itemDate >= sevenDaysAgo && itemDate <= now;
    });
    
    const articles: RSSArticle[] = recentItems.map(item => ({
      source: {
        id: sourceName,  // Use the exact source name as the ID to match the logo mapping
        name: sourceName
      },
      author: item.creator || item.author || item['dc:creator'] || null,
      title: item.title || 'Untitled',
      description: item.contentSnippet || item.summary || item.content || null,
      url: item.link || '',
      urlToImage: extractImageFromItem(item),
      publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
      content: item['content:encoded'] || item.content || null
    }));
    
    // Filter articles based on criteria
    const filteredArticles = articles.filter(article => {
      // Filter out pypi.org articles
      if (article.url.includes('pypi.org')) {
        return false;
      }
      
      // Filter out non-English articles
      if (!isEnglishText(article.title) || !isEnglishText(article.description)) {
        return false;
      }
      
      // Filter to only include AI/ML and Influencer/AI content
      if (!isAIContent(article.title) && !isAIContent(article.description)) {
        return false;
      }
      
      // Filter out articles with invalid URLs
      if (!article.url || article.url.length < 10) {
        return false;
      }
      
      return true;
    });
    
    // Sort articles by published date (newest first)
    filteredArticles.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    
    // Implement pagination
    const startIndex = (page - 1) * limit;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + limit);
    
    return {
      status: 'ok',
      totalResults: filteredArticles.length,
      articles: paginatedArticles
    };
  } catch (error) {
    console.error(`Error fetching RSS news from ${sourceName}:`, error);
    return {
      status: 'ok', // Still return ok status but with fewer articles
      totalResults: 0,
      articles: []
    };
  }
}