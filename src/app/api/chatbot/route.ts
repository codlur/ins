import { NextResponse } from 'next/server';
import { fetchRSSNews } from '@/lib/rss-service';

// Mock data for products, launches, and posts
// In a real implementation, this would come from your database
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "AI Research Assistant",
    description: "Advanced AI-powered research tool",
    status: "Active"
  },
  {
    id: "2",
    name: "Machine Learning Platform",
    description: "End-to-end ML development suite",
    status: "Active"
  },
  {
    id: "3",
    name: "Natural Language Processor",
    description: "State-of-the-art NLP engine",
    status: "Beta"
  },
  {
    id: "4",
    name: "Computer Vision Suite",
    description: "Image recognition and analysis toolkit",
    status: "Active"
  }
];

const MOCK_LAUNCHES = [
  {
    id: "1",
    name: "AI Research Assistant v2.0",
    description: "Advanced AI-powered research tool with enhanced capabilities",
    date: "2025-10-15",
    status: "Active"
  },
  {
    id: "2",
    name: "Neural Network Designer Beta",
    description: "Visual deep learning model builder for rapid prototyping",
    date: "2025-11-01",
    status: "Beta"
  },
  {
    id: "3",
    name: "Computer Vision Suite Pro",
    description: "Enterprise-grade image recognition and analysis toolkit",
    date: "2025-12-10",
    status: "Upcoming"
  }
];

const MOCK_POSTS = [
  {
    id: "1",
    title: "The Future of AI in Healthcare",
    content: "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment with new breakthrough technologies.",
    author: "Dr. Jane Smith",
    publishedAt: "2025-10-10T08:30:00Z"
  },
  {
    id: "2",
    title: "Machine Learning Breakthroughs in 2025",
    content: "A comprehensive overview of the latest advancements in machine learning research and their practical applications.",
    author: "Prof. John Doe",
    publishedAt: "2025-10-05T14:15:00Z"
  },
  {
    id: "3",
    title: "Ethical Considerations in AI Development",
    content: "Examining the moral implications of developing increasingly powerful AI systems and establishing responsible frameworks.",
    author: "Alex Johnson",
    publishedAt: "2025-09-28T11:45:00Z"
  }
];

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const type = searchParams.get('type') || 'all'; // all, news, products, launches, posts
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let results: any = {
      status: 'success',
      query,
      type,
      page,
      limit,
      totalResults: 0,
      results: []
    };

    // Search news if requested
    if (type === 'all' || type === 'news') {
      try {
        const news = await fetchRSSNews(page, limit * 2); // Fetch more to filter
        if (news.status === 'ok' && news.articles) {
          // Filter articles based on query if provided
          let filteredArticles = news.articles;
          if (query) {
            filteredArticles = news.articles.filter(article => 
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
            );
          }
          
          // Apply pagination
          const startIdx = (page - 1) * limit;
          const endIdx = startIdx + limit;
          const paginatedArticles = filteredArticles.slice(startIdx, endIdx);
          
          results.results.push(...paginatedArticles.map(article => ({
            type: 'news',
            ...article
          })));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    // Search products if requested
    if (type === 'all' || type === 'products') {
      let filteredProducts = MOCK_PRODUCTS;
      if (query) {
        filteredProducts = MOCK_PRODUCTS.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Apply pagination
      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const paginatedProducts = filteredProducts.slice(startIdx, endIdx);
      
      results.results.push(...paginatedProducts.map(product => ({
        type: 'product',
        ...product
      })));
    }

    // Search launches if requested
    if (type === 'all' || type === 'launches') {
      let filteredLaunches = MOCK_LAUNCHES;
      if (query) {
        filteredLaunches = MOCK_LAUNCHES.filter(launch => 
          launch.name.toLowerCase().includes(query.toLowerCase()) ||
          launch.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Apply pagination
      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const paginatedLaunches = filteredLaunches.slice(startIdx, endIdx);
      
      results.results.push(...paginatedLaunches.map(launch => ({
        type: 'launch',
        ...launch
      })));
    }

    // Search posts if requested
    if (type === 'all' || type === 'posts') {
      let filteredPosts = MOCK_POSTS;
      if (query) {
        filteredPosts = MOCK_POSTS.filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.author.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Apply pagination
      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const paginatedPosts = filteredPosts.slice(startIdx, endIdx);
      
      results.results.push(...paginatedPosts.map(post => ({
        type: 'post',
        ...post
      })));
    }

    // Sort results by date (newest first)
    results.results.sort((a: any, b: any) => {
      const dateA = a.publishedAt || a.date || new Date().toISOString();
      const dateB = b.publishedAt || b.date || new Date().toISOString();
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    results.totalResults = results.results.length;

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in chatbot API route:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}