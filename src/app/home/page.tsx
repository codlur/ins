"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search, RefreshCw, Filter } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { RSS_FEEDS } from "@/lib/rss-service";

interface NewsArticle {
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

export default function HomePage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSources, setSelectedSources] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sources, setSources] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Initialize sources and selected sources
  useEffect(() => {
    // Get all sources from RSS_FEEDS and sort them
    const allSources = Object.keys(RSS_FEEDS).sort();
    setSources(allSources);
    
    // Initialize all sources as selected
    const initialSources: Record<string, boolean> = {};
    allSources.forEach(source => {
      initialSources[source] = true;
    });
    setSelectedSources(initialSources);
  }, []);

  // Fetch news from the API
  const fetchNews = useCallback(async (pageNum: number, append = false) => {
    try {
      if (!append) {
        setLoading(true);
      }
      
      // Fetch news articles with a higher limit for better infinite scroll experience
      const response = await fetch(`/api/news?page=${pageNum}&limit=50`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        if (append) {
          setArticles(prev => [...prev, ...data.articles]);
        } else {
          setArticles(data.articles);
        }
      } else {
        setError(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  // Fetch news on initial load and when page changes
  useEffect(() => {
    fetchNews(page, page > 1);
  }, [page, fetchNews]);

  const handleRefresh = () => {
    setPage(1);
    fetchNews(1, false);
  };

  const toggleSource = (source: string) => {
    setSelectedSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  };

  const toggleAllSources = () => {
    const allSelected = Object.values(selectedSources).every(selected => selected);
    const newSources: Record<string, boolean> = {};
    sources.forEach(source => {
      newSources[source] = !allSelected;
    });
    setSelectedSources(newSources);
  };

  const filteredArticles = articles.filter(article => {
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!(article.title.toLowerCase().includes(term) ||
        article.description?.toLowerCase().includes(term) ||
        article.source.name.toLowerCase().includes(term))) {
        return false;
      }
    }
    
    // Filter by selected sources
    if (!selectedSources[article.source.name]) {
      return false;
    }
    
    return true;
  });

  // Infinite scroll implementation - always continue fetching
  const lastArticleElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Always increment page to fetch more articles, no limit
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-4 px-2 md:px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">News</h2>
          <p className="text-muted-foreground mt-2">
            Latest AI and technology news
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="w-full md:w-64 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Source Filters */}
      {showFilters && (
        <div className="border rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Filter by Source</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleAllSources}
              className="text-xs"
            >
              {Object.values(selectedSources).every(selected => selected) ? "Deselect All" : "Select All"}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
            {sources.map((source) => (
              <div key={source} className="flex items-center justify-between">
                <span className="text-sm font-medium">{source}</span>
                <Switch
                  checked={selectedSources[source] || false}
                  onCheckedChange={() => toggleSource(source)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {initialLoad && loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-muted-foreground">Failed to load news: {error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={handleRefresh}
          >
            Retry
          </Button>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-muted-foreground">No news articles found.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredArticles.map((article, index) => {
            if (filteredArticles.length === index + 1) {
              return (
                <div 
                  ref={lastArticleElementRef} 
                  key={index} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <NewsCard
                    title={article.title}
                    sourceName={article.source.name}
                    sourceUrl={article.url}
                    publishedAt={article.publishedAt}
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <NewsCard
                    title={article.title}
                    sourceName={article.source.name}
                    sourceUrl={article.url}
                    publishedAt={article.publishedAt}
                  />
                </div>
              );
            }
          })}
          {loading && page > 1 && (
            <div className="col-span-full flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}