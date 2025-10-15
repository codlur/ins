"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  name: string;
  username: string;
  email: string;
  avatar?: string;
  isPremium?: boolean;
  isBusiness?: boolean;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: "Developer",
    username: "@developer",
    email: "dev@example.com",
    avatar: undefined,
    isPremium: true, // Default to true for developer access
    isBusiness: true, // Default to true for developer access
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
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