// Script to refresh Supabase schema cache
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

async function refreshSchema() {
  try {
    console.log('Refreshing Supabase schema cache...');
    
    // Try to fetch table information to trigger schema refresh
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('id')
      .limit(1);
    
    if (postsError) {
      console.log('Posts table check error (this may be expected during refresh):', postsError.message);
    } else {
      console.log('Posts table accessible');
    }
    
    const { data: bookmarksData, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('id')
      .limit(1);
    
    if (bookmarksError) {
      console.log('Bookmarks table check error (this may be expected during refresh):', bookmarksError.message);
    } else {
      console.log('Bookmarks table accessible');
    }
    
    console.log('\nSchema refresh attempt completed.');
    console.log('If you continue to have issues, try restarting your Supabase project or contacting Supabase support.');
    
  } catch (error) {
    console.error('Error during schema refresh:', error);
  }
}

// Run the script
refreshSchema();