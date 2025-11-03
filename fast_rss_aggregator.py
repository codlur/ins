#!/usr/bin/env python3
"""
Fast RSS Feed Aggregator with AI-powered filtering

This script fetches RSS feeds from multiple sources concurrently,
processes articles with AI-powered filtering, and provides a fast,
efficient way to aggregate news and articles.
"""

import asyncio
import aiohttp
import feedparser
import json
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import re
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor
import sqlite3
from urllib.parse import urlparse
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# RSS feed URLs for the specified sources
RSS_FEEDS = {
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
    'Futurism Ethics': 'https://futurism.com/category/ethics/feed',
    'Wired': 'https://www.wired.com/feed/rss',
    'The Decoder': 'https://the-decoder.com/feed/',
    'aisearch': 'https://aisearch.substack.com/feed',
    'The Creators AI': 'https://thecreatorsai.com/feed',
    'Superhuman': 'https://www.superhuman.ai/feed',
    'The Rundown': 'https://www.therundown.ai/feed',
    'The Neuron': 'https://www.theneuron.ai/newsletter/feed',
    'DeepLearning.AI': 'https://www.deeplearning.ai/the-batch/feed'
}

# Keywords for AI/ML and generative AI content
AI_KEYWORDS = [
    'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
    'generative ai', 'genai', 'gpt', 'chatgpt', 'llm', 'large language model',
    'ai model', 'ai assistant', 'natural language processing', 'nlp',
    'computer vision', 'reinforcement learning', 'transformer',
    'stable diffusion', 'dall-e', 'midjourney', 'imagen',
    'influencer', 'social media', 'content creator', 'youtube', 'tiktok', 'instagram'
]

# Database setup
DB_NAME = 'rss_articles.db'

def init_db():
    """Initialize the database with the articles table."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source TEXT,
            title TEXT,
            description TEXT,
            url TEXT UNIQUE,
            published_at TEXT,
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@dataclass
class Article:
    """Data class to represent an article."""
    source: str
    title: str
    description: Optional[str]
    url: str
    published_at: str
    content: Optional[str]

    def to_dict(self) -> Dict[str, Any]:
        """Convert article to dictionary."""
        return {
            'source': self.source,
            'title': self.title,
            'description': self.description,
            'url': self.url,
            'published_at': self.published_at,
            'content': self.content
        }

def is_ai_content(text: Optional[str]) -> bool:
    """Check if text contains AI-related keywords."""
    if not text:
        return False
    
    lower_text = text.lower()
    return any(keyword in lower_text for keyword in AI_KEYWORDS)

def is_english_text(text: Optional[str]) -> bool:
    """Check if text is primarily English."""
    if not text:
        return True
    
    # Remove HTML tags and URLs
    clean_text = re.sub(r'<[^>]*>', '', text)
    clean_text = re.sub(r'https?:\/\/[^\s]+', '', clean_text)
    
    # Check for common non-English characters
    non_english_pattern = re.compile(r'[\u0600-\u06FF\u0400-\u04FF\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]')
    
    # If we find non-English characters, it's likely not English
    if non_english_pattern.search(clean_text):
        return False
    
    # Additional check: if the text is very short, assume it's OK
    if len(clean_text) < 10:
        return True
    
    return True

def extract_image_url(entry: Dict[str, Any]) -> Optional[str]:
    """Extract image URL from RSS entry."""
    # Check for enclosure
    if hasattr(entry, 'enclosures') and entry.enclosures:
        for enclosure in entry.enclosures:
            if 'type' in enclosure and 'image' in enclosure['type']:
                return enclosure['href']
    
    # Check for media content
    if hasattr(entry, 'media_content') and entry.media_content:
        for media in entry.media_content:
            if 'url' in media:
                return media['url']
    
    return None

async def fetch_rss_feed(session: aiohttp.ClientSession, source_name: str, feed_url: str) -> List[Article]:
    """Fetch and parse a single RSS feed."""
    try:
        async with session.get(feed_url, timeout=aiohttp.ClientTimeout(total=15)) as response:
            if response.status == 200:
                content = await response.text()
                feed = feedparser.parse(content)
                
                articles = []
                for entry in feed.entries[:100]:  # Limit to 100 entries per source
                    # Extract data from entry
                    title = getattr(entry, 'title', 'Untitled')
                    description = getattr(entry, 'summary', None)
                    content = getattr(entry, 'content', [{}])[0].get('value') if getattr(entry, 'content', None) else None
                    url = getattr(entry, 'link', '')
                    published_at = getattr(entry, 'published', getattr(entry, 'updated', datetime.now().isoformat()))
                    
                    # Create article object
                    article = Article(
                        source=source_name,
                        title=title,
                        description=description,
                        url=url,
                        published_at=published_at,
                        content=content
                    )
                    
                    articles.append(article)
                
                logger.info(f"Successfully fetched {len(articles)} articles from {source_name}")
                return articles
            else:
                logger.error(f"Failed to fetch {source_name}: HTTP {response.status}")
                return []
    except Exception as e:
        logger.error(f"Error fetching {source_name}: {str(e)}")
        return []

async def fetch_all_rss_feeds() -> List[Article]:
    """Fetch all RSS feeds concurrently."""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_rss_feed(session, source_name, feed_url) for source_name, feed_url in RSS_FEEDS.items()]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        all_articles = []
        for result in results:
            if isinstance(result, Exception):
                logger.error(f"Error in feed fetching: {result}")
            elif result:
                all_articles.extend(result)
        
        return all_articles

def filter_articles(articles: List[Article]) -> List[Article]:
    """Filter articles based on criteria."""
    filtered_articles = []
    
    for article in articles:
        # Filter out pypi.org articles
        if 'pypi.org' in article.url:
            continue
        
        # Filter out non-English articles
        if not is_english_text(article.title) or not is_english_text(article.description):
            continue
        
        # Filter to only include AI/ML and Influencer/AI content
        if not is_ai_content(article.title) and not is_ai_content(article.description):
            continue
        
        # Filter out articles with invalid URLs
        if not article.url or len(article.url) < 10:
            continue
        
        filtered_articles.append(article)
    
    return filtered_articles

def save_articles_to_db(articles: List[Article]):
    """Save articles to the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    for article in articles:
        try:
            cursor.execute('''
                INSERT OR IGNORE INTO articles (source, title, description, url, published_at, content)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                article.source,
                article.title,
                article.description,
                article.url,
                article.published_at,
                article.content
            ))
        except Exception as e:
            logger.error(f"Error saving article to DB: {e}")
    
    conn.commit()
    conn.close()
    logger.info(f"Saved {len(articles)} articles to database")

def get_articles_from_db(limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
    """Retrieve articles from the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT source, title, description, url, published_at, content
        FROM articles
        ORDER BY published_at DESC
        LIMIT ? OFFSET ?
    ''', (limit, offset))
    
    rows = cursor.fetchall()
    conn.close()
    
    articles = []
    for row in rows:
        articles.append({
            'source': row[0],
            'title': row[1],
            'description': row[2],
            'url': row[3],
            'published_at': row[4],
            'content': row[5]
        })
    
    return articles

async def main():
    """Main function to run the RSS aggregator."""
    logger.info("Starting fast RSS aggregator")
    
    # Initialize database
    init_db()
    
    # Fetch all RSS feeds
    articles = await fetch_all_rss_feeds()
    logger.info(f"Fetched {len(articles)} articles from all sources")
    
    # Filter articles
    filtered_articles = filter_articles(articles)
    logger.info(f"Filtered to {len(filtered_articles)} relevant articles")
    
    # Save to database
    save_articles_to_db(filtered_articles)
    
    # Retrieve and display some articles
    db_articles = get_articles_from_db(limit=10)
    logger.info(f"Retrieved {len(db_articles)} articles from database")
    
    # Print first few articles as examples
    for i, article in enumerate(db_articles[:3]):
        logger.info(f"Article {i+1}: {article['title']} from {article['source']}")

if __name__ == "__main__":
    start_time = time.time()
    asyncio.run(main())
    end_time = time.time()
    logger.info(f"Script completed in {end_time - start_time:.2f} seconds")