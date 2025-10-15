"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Shuffle, Filter } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { useState, useEffect, useCallback, useRef } from "react";
import { RSSArticle as NewsArticle } from "@/lib/rss-service";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Increase items per page to show more news at once
const ITEMS_PER_PAGE = 50;

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [filteredNewsItems, setFilteredNewsItems] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<number>(0);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  // Function to map source names for display
  const getSourceDisplayName = (sourceName: string) => {
    if (sourceName === 'Bloomberg') {
      return 'Bloomberg AI';
    }
    if (sourceName === 'Medium AI') {
      return 'Medium AI';
    }
    if (sourceName === 'TechCrunch Apps') {
      return 'TechCrunch Apps';
    }
    return sourceName;
  };

  // Get unique sources from news items with display name mapping
  const getUniqueSources = () => {
    const sources = newsItems.map(item => item.source.name);
    const uniqueSources = Array.from(new Set(sources));
    return uniqueSources.map(source => getSourceDisplayName(source));
  };

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Handle shuffle
  const handleShuffle = () => {
    setFilteredNewsItems(prev => shuffleArray(prev));
  };

  // Handle source filter with original source name mapping
  const handleSourceFilter = (source: string | null) => {
    setSelectedSource(source);
    setPage(1); // Reset to first page when filtering
    
    if (source) {
      // Filter by matching the display name of the source
      const filtered = newsItems.filter(item => 
        getSourceDisplayName(item.source.name) === source
      );
      setFilteredNewsItems(filtered);
    } else {
      // When selecting "All Sources", use all news items
      setFilteredNewsItems(newsItems);
    }
  };

  // Fetch all news data (mixed feed)
  const loadNews = useCallback(async (pageNum: number = 1) => {
    try {
      setLoading(pageNum === 1); // Only show loading spinner for first page
      setError(null);
      
      // Fetch news without any specific filter to get a mixed feed
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/news?page=${pageNum}&limit=${ITEMS_PER_PAGE}&t=${timestamp}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'error') {
        setError('Failed to load news. Please try again later.');
        if (pageNum === 1) {
          setNewsItems([]);
        }
      } else {
        // Sort articles by published date (newest first)
        const sortedArticles = [...data.articles].sort((a, b) => {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        
        if (pageNum === 1) {
          setNewsItems(sortedArticles);
        } else {
          // Append new articles to existing ones
          setNewsItems(prev => {
            const combined = [...prev, ...sortedArticles];
            // Remove duplicates based on URL
            const unique = combined.filter((article, index, self) => 
              index === self.findIndex(a => a.url === article.url)
            );
            return unique;
          });
        }
        
        // Set hasMore based on whether we received a full page of articles
        setHasMore(data.articles.length === ITEMS_PER_PAGE);
      }
    } catch (err) {
      setError('Failed to load news. Please try again later.');
      if (pageNum === 1) {
        setNewsItems([]);
      }
    } finally {
      if (pageNum === 1) {
        setLoading(false);
      }
    }
  }, []);

  // Fetch more news for infinite scroll
  const loadMoreNews = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      await loadNews(page + 1);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Failed to load more news.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, loadNews, page]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (loading) return;
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLoadingMore && hasMore) {
        loadMoreNews();
      }
    }, { threshold: 1.0 });
    
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, isLoadingMore, loadMoreNews, hasMore]);

  // Fetch news data on component mount
  useEffect(() => {
    loadNews(1);
    setPage(1);
    
    // Clean up any intervals on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadNews, lastRefresh]);

  // Apply filters when news items or selected source changes
  useEffect(() => {
    let filtered = [...newsItems];
    
    // Apply source filter
    if (selectedSource) {
      filtered = filtered.filter(item => 
        getSourceDisplayName(item.source.name) === selectedSource
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.source.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredNewsItems(filtered);
  }, [newsItems, selectedSource, searchQuery]);

  // Handle refresh with double-tap shuffle
  const handleRefresh = () => {
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefresh;
    
    // If less than 500ms since last refresh, shuffle instead
    if (timeSinceLastRefresh < 500) {
      handleShuffle();
    } else {
      // When refreshing, shuffle the news items if viewing all sources
      loadNews(1);
      setPage(1);
    }
    
    setLastRefresh(now);
  };

  // Render loading skeletons
  if (loading && newsItems.length === 0) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">News</h2>
            <span className="text-sm text-muted-foreground">(Last 7 days)</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${Date.now() - lastRefresh < 500 ? 'text-blue-500' : ''}`} />
              Refresh
            </Button>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-video" />
              <CardContent className="p-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (error && newsItems.length === 0) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">News</h2>
            <span className="text-sm text-muted-foreground">(Last 7 days)</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${Date.now() - lastRefresh < 500 ? 'text-blue-500' : ''}`} />
              Refresh
            </Button>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={handleRefresh}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${Date.now() - lastRefresh < 500 ? 'text-blue-500' : ''}`} />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">News</h2>
          <span className="text-sm text-muted-foreground">(Last 7 days)</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-3 h-3 rounded-full bg-teal-500 cursor-pointer"></div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  The news feature is still in development. 
                  Content is updated periodically throughout the day, 
                  but may not always show the absolute latest articles. 
                  Refresh or shuffle to see more recent content.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRefresh}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : (Date.now() - lastRefresh < 500 ? 'text-blue-500' : '')}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleShuffle}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          {/* Filter by Source Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className={selectedSource ? "bg-muted" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto w-56">
              <DropdownMenuItem onClick={() => handleSourceFilter(null)}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs">All</span>
                  </div>
                  <span>All Sources</span>
                </div>
              </DropdownMenuItem>
              {getUniqueSources().map((source) => (
                <DropdownMenuItem 
                  key={source} 
                  onClick={() => handleSourceFilter(source)}
                  className={selectedSource === source ? "bg-muted" : ""}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs">
                        {source.charAt(0)}
                      </span>
                    </div>
                    <span>{source}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search news..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredNewsItems.map((news, index) => {
          // Add ref to the last item for infinite scroll
          if (index === filteredNewsItems.length - 1) {
            return (
              <div ref={lastItemRef} key={`${news.url}-${index}`}>
                <NewsCard
                  title={news.title}
                  sourceName={news.source.name}
                  sourceUrl={news.url}
                  publishedAt={news.publishedAt}
                />
              </div>
            );
          }
          
          return (
            <NewsCard
              key={`${news.url}-${index}`}
              title={news.title}
              sourceName={news.source.name}
              sourceUrl={news.url}
              publishedAt={news.publishedAt}
            />
          );
        })}
      </div>
      
      {isLoadingMore && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE / 2 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-video" />
              <CardContent className="p-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Show message when there are no more articles to load */}
      {!hasMore && filteredNewsItems.length > 0 && (
        <div className="text-center py-4 text-muted-foreground">
          You've reached the end of the news feed
        </div>
      )}
      
      {filteredNewsItems.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {searchQuery 
              ? `No news found matching "${searchQuery}"` 
              : selectedSource 
                ? `No news found for "${selectedSource}"` 
                : "No news available"}
          </p>
        </div>
      )}
    </div>
  );
}