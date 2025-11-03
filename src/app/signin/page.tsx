"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredAuthLayout } from "@/components/auth/centered-auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService, { AuthResponse } from "@/lib/auth-service";
import { useUser } from "@/contexts/user-context";

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response: AuthResponse = await authService.signIn(email, password);
      
      if (response.success && response.user) {
        // Set the user in context
        setUser(response.user);
        
        // Check if user has completed profile (has a username)
        if (!response.user.username || response.user.username === `@${response.user.email?.split('@')[0]}`) {
          // Redirect to profile creation page if profile is incomplete
          router.push("/signup/profile");
        } else {
          // Redirect to home page if profile is complete
          router.push("/app/home");
        }
      } else {
        setError(response.error || "Failed to sign in");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CenteredAuthLayout
        title="Welcome back"
        description="Sign in to your account to continue"
        footerLinks={[
          {
            href: "/signup",
            text: "Don't have an account?",
            linkText: "Sign up"
          },
          {
            href: "/forgot-password",
            text: "",
            linkText: "Forgot your password?"
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
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>
          
          <Button type="submit" className="w-full rounded-lg" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CenteredAuthLayout>
    </div>
  );
}