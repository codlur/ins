// Test script to verify Supabase database connection
import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test a simple query to the posts table
    const { data, error } = await supabase
      .from('posts')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Database query error:', error);
      return false;
    }

    console.log('Database connection successful!');
    console.log('Sample data:', data);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Run the test
testConnection().then(success => {
  if (success) {
    console.log('✅ Database connection test passed');
  } else {
    console.log('❌ Database connection test failed');
  }
  process.exit(success ? 0 : 1);
});