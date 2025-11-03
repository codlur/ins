// Test script to verify Supabase authentication and database operations
import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuthentication() {
  try {
    console.log('Testing authentication status...');
    
    // Check if there's an active session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Authentication error:', error);
      return false;
    }

    if (session) {
      console.log('User is authenticated');
      console.log('User ID:', session.user?.id);
      return true;
    } else {
      console.log('No active session - user is not authenticated');
      return true; // This is not an error, just no session
    }
  } catch (error) {
    console.error('Authentication test failed:', error);
    return false;
  }
}

async function testDatabaseQuery() {
  try {
    console.log('Testing database query...');
    
    // Test a simple query to check if we can access the database
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .limit(1);

    if (error) {
      console.error('Database query error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      return false;
    }

    console.log('Database query successful!');
    console.log('Retrieved', count, 'records');
    return true;
  } catch (error) {
    console.error('Database query failed:', error);
    return false;
  }
}

async function testTableAccess() {
  try {
    console.log('Testing access to different tables...');
    
    // Test posts table
    const postsResult = await supabase.from('posts').select('count').single();
    console.log('Posts table access:', postsResult.error ? 'Failed' : 'Success');
    
    // Test profiles table
    const profilesResult = await supabase.from('profiles').select('count').single();
    console.log('Profiles table access:', profilesResult.error ? 'Failed' : 'Success');
    
    // Test bookmarks table
    const bookmarksResult = await supabase.from('bookmarks').select('count').single();
    console.log('Bookmarks table access:', bookmarksResult.error ? 'Failed' : 'Success');
    
    return !(postsResult.error && profilesResult.error && bookmarksResult.error);
  } catch (error) {
    console.error('Table access test failed:', error);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('=== Supabase Connection Diagnostics ===');
  
  const authSuccess = await testAuthentication();
  console.log('');
  
  const dbSuccess = await testDatabaseQuery();
  console.log('');
  
  const tableSuccess = await testTableAccess();
  console.log('');
  
  const overallSuccess = authSuccess && dbSuccess && tableSuccess;
  
  console.log('=== Test Summary ===');
  console.log('Authentication:', authSuccess ? '✅ Pass' : '❌ Fail');
  console.log('Database Query:', dbSuccess ? '✅ Pass' : '❌ Fail');
  console.log('Table Access:', tableSuccess ? '✅ Pass' : '❌ Fail');
  console.log('Overall:', overallSuccess ? '✅ All tests passed' : '❌ Some tests failed');
  
  process.exit(overallSuccess ? 0 : 1);
}

// Run the tests
runAllTests();