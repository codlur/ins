"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import authService from "@/lib/auth-service";

// Define the User type
type User = {
  name: string;
  username: string;
  email: string;
  avatar?: string;
  banner?: string;
  isPremium?: boolean;
  isBusiness?: boolean;
  id?: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: "Developer",
    username: "@developer",
    email: "dev@example.com",
    avatar: undefined,
    banner: undefined,
    isPremium: true, // Default to true for developer access
    isBusiness: true, // Default to true for developer access
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check user session on initial load
  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    setIsLoading(true);
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          avatar: currentUser.avatar,
          banner: currentUser.banner,
          isPremium: currentUser.prefs?.isPremium ?? true,
          isBusiness: currentUser.prefs?.isBusiness ?? false,
        });
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          avatar: currentUser.avatar,
          banner: currentUser.banner,
          isPremium: currentUser.prefs?.isPremium ?? true,
          isBusiness: currentUser.prefs?.isBusiness ?? false,
        });
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      // Reset to default user
      setUser({
        name: "Developer",
        username: "@developer",
        email: "dev@example.com",
        avatar: undefined,
        banner: undefined,
        isPremium: true,
        isBusiness: true,
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, signOut, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}