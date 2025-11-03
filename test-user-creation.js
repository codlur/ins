const { createClient } = require('@supabase/supabase-js');

// Supabase configuration from .env file
const supabaseUrl = 'https://ewymeoqxahogvbujhwsm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eW1lb3F4YWhvZ3ZidWpod3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODQyNDUsImV4cCI6MjA3Njc2MDI0NX0.XKziD5gpa5Wq6j6p_KGOZNJrATiwRPZGvFZG36ydaGk';

// Create a single supabase client for interacting with the database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUserCreation() {
  console.log('Testing user profile creation...');
  
  // Test user data
  const testUserId = '97f19d9c-219b-4887-922c-1f81cb1c8434'; // Use an existing user ID from previous test
  const testProfile = {
    id: testUserId,
    name: 'Test User',
    username: 'testuser123',
    avatar: 'https://example.com/avatar.jpg',
    banner: 'https://example.com/banner.jpg'
  };
  
  try {
    // Test inserting a profile
    console.log('Inserting test profile...');
    const { data, error } = await supabase
      .from('profiles')
      .upsert(testProfile, {
        onConflict: 'id'
      })
      .select();
    
    if (error) {
      console.error('Profile insertion error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
    } else {
      console.log('Profile insertion successful');
      console.log('Inserted data:', data);
    }
    
    // Test retrieving the profile
    console.log('Retrieving test profile...');
    const { data: retrievedData, error: retrieveError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', testUserId)
      .single();
    
    if (retrieveError) {
      console.error('Profile retrieval error:', retrieveError);
    } else {
      console.log('Profile retrieval successful');
      console.log('Retrieved data:', retrievedData);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testUserCreation();