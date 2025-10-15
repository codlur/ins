"use client";

import { useState } from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function CreateModal() {
  const [activeTab, setActiveTab] = useState("post");
  const [postContent, setPostContent] = useState("");
  const [launchName, setLaunchName] = useState("");
  const [launchDescription, setLaunchDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleCreate = () => {
    // Handle creation based on active tab
    switch (activeTab) {
      case "post":
        console.log("Creating post:", postContent);
        break;
      case "launch":
        console.log("Creating launch:", { launchName, launchDescription });
        break;
      case "product":
        console.log("Creating product:", { productName, productCategory });
        break;
    }
    // Reset form fields
    setPostContent("");
    setLaunchName("");
    setLaunchDescription("");
    setProductName("");
    setProductCategory("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-2 px-4 flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Create New</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "post"
                  ? "border-b-2 border-teal-500 text-teal-600"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("post")}
            >
              Post
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "launch"
                  ? "border-b-2 border-teal-500 text-teal-600"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("launch")}
            >
              Launch
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "product"
                  ? "border-b-2 border-teal-500 text-teal-600"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("product")}
            >
              Product
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "post" && (
              <div>
                <div className="pb-4 border-b border-muted mb-4">
                  <h2 className="text-lg font-semibold">Create Post</h2>
                  <p className="text-sm text-muted-foreground">Share your thoughts with your followers</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea
                      id="post-content"
                      placeholder="What's on your mind?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      maxLength={150}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {postContent.length}/150
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "launch" && (
              <div>
                <div className="pb-4 border-b border-muted mb-4">
                  <h2 className="text-lg font-semibold">Create Launch</h2>
                  <p className="text-sm text-muted-foreground">Announce a new product or feature</p>
                </div>
                <div className="space-y-4">
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
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "product" && (
              <div>
                <div className="pb-4 border-b border-muted mb-4">
                  <h2 className="text-lg font-semibold">Create Product</h2>
                  <p className="text-sm text-muted-foreground">Add a new product to your portfolio</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Input
                      id="product-category"
                      placeholder="Enter product category"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}