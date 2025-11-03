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

      // Don't create a default username here - let the user set it during profile creation
      
      return {
        success: true,
        user: {
          id: data.user.id,
          name: name,
          username: '', // Will be set during profile creation
          email: data.user.email || '',
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

      // Get username from user metadata
      const username = data.user.user_metadata?.username || '';
      
      return {
        success: true,
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || '',
          username: username,
          email: data.user.email || '',
          avatar: data.user.user_metadata?.avatar || undefined,
          banner: data.user.user_metadata?.banner || undefined,
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
      
      // Get username from user metadata
      const username = user.user_metadata?.username || '';
      
      return {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        username: username,
        email: user.email || '',
        avatar: user.user_metadata?.avatar || undefined,
        banner: user.user_metadata?.banner || undefined,
        prefs: {
          isPremium: true,
          isBusiness: true,
        }
      };
    } catch (error) {
      return null;
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
      // Prepare user metadata update
      const userData: any = {
        name: name,
        username: username
      };
      
      // Only include avatar and banner if they are provided
      if (avatar !== undefined) {
        userData.avatar = avatar;
      }
      
      if (banner !== undefined) {
        userData.banner = banner;
      }

      const { data, error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to update profile'
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Failed to update profile'
        };
      }
      
      return {
        success: true,
        user: {
          id: data.user.id,
          name: name,
          username: username,
          email: data.user.email || '',
          avatar: avatar || data.user.user_metadata?.avatar || undefined,
          banner: banner || data.user.user_metadata?.banner || undefined,
          isPremium: true,
          isBusiness: true,
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update profile'
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