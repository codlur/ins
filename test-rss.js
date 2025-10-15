const Parser = require('rss-parser');
const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
  }
});

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
  'CNBC AI': 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=19854910',
  'NVIDIA': 'https://blogs.nvidia.com/blog/category/generative-ai/feed/',
  'Crunchbase AI': 'https://news.crunchbase.com/sections/ai/feed/',
  'NY Times AI': 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/spotlight/artificial-intelligence/rss.xml',
  // Additional source
  'Futurism Ethics': 'https://futurism.com/category/ethics/feed'
};

async function testFeeds() {
  console.log('Testing RSS feeds...');
  
  for (const [sourceName, feedUrl] of Object.entries(RSS_FEEDS)) {
    try {
      console.log(`Testing ${sourceName}...`);
      const feed = await parser.parseURL(feedUrl);
      console.log(`✓ ${sourceName}: Found ${feed.items.length} items`);
    } catch (error) {
      console.log(`✗ ${sourceName}: ${error.message}`);
    }
  }
}

testFeeds();