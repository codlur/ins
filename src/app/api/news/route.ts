import { NextResponse } from 'next/server';
import { fetchRSSNews } from '@/lib/rss-service';

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    // Set a high limit to fetch more news articles per request
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Fetch only RSS news with pagination
    const rssNews = await fetchRSSNews(page, limit);
    
    // Sort by published date (newest first)
    rssNews.articles.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
    
    return NextResponse.json(rssNews);
  } catch (error) {
    console.error('Error in news API route:', error);
    return NextResponse.json(
      { status: 'error', totalResults: 0, articles: [] },
      { status: 500 }
    );
  }
}