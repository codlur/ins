"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { useUser } from "@/contexts/user-context";

export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postThumbnail, setPostThumbnail] = useState("");
  const [postContent, setPostContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCreate = () => {
    console.log("Creating post:", { postTitle, postDescription, postThumbnail, postContent });
    // Here you would typically make an API call to create the post
    alert("Post created successfully!");
    
    // Reset form fields
    setPostTitle("");
    setPostDescription("");
    setPostThumbnail("");
    setPostContent("");
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      // Insert two spaces for indentation
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      e.currentTarget.value = value.substring(0, start) + "  " + value.substring(end);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Top section with author info and publish button */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-muted">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium">{user.name}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreviewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleCreate} className="px-6">
            Publish
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <div>
          <div className="pb-4 mb-4">

          </div>
          {isPreviewMode ? (
            // Preview mode - single column layout
            <div className="space-y-6">
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{postTitle || "Untitled Post"}</h1>
                {postDescription && (
                  <p className="text-lg text-muted-foreground mb-6">{postDescription}</p>
                )}
                {postThumbnail && (
                  <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden mb-6">
                    <img 
                      src={postThumbnail} 
                      alt="Post thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="prose max-w-none">
                  {postContent ? (
                    <div className="whitespace-pre-wrap">
                      {postContent.split('\n').map((line, i) => {
                        if (line.trim() === '') {
                          return <br key={i} />;
                        } else {
                          return <p key={i} className="mb-4">{line}</p>;
                        }
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No content entered</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Edit mode - two column layout (swapped)
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side - Content */}
              <div className="lg:w-2/3 space-y-6">
                {/* Post content */}
                <div className="space-y-2">
                  <Label htmlFor="post-content" className="text-lg font-medium">
                    Content
                  </Label>
                  <Textarea
                    ref={textareaRef}
                    id="post-content"
                    placeholder="Write your post content here..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[500px] text-base p-4 border-0 shadow-none focus-visible:ring-0 resize-none leading-relaxed"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {postContent.length} characters
                  </p>
                </div>
              </div>
              
              {/* Right sidebar - Title, description, thumbnail */}
              <div className="lg:w-1/3 space-y-6">
                {/* Post title */}
                <div className="space-y-2">
                  <Label htmlFor="post-title" className="text-lg font-medium">Title</Label>
                  <Input
                    id="post-title"
                    placeholder="Enter a title for your post"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="text-xl py-6 border-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                
                {/* Separator */}
                <div className="border-b border-muted"></div>
                
                {/* Post description */}
                <div className="space-y-2">
                  <Label htmlFor="post-description" className="text-lg font-medium">Description</Label>
                  <Textarea
                    id="post-description"
                    placeholder="Enter a brief description for your post"
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    className="min-h-[100px] text-base p-4 border-0 shadow-none focus-visible:ring-0 resize-none"
                  />
                </div>
                
                {/* Separator */}
                <div className="border-b border-muted"></div>
                
                {/* Post thumbnail */}
                <div className="space-y-2">
                  <Label htmlFor="post-thumbnail" className="text-lg font-medium">Thumbnail</Label>
                  <Input
                    id="post-thumbnail"
                    placeholder="Enter thumbnail URL"
                    value={postThumbnail}
                    onChange={(e) => setPostThumbnail(e.target.value)}
                    className="text-base py-6 border-0 shadow-none focus-visible:ring-0"
                  />
                  {postThumbnail && (
                    <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden mt-2">
                      <img 
                        src={postThumbnail} 
                        alt="Thumbnail preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}