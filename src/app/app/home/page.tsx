"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/bookmark-button";
import { useRouter } from "next/navigation";

// Mock data for user posts - For You feed
const forYouPosts = [
  {
    id: 1,
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
    username: "data_scientist",
    name: "Michael Chen",
    avatar: "/placeholder-image-1.jpg",
    title: "Anomaly Detection in Time Series",
    content: "Exploring new techniques in anomaly detection for time series data. The latest results are quite promising.",
    coverImage: "/placeholder-image-4.jpg",
    timestamp: "1 day ago",
    likes: 32,
    comments: 7,
    isFollowing: false
  },
  {
    id: 4,
    username: "ai_ethicist",
    name: "Dr. Emma Wilson",
    avatar: "/placeholder-image-1.jpg",
    title: "Responsible AI Deployment",
    content: "Important considerations about AI governance and responsible deployment. We need to ensure these technologies benefit everyone.",
    coverImage: "/placeholder-image-5.jpg",
    timestamp: "1 day ago",
    likes: 41,
    comments: 12,
    isFollowing: true
  },
  {
    id: 5,
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
  }
];

// Mock data for following posts - Following feed
const followingPosts = [
  {
    id: 2,
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
    id: 4,
    username: "ai_ethicist",
    name: "Dr. Emma Wilson",
    avatar: "/placeholder-image-1.jpg",
    title: "Responsible AI Deployment",
    content: "Important considerations about AI governance and responsible deployment. We need to ensure these technologies benefit everyone.",
    coverImage: "/placeholder-image-5.jpg",
    timestamp: "1 day ago",
    likes: 41,
    comments: 12,
    isFollowing: true
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("for-you");
  const [posts, setPosts] = useState(forYouPosts);
  const [following, setFollowing] = useState(
    forYouPosts.reduce((acc, post) => {
      acc[post.id] = post.isFollowing;
      return acc;
    }, {} as Record<number, boolean>)
  );
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Switch between For You and Following tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "for-you") {
      setPosts(forYouPosts);
    } else {
      setPosts(followingPosts);
    }
  };

  // Toggle follow status
  const toggleFollow = (postId: number) => {
    setFollowing(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));

    // Update posts state to reflect follow status
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isFollowing: !post.isFollowing } 
          : post
      )
    );
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/app/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row p-4 pt-6 gap-8">
      {/* Main content - user posts feed */}
      <div className="flex-1">
        {/* Filter with separator - For You / Following */}
        <div className="border-b border-muted -mx-4">
          <div className="flex px-4">
            <button 
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "for-you" 
                  ? "border-b-2 border-teal-500 text-teal-600" 
                  : "text-muted-foreground"
              }`}
              onClick={() => handleTabChange("for-you")}
            >
              For You
            </button>
            <button 
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "following" 
                  ? "border-b-2 border-teal-500 text-teal-600" 
                  : "text-muted-foreground"
              }`}
              onClick={() => handleTabChange("following")}
            >
              Following
            </button>
          </div>
        </div>
        
        <div className="space-y-8 mt-6">
          {posts.map((post, index) => (
            <div key={post.id} className="pb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Left column - author info, title and description */}
                <div className="md:w-3/4">
                  {/* Author info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {post.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{post.name}</div>
                    </div>
                    {activeTab === "for-you" && (
                      <Button 
                        variant={post.isFollowing ? "outline" : "default"}
                        size="sm"
                        className="ml-auto text-xs h-7 px-2"
                        onClick={() => toggleFollow(post.id)}
                      >
                        {post.isFollowing ? "Following" : "Follow"}
                      </Button>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  
                  {/* Description */}
                  <p className="text-foreground mb-3 text-base leading-relaxed font-light text-muted-foreground">
                    {post.content}
                  </p>
                </div>
                
                {/* Right column - cover image */}
                <div className="md:w-1/4">
                  <div className="aspect-square w-full bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
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
              
              {/* Post actions */}
              <div className="flex items-center gap-4 text-muted-foreground pt-3">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors text-sm">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors text-sm">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </button>
                <div className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto text-sm">
                  <BookmarkButton 
                    item={{
                      type: 'post',
                      id: post.id.toString(),
                      title: post.title,
                      content: post.content,
                      author: post.name,
                      publishedAt: new Date().toISOString(),
                      bookmarkedAt: new Date().toISOString()
                    }}
                  />
                  <span>Save</span>
                </div>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors text-sm">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
              
              {/* Separator after each post except the last one */}
              {index < posts.length - 1 && (
                <div className="border-b border-muted mt-6"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right sidebar - search */}
      <div className="w-full lg:w-80">
        <div className="border-l border-muted pl-6 h-full">
          {/* Search Section */}
          <div className="mb-6">
            <h2 className="text-lg font-light mb-3">Search</h2>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search community posts..." 
                  className="pl-10 py-5 text-base rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}