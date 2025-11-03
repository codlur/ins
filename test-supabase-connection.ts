// Test script to verify Supabase connection
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test a simple query to the profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Database query error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
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