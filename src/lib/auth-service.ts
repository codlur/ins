import { supabase } from './supabase';

interface User {
  name: string;
  username: string;
  email: string;
  avatar?: string;
  banner?: string;
  isPremium?: boolean;
  isBusiness?: boolean;
  id: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

class AuthService {
  // Sign up with real authentication
  async signUp(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            // Don't set username here as we want the user to set it during profile creation
          }
        }
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to create account'
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Failed to create account'
        };
      }

      // For Supabase, signUp doesn't automatically sign in the user
      // We need to sign in the user after sign up
      const signInResponse = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInResponse.error) {
        return {
          success: false,
          error: signInResponse.error.message || 'Failed to sign in after account creation'
        };
      }

      if (!signInResponse.data.user) {
        return {
          success: false,
          error: 'Failed to sign in after account creation'
        };
      }

      // Create initial profile entry to ensure RLS policies work correctly
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: signInResponse.data.user.id,
            name: name,
            username: '', // Will be set during profile creation
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't fail signup if profile creation fails, as it might be created by the trigger
        }
      } catch (profileErr) {
        console.error('Error creating initial profile:', profileErr);
        // Continue even if profile creation fails
      }

      // Don't create a default username here - let the user set it during profile creation
      
      return {
        success: true,
        user: {
          id: signInResponse.data.user.id,
          name: name,
          username: '', // Will be set during profile creation
          email: signInResponse.data.user.email || '',
          isPremium: true,
          isBusiness: false,
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create account'
      };
    }
  }

  // Sign in with real authentication
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to sign in'
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Failed to sign in'
        };
      }

      // Get user profile from profiles table
      const profileResponse = await this.getUserProfile(data.user.id);
      let username = '';
      let avatar = undefined;
      let banner = undefined;
      
      if (profileResponse.success && profileResponse.user) {
        username = profileResponse.user.username;
        avatar = profileResponse.user.avatar;
        banner = profileResponse.user.banner;
      }

      return {
        success: true,
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || '',
          username: username,
          email: data.user.email || '',
          avatar: avatar,
          banner: banner,
          isPremium: true,
          isBusiness: true,
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to sign in'
      };
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<any | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session?.user) {
        return null;
      }

      const user = session.user;
      
      // Get user profile from profiles table
      const profileResponse = await this.getUserProfile(user.id);
      let username = '';
      let avatar = undefined;
      let banner = undefined;
      
      if (profileResponse.success && profileResponse.user) {
        username = profileResponse.user.username;
        avatar = profileResponse.user.avatar;
        banner = profileResponse.user.banner;
      }
      
      return {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        username: username,
        email: user.email || '',
        avatar: avatar,
        banner: banner,
        prefs: {
          isPremium: true,
          isBusiness: true,
        }
      };
    } catch (error) {
      return null;
    }
  }

  // Get user profile from profiles table
  async getUserProfile(userId: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, username, avatar, banner')
        .eq('id', userId)
        .single();

      if (error) {
        // If profile doesn't exist, it might be a new user
        if (error.code === 'PGRST116') {
          return {
            success: true,
            user: {
              id: userId,
              name: '',
              username: '',
              email: '',
              avatar: undefined,
              banner: undefined,
              isPremium: true,
              isBusiness: false,
            }
          };
        }
        
        return {
          success: false,
          error: error.message || 'Failed to fetch user profile'
        };
      }

      if (!data) {
        return {
          success: false,
          error: 'User profile not found'
        };
      }

      return {
        success: true,
        user: {
          id: userId,
          name: data.name,
          username: data.username || '',
          email: '', // Email is not stored in profiles table
          avatar: data.avatar || undefined,
          banner: data.banner || undefined,
          isPremium: true,
          isBusiness: false,
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch user profile'
      };
    }
  }

  // Send password reset
  async sendPasswordReset(email: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) {
        console.error('Error sending password reset:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error sending password reset:', error);
      return false;
    }
  }

  // Reset password
  async resetPassword(password: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        console.error('Error resetting password:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  }
  
  // Update profile
  async updateProfile(name: string, username: string, email: string, avatar?: string, banner?: string): Promise<AuthResponse> {
    try {
      // Get current user ID
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        return {
          success: false,
          error: `Session error: ${sessionError.message || 'Failed to get session'}`
        };
      }
      
      const userId = session?.user?.id;
      
      if (!userId) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }

      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          name: name
        }
      });

      if (metadataError) {
        console.error('Error updating user metadata:', metadataError);
        // Continue with profile update even if metadata update fails
      }

      // Update or insert profile in profiles table
      const profileData: any = {
        id: userId,
        name: name,
        username: username
      };
      
      // Only include avatar and banner if they are provided
      if (avatar !== undefined) {
        profileData.avatar = avatar;
      }
      
      if (banner !== undefined) {
        profileData.banner = banner;
      }

      // Try to update the profile with proper error handling
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, {
          onConflict: 'id'
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        // Check if it's an RLS error and provide a more specific message
        if (error.code === '42501') { // RLS error code
          return {
            success: false,
            error: 'Permission denied: Unable to update profile. Please contact support.'
          };
        }
        return {
          success: false,
          error: `Database error: ${error.message || 'Failed to update profile'}`
        };
      }

      if (!data || data.length === 0) {
        return {
          success: false,
          error: 'Failed to update profile - no data returned'
        };
      }
      
      return {
        success: true,
        user: {
          id: userId,
          name: name,
          username: username,
          email: email,
          avatar: avatar || undefined,
          banner: banner || undefined,
          isPremium: true,
          isBusiness: true,
        }
      };
    } catch (error: any) {
      console.error('Unexpected error in updateProfile:', error);
      // Check if it's a network error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return {
          success: false,
          error: 'Network error: Unable to connect to the database. Please check your internet connection.'
        };
      }
      
      return {
        success: false,
        error: `Unexpected error: ${error.message || 'Failed to update profile'}`
      };
    }
  }
  
  // Validate session
  async validateSession(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService();