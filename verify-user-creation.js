const { createClient } = require('@supabase/supabase-js');

// Supabase configuration from .env file
const supabaseUrl = 'https://ewymeoqxahogvbujhwsm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eW1lb3F4YWhvZ3ZidWpod3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODQyNDUsImV4cCI6MjA3Njc2MDI0NX0.XKziD5gpa5Wq6j6p_KGOZNJrATiwRPZGvFZG36ydaGk';

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyUserCreation() {
  console.log('Verifying user profile creation capabilities...');
  
  try {
    // Test 1: Check if we can connect to the database
    console.log('Test 1: Checking database connection...');
    const { data: connectionData, error: connectionError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (connectionError) {
      console.error('Connection test failed:', connectionError);
      return;
    }
    console.log('✓ Database connection successful');
    
    // Test 2: Check RLS policies by trying to insert a test profile
    console.log('Test 2: Checking RLS policies...');
    
    // Generate a random user ID for testing (in a real scenario, this would be an actual user ID)
    const testUserId = '00000000-0000-0000-0000-000000000000';
    const testProfile = {
      id: testUserId,
      name: 'Test User',
      username: 'testuser_' + Date.now(),
    };
    
    // Try to insert the profile
    const { data: insertData, error: insertError } = await supabase
      .from('profiles')
      .upsert(testProfile, {
        onConflict: 'id'
      })
      .select();
    
    if (insertError) {
      console.error('RLS policy test failed:', insertError);
      console.error('Error code:', insertError.code);
      console.error('Error message:', insertError.message);
    } else {
      console.log('✓ RLS policies working correctly');
      console.log('Inserted test profile:', insertData);
    }
    
    // Test 3: Clean up test data (if it was created)
    if (!insertError) {
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', testUserId);
      
      if (deleteError) {
        console.warn('Warning: Could not clean up test data:', deleteError);
      } else {
        console.log('✓ Test data cleaned up successfully');
      }
    }
    
    console.log('Verification complete.');
  } catch (error) {
    console.error('Unexpected error during verification:', error);
  }
}

verifyUserCreation();