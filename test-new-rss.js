const Parser = require('rss-parser');
const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
  }
});

const NEW_RSS_FEEDS = {
  'CNBC AI': 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=19854910',
  'NVIDIA': 'https://blogs.nvidia.com/blog/category/generative-ai/feed/',
  'Crunchbase AI': 'https://news.crunchbase.com/sections/ai/feed/',
  'NY Times AI': 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/spotlight/artificial-intelligence/rss.xml'
};

async function testNewFeeds() {
  console.log('Testing new RSS feeds...');
  
  for (const [sourceName, feedUrl] of Object.entries(NEW_RSS_FEEDS)) {
    try {
      console.log(`Testing ${sourceName}...`);
      const feed = await parser.parseURL(feedUrl);
      console.log(`✓ ${sourceName}: Found ${feed.items.length} items`);
      
      // Show first item as example
      if (feed.items.length > 0) {
        console.log(`  First item: ${feed.items[0].title}`);
      }
    } catch (error) {
      console.log(`✗ ${sourceName}: ${error.message}`);
    }
  }
}

testNewFeeds();