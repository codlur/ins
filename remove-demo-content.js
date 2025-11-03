// Script to remove demo posts, launches, and products from the database
import { createClient } from '@supabase/supabase-js';

// Load environment variables
import dotenv from 'dotenv';
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

// Keywords that identify demo content
const DEMO_KEYWORDS = [
  'demo', 'sample', 'test', 'example', 'placeholder',
  'lorem ipsum', 'dummy', 'fake', 'mock',
  'coming soon', 'launching soon', 'upcoming'
];

// Function to check if text contains demo keywords
function isDemoContent(text) {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  return DEMO_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// Function to remove demo posts
async function removeDemoPosts() {
  try {
    console.log('Searching for demo posts...');
    
    // First, let's see what we're working with
    const { data: allPosts, error: fetchError } = await supabase
      .from('posts')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching posts:', fetchError);
      return;
    }
    
    console.log(`Total posts in database: ${allPosts.length}`);
    
    // Identify demo posts
    const demoPosts = allPosts.filter(post => {
      return isDemoContent(post.title) || isDemoContent(post.content);
    });
    
    console.log(`Found ${demoPosts.length} demo posts to remove`);
    
    if (demoPosts.length === 0) {
      console.log('No demo posts found to remove');
      return;
    }
    
    // Display demo posts that will be removed
    console.log('\nDemo posts to be removed:');
    demoPosts.forEach(post => {
      console.log(`- ID: ${post.id}`);
      console.log(`  Title: ${post.title || 'No title'}`);
      console.log(`  Content preview: ${post.content.substring(0, 50)}...`);
      console.log(`  Created: ${post.createdAt}`);
      console.log('');
    });
    
    // Ask for confirmation
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('Do you want to proceed with deleting these demo posts? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        // Delete demo posts
        const postIds = demoPosts.map(post => post.id);
        const { error: deleteError } = await supabase
          .from('posts')
          .delete()
          .in('id', postIds);
        
        if (deleteError) {
          console.error('Error deleting demo posts:', deleteError);
        } else {
          console.log(`Successfully deleted ${postIds.length} demo posts`);
        }
      } else {
        console.log('Operation cancelled');
      }
      
      rl.close();
    });
    
  } catch (error) {
    console.error('Error removing demo posts:', error);
  }
}

// Function to remove demo bookmarks (launches and products)
async function removeDemoBookmarks() {
  try {
    console.log('Searching for demo bookmarks (launches and products)...');
    
    // Fetch all bookmarks
    const { data: allBookmarks, error: fetchError } = await supabase
      .from('bookmarks')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching bookmarks:', fetchError);
      return;
    }
    
    console.log(`Total bookmarks in database: ${allBookmarks.length}`);
    
    // Identify demo bookmarks
    const demoBookmarks = allBookmarks.filter(bookmark => {
      return (
        isDemoContent(bookmark.title) || 
        isDemoContent(bookmark.content) ||
        isDemoContent(bookmark.sourceName) ||
        ['launch', 'product'].includes(bookmark.type.toLowerCase()) && isDemoContent(bookmark.metadata?.name || '')
      );
    });
    
    console.log(`Found ${demoBookmarks.length} demo bookmarks to remove`);
    
    if (demoBookmarks.length === 0) {
      console.log('No demo bookmarks found to remove');
      return;
    }
    
    // Display demo bookmarks that will be removed
    console.log('\nDemo bookmarks to be removed:');
    demoBookmarks.forEach(bookmark => {
      console.log(`- ID: ${bookmark.id}`);
      console.log(`  Type: ${bookmark.type}`);
      console.log(`  Title: ${bookmark.title || 'No title'}`);
      console.log(`  Source: ${bookmark.sourceName || 'Unknown'}`);
      console.log(`  Bookmarked: ${bookmark.bookmarkedAt}`);
      console.log('');
    });
    
    // Ask for confirmation
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('Do you want to proceed with deleting these demo bookmarks? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        // Delete demo bookmarks
        const bookmarkIds = demoBookmarks.map(bookmark => bookmark.id);
        const { error: deleteError } = await supabase
          .from('bookmarks')
          .delete()
          .in('id', bookmarkIds);
        
        if (deleteError) {
          console.error('Error deleting demo bookmarks:', deleteError);
        } else {
          console.log(`Successfully deleted ${bookmarkIds.length} demo bookmarks`);
        }
      } else {
        console.log('Operation cancelled');
      }
      
      rl.close();
    });
    
  } catch (error) {
    console.error('Error removing demo bookmarks:', error);
  }
}

// Main function
async function main() {
  console.log('=== Demo Content Removal Tool ===\n');
  
  // Remove demo posts
  await removeDemoPosts();
  
  console.log('\n' + '='.repeat(40) + '\n');
  
  // Remove demo bookmarks
  await removeDemoBookmarks();
  
  console.log('\n=== Demo Content Removal Complete ===');
}

// Run the script
main();