import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/posts-service';

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Fetch posts from Supabase database
    const response = await getPosts(page, limit);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch posts',
        posts: [] 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, userId, userName, isThread } = await request.json();
    
    // Validate required fields
    if (!content || !userId || !userName) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Content, userId, and userName are required' 
        },
        { status: 400 }
      );
    }
    
    // Create a new post in Supabase database
    const response = await createPost({
      title,
      content,
      userId,
      userName,
      isThread
    });
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to create post'
      },
      { status: 500 }
    );
  }
}