import { NextResponse } from 'next/server';
import { fetchRSSNews } from '@/lib/rss-service';

// In a real implementation, this would come from your database
const MOCK_PRODUCTS: any[] = [];
const MOCK_LAUNCHES: any[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    // Fetch news data
    const newsResponse = await fetchRSSNews(page, limit);
    
    // Filter based on query if provided
    let filteredNews = newsResponse.articles;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredNews = newsResponse.articles.filter(article => 
        article.title.toLowerCase().includes(lowerQuery) || 
        article.description?.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter based on type
    let results: any[] = [];
    let totalResults = 0;
    
    switch (type) {
      case 'news':
        results = filteredNews;
        totalResults = filteredNews.length;
        break;
      case 'products':
        results = MOCK_PRODUCTS;
        totalResults = MOCK_PRODUCTS.length;
        break;
      case 'launches':
        results = MOCK_LAUNCHES;
        totalResults = MOCK_LAUNCHES.length;
        break;
      default:
        // Combine all types for 'all'
        results = [
          ...filteredNews.map(article => ({ ...article, type: 'news' })),
          ...MOCK_PRODUCTS.map(product => ({ ...product, type: 'product' })),
          ...MOCK_LAUNCHES.map(launch => ({ ...launch, type: 'launch' }))
        ];
        totalResults = results.length;
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);
    
    return NextResponse.json({
      status: 'success',
      query,
      type,
      page,
      limit,
      totalResults,
      results: paginatedResults
    });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch data',
        query,
        type,
        page,
        limit,
        totalResults: 0,
        results: []
      },
      { status: 500 }
    );
  }
}
