// Script to clean demo content from the database
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

// Extended list of demo keywords
const DEMO_KEYWORDS = [
  'demo', 'sample', 'test', 'example', 'placeholder',
  'lorem ipsum', 'dummy', 'fake', 'mock',
  'coming soon', 'launching soon', 'upcoming',
  'product announcement', 'new launch', 'beta version',
  'preview', 'sneak peek', 'early access'
];

// Function to check if text contains demo keywords
function isDemoContent(text) {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  return DEMO_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// Function to check if content matches common demo patterns
function matchesDemoPattern(text) {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  
  // Common demo content patterns
  const patterns = [
    /lorem ipsum dolor sit amet/i,
    /this is a (demo|sample|test)/i,
    /(demo|sample|test) (post|product|launch)/i,
    /(product|launch) (demo|sample|test)/i,
    /coming soon.*launch/i,
    /new.*product.*announcement/i,
    /introducing.*demo/i
  ];
  
  return patterns.some(pattern => pattern.test(lowerText));
}

// Function to remove demo posts
async function removeDemoPosts() {
  try {
    console.log('Searching for demo posts...');
    
    // Fetch all posts
    const { data: allPosts, error: fetchError } = await supabase
      .from('posts')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching posts:', fetchError);
      return { removed: 0, error: fetchError.message };
    }
    
    console.log(`Total posts in database: ${allPosts.length}`);
    
    // Identify demo posts using multiple criteria
    const demoPosts = allPosts.filter(post => {
      return (
        isDemoContent(post.title) || 
        isDemoContent(post.content) ||
        matchesDemoPattern(post.title) ||
        matchesDemoPattern(post.content) ||
        // Posts with no meaningful content
        (!post.title && (!post.content || post.content.length < 20)) ||
        // Posts with generic demo usernames
        (post.userName && (post.userName.toLowerCase().includes('demo') ||
                          post.userName.toLowerCase().includes('test')))
      );
    });
    
    console.log(`Found ${demoPosts.length} demo posts to remove`);
    
    if (demoPosts.length === 0) {
      console.log('No demo posts found to remove');
      return { removed: 0 };
    }
    
    // Display demo posts that will be removed
    console.log('\nDemo posts to be removed:');
    demoPosts.forEach(post => {
      console.log(`- ID: ${post.id}`);
      console.log(`  Title: ${post.title || 'No title'}`);
      console.log(`  Content preview: ${post.content ? post.content.substring(0, 50) + '...' : 'No content'}`);
      console.log(`  User: ${post.userName || 'Unknown'}`);
      console.log(`  Created: ${post.createdAt || 'Unknown'}`);
      console.log('');
    });
    
    // Delete demo posts one by one to avoid schema issues
    let deletedCount = 0;
    for (const post of demoPosts) {
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);
      
      if (deleteError) {
        console.error(`Error deleting post ${post.id}:`, deleteError);
      } else {
        deletedCount++;
      }
    }
    
    console.log(`Successfully deleted ${deletedCount} demo posts`);
    return { removed: deletedCount };
    
  } catch (error) {
    console.error('Error removing demo posts:', error);
    return { removed: 0, error: error.message };
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
      return { removed: 0, error: fetchError.message };
    }
    
    console.log(`Total bookmarks in database: ${allBookmarks.length}`);
    
    // Identify demo bookmarks
    const demoBookmarks = allBookmarks.filter(bookmark => {
      return (
        isDemoContent(bookmark.title) || 
        isDemoContent(bookmark.content) ||
        isDemoContent(bookmark.sourceName) ||
        matchesDemoPattern(bookmark.title) ||
        matchesDemoPattern(bookmark.content) ||
        matchesDemoPattern(bookmark.sourceName) ||
        // Check metadata for demo content
        isDemoContent(bookmark.metadata?.name || '') ||
        isDemoContent(bookmark.metadata?.description || '') ||
        // Bookmarks with demo types
        ['launch', 'product'].includes(bookmark.type?.toLowerCase()) && 
        (isDemoContent(bookmark.title) || isDemoContent(bookmark.content))
      );
    });
    
    console.log(`Found ${demoBookmarks.length} demo bookmarks to remove`);
    
    if (demoBookmarks.length === 0) {
      console.log('No demo bookmarks found to remove');
      return { removed: 0 };
    }
    
    // Display demo bookmarks that will be removed
    console.log('\nDemo bookmarks to be removed:');
    demoBookmarks.forEach(bookmark => {
      console.log(`- ID: ${bookmark.id}`);
      console.log(`  Type: ${bookmark.type || 'Unknown'}`);
      console.log(`  Title: ${bookmark.title || 'No title'}`);
      console.log(`  Source: ${bookmark.sourceName || 'Unknown'}`);
      console.log(`  Bookmarked: ${bookmark.bookmarkedAt || 'Unknown'}`);
      console.log('');
    });
    
    // Delete demo bookmarks one by one to avoid schema issues
    let deletedCount = 0;
    for (const bookmark of demoBookmarks) {
      const { error: deleteError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmark.id);
      
      if (deleteError) {
        console.error(`Error deleting bookmark ${bookmark.id}:`, deleteError);
      } else {
        deletedCount++;
      }
    }
    
    console.log(`Successfully deleted ${deletedCount} demo bookmarks`);
    return { removed: deletedCount };
    
  } catch (error) {
    console.error('Error removing demo bookmarks:', error);
    return { removed: 0, error: error.message };
  }
}

// Function to get database statistics
async function getDatabaseStats() {
  try {
    // Get posts count
    const { count: postsCount, error: postsError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });
    
    if (postsError) {
      console.error('Error counting posts:', postsError);
      return null;
    }
    
    // Get bookmarks count
    const { count: bookmarksCount, error: bookmarksError } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true });
    
    if (bookmarksError) {
      console.error('Error counting bookmarks:', bookmarksError);
      return null;
    }
    
    return {
      posts: postsCount,
      bookmarks: bookmarksCount
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    return null;
  }
}

// Main function
async function main() {
  console.log('=== Database Cleanup Tool ===\n');
  
  // Show initial stats
  const initialStats = await getDatabaseStats();
  if (initialStats) {
    console.log(`Initial database stats:`);
    console.log(`- Posts: ${initialStats.posts}`);
    console.log(`- Bookmarks: ${initialStats.bookmarks}\n`);
  }
  
  // Remove demo posts
  const postsResult = await removeDemoPosts();
  
  console.log('\n' + '='.repeat(40) + '\n');
  
  // Remove demo bookmarks
  const bookmarksResult = await removeDemoBookmarks();
  
  // Show final stats
  const finalStats = await getDatabaseStats();
  if (finalStats) {
    console.log('\nFinal database stats:');
    console.log(`- Posts: ${finalStats.posts}`);
    console.log(`- Bookmarks: ${finalStats.bookmarks}`);
  }
  
  console.log('\n=== Database Cleanup Complete ===');
  console.log(`Removed ${postsResult.removed} demo posts and ${bookmarksResult.removed} demo bookmarks`);
  
  if (postsResult.error || bookmarksResult.error) {
    console.log('\nErrors occurred during cleanup:');
    if (postsResult.error) console.log(`- Posts: ${postsResult.error}`);
    if (bookmarksResult.error) console.log(`- Bookmarks: ${bookmarksResult.error}`);
  }
}

// Run the script
main();