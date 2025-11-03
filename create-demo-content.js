// Script to create demo content for testing
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

// Demo posts data (using lowercase column names and valid UUIDs)
const demoPosts = [
  {
    title: "Demo Product Launch Announcement",
    content: "We're excited to announce the launch of our new demo product! This is just a sample post to showcase our platform capabilities.",
    userid: "00000000-0000-0000-0000-000000000001",
    username: "Demo User",
    isthread: false
  },
  {
    title: "Sample AI Launch Coming Soon",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a placeholder post for an upcoming AI product launch.",
    userid: "00000000-0000-0000-0000-000000000002",
    username: "Test Account",
    isthread: false
  },
  {
    title: "Example Post",
    content: "This is an example post with no real content. It's just here for testing purposes.",
    userid: "00000000-0000-0000-0000-000000000003",
    username: "Demo Tester",
    isthread: true
  },
  {
    title: "",
    content: "This post has no title, just content. It's a demo post for testing edge cases.",
    userid: "00000000-0000-0000-0000-000000000001",
    username: "Demo User",
    isthread: false
  }
];

// Demo bookmarks data (using lowercase column names and valid UUIDs)
const demoBookmarks = [
  {
    userid: "00000000-0000-0000-0000-000000000001",
    type: "product",
    title: "Demo Product Announcement",
    content: "Introducing our new demo product that showcases the latest in AI technology.",
    author: "Demo Team",
    sourcename: "Demo Source",
    sourceurl: "https://example.com/demo-product",
    publishedat: new Date().toISOString(),
    metadata: {
      name: "Demo Product",
      description: "A sample product for demonstration purposes"
    }
  },
  {
    title: "Upcoming Launch Preview",
    content: "Sneak peek at our upcoming product launch. Coming soon!",
    userid: "00000000-0000-0000-0000-000000000002",
    type: "launch",
    author: "Test Author",
    sourcename: "Test Source",
    sourceurl: "https://example.com/upcoming-launch",
    publishedat: new Date().toISOString(),
    metadata: {}
  },
  {
    title: "Sample News Article",
    content: "This is a sample news article for testing bookmark functionality.",
    userid: "00000000-0000-0000-0000-000000000001",
    type: "news",
    author: "Demo Writer",
    sourcename: "Demo News",
    sourceurl: "https://example.com/sample-news",
    publishedat: new Date().toISOString(),
    metadata: {}
  }
];

// Function to create demo posts
async function createDemoPosts() {
  try {
    console.log('Creating demo posts...');
    
    // Insert demo posts one by one to avoid schema issues
    let createdCount = 0;
    for (const post of demoPosts) {
      const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select();
      
      if (error) {
        console.error('Error creating demo post:', error);
      } else {
        createdCount++;
      }
    }
    
    console.log(`Successfully created ${createdCount} demo posts`);
    return { created: createdCount };
    
  } catch (error) {
    console.error('Error creating demo posts:', error);
    return { created: 0, error: error.message };
  }
}

// Function to create demo bookmarks
async function createDemoBookmarks() {
  try {
    console.log('Creating demo bookmarks...');
    
    // Insert demo bookmarks one by one to avoid schema issues
    let createdCount = 0;
    for (const bookmark of demoBookmarks) {
      const { data, error } = await supabase
        .from('bookmarks')
        .insert([bookmark])
        .select();
      
      if (error) {
        console.error('Error creating demo bookmark:', error);
      } else {
        createdCount++;
      }
    }
    
    console.log(`Successfully created ${createdCount} demo bookmarks`);
    return { created: createdCount };
    
  } catch (error) {
    console.error('Error creating demo bookmarks:', error);
    return { created: 0, error: error.message };
  }
}

// Main function
async function main() {
  console.log('=== Demo Content Creation Tool ===\n');
  
  // Create demo posts
  const postsResult = await createDemoPosts();
  
  console.log('\n' + '='.repeat(40) + '\n');
  
  // Create demo bookmarks
  const bookmarksResult = await createDemoBookmarks();
  
  console.log('\n=== Demo Content Creation Complete ===');
  console.log(`Created ${postsResult.created} demo posts and ${bookmarksResult.created} demo bookmarks`);
  
  if (postsResult.error || bookmarksResult.error) {
    console.log('\nErrors occurred during creation:');
    if (postsResult.error) console.log(`- Posts: ${postsResult.error}`);
    if (bookmarksResult.error) console.log(`- Bookmarks: ${bookmarksResult.error}`);
  }
}

// Run the script
main();