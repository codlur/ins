"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Heart, MessageCircle, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/bookmark-button";
import { useSearchParams } from "next/navigation";

// Mock data for search results
const mockSearchResults = [
  {
    id: 1,
    type: "post",
    username: "ai_researcher",
    name: "Dr. Alex Morgan",
    avatar: "/placeholder-image-1.jpg",
    title: "Transformers Architecture Breakthrough",
    content: "Just published a new paper on transformer architectures. The results show significant improvements in efficiency while maintaining accuracy.",
    coverImage: "/placeholder-image-2.jpg",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    isFollowing: false
  },
  {
    id: 2,
    type: "post",
    username: "ml_engineer",
    name: "Sarah Johnson",
    avatar: "/placeholder-image-1.jpg",
    title: "Computer Vision Meets NLP",
    content: "Working on a fascinating project combining computer vision with natural language processing. The potential applications are endless!",
    coverImage: "/placeholder-image-3.jpg",
    timestamp: "4 hours ago",
    likes: 18,
    comments: 3,
    isFollowing: true
  },
  {
    id: 3,
    type: "product",
    name: "NeuralNet Studio",
    title: "Advanced Neural Network Development Platform",
    description: "A comprehensive platform for designing, training, and deploying neural networks with intuitive visual tools.",
    coverImage: "/placeholder-image-4.jpg",
    timestamp: "1 day ago",
    likes: 32,
    comments: 7
  },
  {
    id: 4,
    type: "launch",
    name: "AI Ethics Framework",
    title: "Comprehensive AI Ethics Guidelines for Enterprise",
    description: "A complete framework for implementing ethical AI practices in enterprise environments with practical checklists and tools.",
    coverImage: "/placeholder-image-5.jpg",
    timestamp: "1 day ago",
    likes: 41,
    comments: 12
  },
  {
    id: 5,
    type: "post",
    username: "nlp_specialist",
    name: "James Rodriguez",
    avatar: "/placeholder-image-1.jpg",
    title: "Few-Shot Learning Advances",
    content: "Latest breakthrough in few-shot learning for language models. Reduces the need for massive training datasets by 80%.",
    coverImage: "/placeholder-image-6.jpg",
    timestamp: "2 days ago",
    likes: 56,
    comments: 9,
    isFollowing: false
  },
  {
    id: 6,
    type: "product",
    name: "DataFlow AI",
    title: "Real-time Data Processing Engine",
    description: "High-performance data processing engine optimized for AI workloads with built-in model training capabilities.",
    coverImage: "/placeholder-image-7.jpg",
    timestamp: "3 days ago",
    likes: 78,
    comments: 15
  }
];

// Mock data for search filters
const searchFilters = [
  { id: "all", name: "All" },
  { id: "posts", name: "Posts" },
  { id: "products", name: "Products" },
  { id: "launches", name: "Launches" },
  { id: "people", name: "People" }
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [filteredResults, setFilteredResults] = useState(mockSearchResults);
  const [activeFilter, setActiveFilter] = useState("all");
  const [following, setFollowing] = useState(
    mockSearchResults.reduce((acc, item) => {
      if (item.type === "post") {
        acc[item.id] = (item as any).isFollowing || false;
      }
      return acc;
    }, {} as Record<number, boolean>)
  );

  // Update search query when URL parameter changes
  useEffect(() => {
    if (initialQuery && initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Filter results based on search query and active filter
  useEffect(() => {
    let results = [...mockSearchResults];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (activeFilter !== "all") {
      results = results.filter(item => {
        if (activeFilter === "posts") return item.type === "post";
        if (activeFilter === "products") return item.type === "product";
        if (activeFilter === "launches") return item.type === "launch";
        if (activeFilter === "people") return item.type === "post"; // People are represented by posts
        return true;
      });
    }
    
    setFilteredResults(results);
  }, [searchQuery, activeFilter]);

  // Toggle follow status
  const toggleFollow = (itemId: number) => {
    setFollowing(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

// Clear search query
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a new search
    // For now, we're just using mock data
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row p-4 pt-6 gap-8">
      {/* Main content - search results */}
      <div className="flex-1">
        {/* Search header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Search</h1>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search community posts, products, launches..." 
                className="pl-10 py-5 text-base rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={clearSearch}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Search filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {searchFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Search results count */}
        <div className="text-muted-foreground mb-4">
          {filteredResults.length} results {searchQuery && `for "${searchQuery}"`}
        </div>

        {/* Search results */}
        <div className="space-y-8">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <div key={item.id} className="pb-8">
                {item.type === "post" ? (
                  // Post result
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Left column - author info and title */}
                    <div className="md:w-3/4">
                      {/* Author info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{item.name}</div>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                      
                      {/* Description */}
                      <p className="text-foreground mb-3 text-base leading-relaxed font-light text-muted-foreground">
                        {item.content}
                      </p>
                    </div>
                    
                    {/* Right column - cover image */}
                    <div className="md:w-1/4">
                      <div className="aspect-square w-full bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={item.coverImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Product/Launch result
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Left column - cover image */}
                    <div className="md:w-1/4">
                      <div className="aspect-square w-full bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={item.coverImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Right column - content */}
                    <div className="md:w-3/4">
                      {/* Author info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{item.name}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between mb-2">
                        <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full capitalize">
                          {item.type}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                      
                      {/* Description */}
                      <p className="text-foreground mb-3 text-base leading-relaxed font-light text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Post actions */}
                <div className="flex items-center gap-6 text-muted-foreground pt-4">
                  <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Heart className="h-5 w-5" />
                    <span>{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>{item.comments}</span>
                  </button>
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors ml-auto">
                    <BookmarkButton 
                      item={{
                        type: item.type as any,
                        id: item.id.toString(),
                        title: item.title,
                        content: item.content || item.description || "",
                        author: item.name,
                        publishedAt: new Date().toISOString(),
                        bookmarkedAt: new Date().toISOString()
                      }}
                    />
                    <span>Save</span>
                  </div>
                  <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
                
                {/* Separator after each result except the last one */}
                {index < filteredResults.length - 1 && (
                  <div className="border-b border-muted mt-8"></div>
                )}
              </div>
            ))
          ) : (
            // No results message
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `We couldn't find any results for "${searchQuery}". Try different keywords.` 
                  : "Try searching for posts, products, or launches."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}