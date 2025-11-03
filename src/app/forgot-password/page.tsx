"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CenteredAuthLayout } from "@/components/auth/centered-auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "@/lib/auth-service";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await authService.sendPasswordReset(email);
      
      if (result) {
        setSuccess(true);
      } else {
        setError("Failed to send reset instructions");
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
        title="Reset your password"
        description="Enter your email and we'll send you instructions to reset your password"
        footerLinks={[
          {
            href: "/signin",
            text: "Remember your password?",
            linkText: "Sign in"
          }
        ]}
      >
        {success ? (
          <div className="space-y-4">
            <div className="text-sm text-green-500 bg-green-50 p-4 rounded-lg">
              We've sent password reset instructions to your email. Please check your inbox.
            </div>
            <Button onClick={() => router.push("/signin")} className="w-full rounded-lg">
              Back to Sign In
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
            
            <Button type="submit" className="w-full rounded-lg" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Instructions"}
            </Button>
          </form>
        )}
      </CenteredAuthLayout>
    </div>
  );
}