const Parser = require('rss-parser');
const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
  }
});

const THE_DECODER_RSS_URL = 'https://the-decoder.com/feed/';

async function testTheDecoderFeed() {
  console.log('Testing The Decoder RSS feed...');
  
  try {
    console.log(`Fetching feed from ${THE_DECODER_RSS_URL}...`);
    const feed = await parser.parseURL(THE_DECODER_RSS_URL);
    console.log(`✓ Successfully fetched The Decoder feed: Found ${feed.items.length} items`);
    
    // Show first few items as examples
    console.log('\nFirst 3 items:');
    for (let i = 0; i < Math.min(3, feed.items.length); i++) {
      const item = feed.items[i];
      console.log(`  ${i+1}. ${item.title}`);
      console.log(`     Published: ${item.pubDate || item.isoDate}`);
      console.log(`     Link: ${item.link}`);
      console.log('');
    }
  } catch (error) {
    console.log(`✗ Error fetching The Decoder feed: ${error.message}`);
  }
}

testTheDecoderFeed();