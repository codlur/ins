"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmark-utils";

interface BookmarkButtonProps {
  item: any;
  variant?: "ghost" | "outline" | "default";
  size?: "icon" | "sm" | "default";
  className?: string;
}

export function BookmarkButton({ 
  item, 
  variant = "ghost", 
  size = "icon",
  className = ""
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  // Check if item is bookmarked
  useEffect(() => {
    setBookmarked(isBookmarked(item));
  }, [item]);

  // Handle storage events to update bookmark status
  useEffect(() => {
    const handleStorageChange = () => {
      setBookmarked(isBookmarked(item));
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [item]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(item);
    setBookmarked(!bookmarked);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current text-yellow-500' : ''}`} />
    </Button>
  );
}