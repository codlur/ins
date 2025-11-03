"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CenteredAuthLayout } from "@/components/auth/centered-auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService, { AuthResponse } from "@/lib/auth-service";
import { useUser } from "@/contexts/user-context";

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // First, sign up with email and password
      const response: AuthResponse = await authService.signUp(email, password, name);
      
      if (response.success && response.user) {
        // Set the user in context with basic info
        setUser({
          ...response.user,
          email: email,
        });
        
        // Redirect to profile creation page
        router.push("/signup/profile");
      } else {
        // Provide more specific error messages
        if (response.error?.includes('Network error')) {
          setError("Connection error: Please check your internet connection and try again.");
        } else {
          setError(response.error || "Failed to create account. Please try again.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CenteredAuthLayout
        title="Create an account"
        description="Enter your name, email and password to get started"
        footerLinks={[
          {
            href: "/signin",
            text: "Already have an account?",
            linkText: "Sign in"
          }
        ]}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>
          
          <Button type="submit" className="w-full rounded-lg" disabled={loading}>
            {loading ? "Creating account..." : "Continue"}
          </Button>
        </form>
      </CenteredAuthLayout>
    </div>
  );
}