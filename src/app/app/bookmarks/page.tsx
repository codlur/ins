"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "@/components/news-card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getBookmarks, removeBookmark, BookmarkItem } from "@/lib/bookmark-utils";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const loadBookmarks = () => {
      const savedBookmarks = getBookmarks();
      // Sort by bookmarkedAt date, newest first
      const sortedBookmarks = savedBookmarks.sort((a, b) => 
        new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
      );
      setBookmarks(sortedBookmarks);
    };

    loadBookmarks();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadBookmarks();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const clearAllBookmarks = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarks', JSON.stringify([]));
      setBookmarks([]);
    }
  };

  const removeSpecificBookmark = (bookmark: BookmarkItem) => {
    removeBookmark(bookmark);
    // Update local state
    const updatedBookmarks = bookmarks.filter(b => {
      switch (b.type) {
        case 'news':
          return b.sourceUrl !== (bookmark as any).sourceUrl;
        case 'product':
          return b.id !== (bookmark as any).id;
        case 'launch':
          return b.id !== (bookmark as any).id;
        case 'post':
          return b.id !== (bookmark as any).id;
        default:
          return true;
      }
    });
    setBookmarks(updatedBookmarks);
  };

  // Render bookmark based on type
  const renderBookmark = (bookmark: BookmarkItem) => {
    switch (bookmark.type) {
      case 'news':
        return (
          <div key={bookmark.sourceUrl} className="relative">
            <NewsCard
              title={bookmark.title}
              sourceName={bookmark.sourceName}
              sourceUrl={bookmark.sourceUrl}
              publishedAt={bookmark.publishedAt}
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                removeSpecificBookmark(bookmark);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      case 'product':
        return (
          <div key={bookmark.id} className="relative">
            <div className="py-4">
              <h3 className="text-lg font-light mb-2 line-clamp-3">
                {bookmark.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {bookmark.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">
                    Product
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(bookmark.bookmarkedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-muted"></div>
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                removeSpecificBookmark(bookmark);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      case 'launch':
        return (
          <div key={bookmark.id} className="relative">
            <div className="py-4">
              <h3 className="text-lg font-light mb-2 line-clamp-3">
                {bookmark.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {bookmark.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">
                    Launch
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(bookmark.bookmarkedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-muted"></div>
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                removeSpecificBookmark(bookmark);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      case 'post':
        return (
          <div key={bookmark.id} className="relative">
            <div className="py-4">
              <h3 className="text-lg font-light mb-2 line-clamp-3">
                {bookmark.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {bookmark.content.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">
                    Post by {bookmark.author}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(bookmark.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-muted"></div>
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                removeSpecificBookmark(bookmark);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bookmarks</h1>
        {bookmarks.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearAllBookmarks}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No bookmarks yet, bookmark anything you want.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bookmarks.map(renderBookmark)}
        </div>
      )}
    </div>
  );
}