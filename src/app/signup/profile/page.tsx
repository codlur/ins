"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CenteredAuthLayout } from "@/components/auth/centered-auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Camera } from "lucide-react";
import authService, { AuthResponse } from "@/lib/auth-service";
import { useUser } from "@/contexts/user-context";

export default function ProfileCreationPage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          // If no authenticated user, redirect to signup
          router.push("/signup");
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
        router.push("/signup");
      }
    };

    checkAuth();
  }, [router]);

  // Validate username format
  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    return usernameRegex.test(username);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        setError('Please select an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate inputs
    if (!name.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    if (!username.trim()) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    if (!validateUsername(username)) {
      setError("Username must be 3-30 characters and can only contain letters, numbers, and underscores");
      setLoading(false);
      return;
    }

    try {
      // Get current user session first
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        setError("Authentication session expired. Please sign in again.");
        router.push("/signin");
        return;
      }

      // Update profile with the provided information, including avatar if uploaded
      const response: AuthResponse = await authService.updateProfile(
        name, 
        username, 
        user.email,
        avatarPreview || undefined
      );
      
      if (response.success && response.user) {
        // Update user context with new profile data
        setUser(response.user);
        
        // Redirect to home page after successful profile creation
        router.push("/app/home");
      } else {
        // Provide more specific error messages
        if (response.error?.includes('Permission denied')) {
          setError("Permission error: Please contact support for assistance.");
        } else if (response.error?.includes('Network error')) {
          setError("Connection error: Please check your internet connection and try again.");
        } else {
          setError(response.error || "Failed to create profile. Please try again.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Profile creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CenteredAuthLayout
        title="Complete Your Profile"
        description="Tell us more about yourself to get started"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <Users className="h-10 w-10" />
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                onClick={triggerFileInput}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <p className="text-xs text-muted-foreground">Upload a profile picture (optional)</p>
          </div>
          
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>
          
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-lg"
            />
            <p className="text-xs text-muted-foreground">3-30 characters, letters, numbers, and underscores only</p>
          </div>
          
          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[100px] rounded-lg"
            />
          </div>
          
          <Button type="submit" className="w-full rounded-lg" disabled={loading}>
            {loading ? "Saving..." : "Complete Profile"}
          </Button>
        </form>
      </CenteredAuthLayout>
    </div>
  );
}