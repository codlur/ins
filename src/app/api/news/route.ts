import { NextResponse } from 'next/server';
import { fetchRSSNews } from '@/lib/rss-service';

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    // Increase limit to ensure we get all 7 days of news
    const limit = parseInt(searchParams.get('limit') || '100');
    
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