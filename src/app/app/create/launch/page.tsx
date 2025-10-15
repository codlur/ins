"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Eye } from "lucide-react";
import { useUser } from "@/contexts/user-context";

export default function CreateLaunchPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [launchName, setLaunchName] = useState("");
  const [launchDescription, setLaunchDescription] = useState("");

  // Redirect non-premium users to premium page
  useEffect(() => {
    if (!user.isPremium) {
      router.replace("/app/premium-sign-up");
    }
  }, [user.isPremium, router]);

  // Don't render the page if user is not premium
  if (!user.isPremium) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Premium Feature</h2>
          <p className="text-muted-foreground mb-6">
            Launch creation is only available for premium users. Upgrade your account to access this feature.
          </p>
          <Button onClick={() => router.push("/app/premium-sign-up")}>
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  const handleCreate = () => {
    console.log("Creating launch:", { launchName, launchDescription });
    // Here you would typically make an API call to create the launch
    alert("Launch created successfully!");
    
    // Reset form fields
    setLaunchName("");
    setLaunchDescription("");
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create New Launch</h1>
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-6">
        <div>
          <div className="pb-4 border-b border-muted mb-4">
            <h2 className="text-lg font-semibold">Create Launch</h2>
            <p className="text-sm text-muted-foreground">Announce a new product or feature</p>
          </div>
          <div className="space-y-4">
            {isPreviewMode ? (
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md font-medium">
                  {launchName || "No name entered"}
                </div>
                <div className="p-3 bg-muted rounded-md">
                  {launchDescription || "No description entered"}
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="launch-name">Launch Name</Label>
                  <Input
                    id="launch-name"
                    placeholder="Enter launch name"
                    value={launchName}
                    onChange={(e) => setLaunchName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="launch-description">Description</Label>
                  <Textarea
                    id="launch-description"
                    placeholder="Describe your launch"
                    value={launchDescription}
                    onChange={(e) => setLaunchDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreviewMode ? "Edit" : "Preview"}
              </Button>
              {!isPreviewMode && (
                <Button onClick={handleCreate}>Create Launch</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}