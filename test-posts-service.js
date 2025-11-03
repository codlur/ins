// Test script to verify posts service functionality
import { getPosts, createPost, updatePost, deletePost } from './src/lib/posts-service';

async function testPostsService() {
  console.log('=== Posts Service Test ===');
  
  try {
    // Test fetching posts
    console.log('Testing getPosts...');
    const postsResult = await getPosts(1, 5);
    console.log('Get posts result:', postsResult.status);
    console.log('Total posts:', postsResult.total);
    console.log('Posts received:', postsResult.posts.length);
    
    console.log('\n=== Posts Service Test Completed ===');
  } catch (error) {
    console.error('Posts service test failed:', error);
  }
}

testPostsService();