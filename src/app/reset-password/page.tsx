"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CenteredAuthLayout } from "@/components/auth/centered-auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "@/lib/auth-service";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Get userId and secret from URL parameters (in a real app)
  const userId = searchParams.get("userId") || "mock-user-id";
  const secret = searchParams.get("secret") || "mock-secret";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await authService.resetPassword(userId, secret, password);
      
      if (result) {
        setSuccess(true);
      } else {
        setError("Failed to reset password");
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
        title="Set new password"
        description="Create a new password for your account"
        footerLinks={[
          {
            href: "/signin",
            text: "Back to",
            linkText: "Sign in"
          }
        ]}
      >
        {success ? (
          <div className="space-y-4">
            <div className="text-sm text-green-500 bg-green-50 p-4 rounded-lg">
              Your password has been successfully reset. You can now sign in with your new password.
            </div>
            <Button onClick={() => router.push("/signin")} className="w-full rounded-lg">
              Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-2 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            
            <Button type="submit" className="w-full rounded-lg" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}
      </CenteredAuthLayout>
    </div>
  );
}