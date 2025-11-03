// Utility to check environment variables and test Supabase connection
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('=== Environment Variables Check ===');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
console.log('NEXT_PUBLIC_POSTS_TABLE:', process.env.NEXT_PUBLIC_POSTS_TABLE || 'DEFAULT (posts)');

// Validate URL format
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase URL is valid:', url.hostname);
  } catch (error) {
    console.error('Invalid Supabase URL:', error.message);
  }
}

console.log('\n=== Network Connectivity Check ===');
console.log('To test network connectivity to Supabase:');
console.log('1. Open a terminal/command prompt');
console.log('2. Run: ping ewymeoqxahogvbujhwsm.supabase.co');
console.log('3. Or try: curl -I https://ewymeoqxahogvbujhwsm.supabase.co');

console.log('\n=== Manual Verification Steps ===');
console.log('1. Check if the Supabase project exists and is active');
console.log('2. Verify the Supabase URL and anon key are correct');
console.log('3. Check if there are any IP restrictions on the Supabase project');
console.log('4. Ensure the database tables exist with correct schema');
console.log('5. Verify Row Level Security policies are properly configured');