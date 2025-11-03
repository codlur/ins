#!/usr/bin/env python3
"""
Fast RSS API Server

This script creates a fast API server that serves RSS articles
aggregated by the fast_rss_aggregator.py script.
"""

import asyncio
import sqlite3
from datetime import datetime
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Import the database name from the aggregator script
DB_NAME = 'rss_articles.db'

app = FastAPI(title="Fast RSS API", description="A fast API for serving RSS articles")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_articles_from_db(limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
    """Retrieve articles from the database."""
    try:
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
                'source': {'id': row[0], 'name': row[0]},
                'title': row[1],
                'description': row[2],
                'url': row[3],
                'published_at': row[4],
                'content': row[5]
            })
        
        return articles
    except Exception as e:
        logger.error(f"Error retrieving articles from DB: {e}")
        return []

def get_total_article_count() -> int:
    """Get the total number of articles in the database."""
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        cursor.execute('SELECT COUNT(*) FROM articles')
        count = cursor.fetchone()[0]
        conn.close()
        
        return count
    except Exception as e:
        logger.error(f"Error getting article count from DB: {e}")
        return 0

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Fast RSS API Server", "status": "ok"}

@app.get("/api/news")
async def get_news(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Number of articles per page")
):
    """Get news articles with pagination."""
    try:
        # Calculate offset
        offset = (page - 1) * limit
        
        # Get articles from database
        articles = get_articles_from_db(limit=limit, offset=offset)
        total_results = get_total_article_count()
        
        return {
            "status": "ok",
            "totalResults": total_results,
            "articles": articles
        }
    except Exception as e:
        logger.error(f"Error fetching news: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/news/sources")
async def get_sources():
    """Get list of available sources."""
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        cursor.execute('SELECT DISTINCT source FROM articles')
        rows = cursor.fetchall()
        conn.close()
        
        sources = [row[0] for row in rows]
        return {"sources": sources}
    except Exception as e:
        logger.error(f"Error fetching sources: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/news/search")
async def search_news(
    query: str = Query(..., description="Search query"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Number of articles per page")
):
    """Search news articles."""
    try:
        # Calculate offset
        offset = (page - 1) * limit
        
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        # Search in title, description, and content
        search_term = f"%{query}%"
        cursor.execute('''
            SELECT source, title, description, url, published_at, content
            FROM articles
            WHERE title LIKE ? OR description LIKE ? OR content LIKE ?
            ORDER BY published_at DESC
            LIMIT ? OFFSET ?
        ''', (search_term, search_term, search_term, limit, offset))
        
        rows = cursor.fetchall()
        conn.close()
        
        articles = []
        for row in rows:
            articles.append({
                'source': {'id': row[0], 'name': row[0]},
                'title': row[1],
                'description': row[2],
                'url': row[3],
                'published_at': row[4],
                'content': row[5]
            })
        
        return {
            "status": "ok",
            "totalResults": len(articles),
            "articles": articles
        }
    except Exception as e:
        logger.error(f"Error searching news: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    logger.info("Starting Fast RSS API server")
    uvicorn.run(app, host="0.0.0.0", port=8000)