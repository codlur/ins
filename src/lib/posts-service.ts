import { supabase } from './supabase';

// Get the database and table names from environment variables
const POSTS_TABLE = process.env.NEXT_PUBLIC_POSTS_TABLE || 'posts';

export interface Post {
  id?: string;
  title?: string;
  content: string;
  userId: string;
  userName: string;
  isThread?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getPosts(page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabase
      .from(POSTS_TABLE)
      .select('*', { count: 'exact' })
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return {
      status: 'success',
      total: count || 0,
      posts: data || []
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      status: 'error',
      message: 'Failed to fetch posts',
      posts: [],
      total: 0
    };
  }
}

export async function createPost(post: Post) {
  try {
    // Validate required fields
    if (!post.content || !post.userId || !post.userName) {
      throw new Error('Content, userId, and userName are required');
    }

    const newPost = {
      title: post.title || '',
      content: post.content,
      userId: post.userId,
      userName: post.userName,
      isThread: post.isThread || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .insert(newPost)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      status: 'success',
      message: 'Post created successfully',
      post: data
    };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return {
      status: 'error',
      message: error.message || 'Failed to create post'
    };
  }
}

export async function updatePost(id: string, updates: Partial<Post>) {
  try {
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      status: 'success',
      message: 'Post updated successfully',
      post: data
    };
  } catch (error: any) {
    console.error('Error updating post:', error);
    return {
      status: 'error',
      message: error.message || 'Failed to update post'
    };
  }
}

export async function deletePost(id: string) {
  try {
    const { error } = await supabase
      .from(POSTS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      status: 'success',
      message: 'Post deleted successfully'
    };
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return {
      status: 'error',
      message: error.message || 'Failed to delete post'
    };
  }
}