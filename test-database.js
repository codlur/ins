// Simple test script to verify database connectivity
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './.env' });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL and Anon Key must be set in environment variables');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabase() {
  try {
    console.log('Testing database connectivity...');
    
    // Test fetching posts
    console.log('\n--- Testing Posts Table ---');
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .limit(1);
    
    if (postsError) {
      console.error('Error fetching posts:', postsError);
      console.log('Error details:', {
        code: postsError.code,
        message: postsError.message,
        details: postsError.details,
        hint: postsError.hint
      });
    } else {
      console.log('Successfully fetched posts:', posts?.length || 0);
      if (posts?.length > 0) {
        console.log('First post keys:', Object.keys(posts[0]));
      }
    }
    
    // Test fetching bookmarks
    console.log('\n--- Testing Bookmarks Table ---');
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('*')
      .limit(1);
    
    if (bookmarksError) {
      console.error('Error fetching bookmarks:', bookmarksError);
      console.log('Error details:', {
        code: bookmarksError.code,
        message: bookmarksError.message,
        details: bookmarksError.details,
        hint: bookmarksError.hint
      });
    } else {
      console.log('Successfully fetched bookmarks:', bookmarks?.length || 0);
      if (bookmarks?.length > 0) {
        console.log('First bookmark keys:', Object.keys(bookmarks[0]));
      }
    }
    
    // Test different column name variations
    console.log('\n--- Testing Column Names ---');
    
    // Try lowercase column names
    const { data: postsLower, error: postsLowerError } = await supabase
      .from('posts')
      .select('id, title, content, userid, username')
      .limit(1);
    
    if (postsLowerError) {
      console.error('Lowercase column test error:', postsLowerError);
    } else {
      console.log('Lowercase column test successful');
      if (postsLower?.length > 0) {
        console.log('Post with lowercase columns:', postsLower[0]);
      }
    }
    
    // Try quoted column names
    const { data: postsQuoted, error: postsQuotedError } = await supabase
      .from('posts')
      .select('id, title, content, "userId", "userName"')
      .limit(1);
    
    if (postsQuotedError) {
      console.error('Quoted column test error:', postsQuotedError);
    } else {
      console.log('Quoted column test successful');
      if (postsQuoted?.length > 0) {
        console.log('Post with quoted columns:', postsQuoted[0]);
      }
    }
    
    console.log('\nDatabase test completed.');
    
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

// Run the test
testDatabase();