"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Eye, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowRight,
  Star,
  Filter,
  X
} from "lucide-react";
import { NewsCard } from "@/components/news-card";
import Link from "next/link";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allSources, setAllSources] = useState<string[]>([]);

  // Fetch news articles
  const fetchNews = async (pageNum: number = 1) => {
    try {
      setLoading(pageNum === 1);
      const response = await fetch(`/api/news?page=${pageNum}&limit=20`);
      const data = await response.json();
      
      if (data.articles) {
        const newArticles = data.articles.map((article: Article) => ({
          ...article
        }));
        
        setArticles(prev => pageNum === 1 ? newArticles : [...prev, ...newArticles]);
        setHasMore(data.articles.length > 0);
        
        // Extract unique sources
        const sources = Array.from(
          new Set(data.articles.map((article: Article) => article.source.name))
        ).filter(Boolean) as string[];
        
        setAllSources(prev => {
          const updated = [...new Set([...prev, ...sources])];
          return updated.sort();
        });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // When we're close to the bottom (within 100px), load more
    if (documentHeight - (scrollTop + windowHeight) < 100) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  // Toggle source filter
  const toggleSource = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source) 
        : [...prev, source]
    );
  };

  // Filter articles based on search and sources
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = selectedSources.length === 0 || 
                         selectedSources.includes(article.source.name);
    
    return matchesSearch && matchesSource;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSources([]);
  };

  // Fetch news on page load and when page changes
  useEffect(() => {
    fetchNews(page);
  }, [page]);

  // Reset and fetch news when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedSources]);

  // Add scroll event listener for infinite scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex-1 space-y-6">
      {/* Header Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Latest News</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest in technology, AI, and innovation
        </p>
      </section>

      {/* Search and Filters */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Sources
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedSources.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm">
                <span>Search: {searchTerm}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {selectedSources.map(source => (
              <div key={source} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm">
                <span>{source}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4"
                  onClick={() => toggleSource(source)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {(searchTerm || selectedSources.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Source Filter Dropdown */}
      <section className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Filter by Source</h3>
        <div className="flex flex-wrap gap-2">
          {allSources.map(source => (
            <Button
              key={source}
              variant={selectedSources.includes(source) ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => toggleSource(source)}
            >
              {source}
            </Button>
          ))}
        </div>
      </section>

      {/* News Articles */}
      <section>
        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <div key={`${article.url}-${index}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <NewsCard
                    title={article.title}
                    sourceName={article.source.name}
                    sourceUrl={article.url}
                    publishedAt={article.publishedAt}
                  />
                </div>
              ))}
            </div>
            
            {hasMore && !loading && (
              <div className="flex justify-center my-8">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border p-8 text-center">
            <p className="text-muted-foreground">
              No articles found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}