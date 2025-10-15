"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Edit, Mail, Linkedin, Instagram, Youtube, Twitter, Link as LinkIcon, Heart, MessageCircle, Share2, Brain, Database, Scale, Eye, MessageSquare, Zap, Code, Palette, Music, Camera, Book, Gamepad2, Plane, Wallet, Leaf, Shield, Star, Target, TrendingUp, Globe, MapPin, Calendar, Clock, Award, Trophy, Medal, Flag, Anchor, Mountain, Waves, Sun, Moon, Cloud, ShoppingCart, Building, Lock, Key, Settings, Bell, Archive, Download, Upload, Send, Check, X, Plus, Minus, Search, Filter, Grid, List, Menu, Home, User, Bookmark, Tag, Hash, AtSign, Phone, Video, Mic, Headphones, Monitor, Smartphone, Tablet, Laptop, Watch, Battery, Wifi, Bluetooth, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, RotateCcw, RotateCw, RefreshCw, RefreshCcw, Repeat, Shuffle, Rewind, FastForward, CheckCircle, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useAdminView } from "@/app/app/layout";
import { useUser } from "@/contexts/user-context";
import { BookmarkButton } from "@/components/bookmark-button";

export default function ProfilePage() {
  const { isAdminView, setIsAdminView } = useAdminView();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState("I'm a software developer passionate about creating amazing user experiences.");
  const [customLink, setCustomLink] = useState("x.com");
  const [email, setEmail] = useState(user.email);
  const [twitter, setTwitter] = useState("https://twitter.com/johndoe");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/johndoe");
  const [instagram, setInstagram] = useState("https://instagram.com/johndoe");
  const [youtube, setYoutube] = useState("https://youtube.com/johndoe");
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("posts");

  // User interests state
  const [userInterests, setUserInterests] = useState([
    { id: 1, name: "Machine Learning", icon: "Brain" },
    { id: 2, name: "Data Science", icon: "Database" },
    { id: 3, name: "AI Ethics", icon: "Scale" },
    { id: 4, name: "Computer Vision", icon: "Eye" }
  ]);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  // Icon mapping
  const iconMap = {
    Brain: Brain,
    Database: Database,
    Scale: Scale,
    Eye: Eye,
    MessageSquare: MessageSquare,
    Zap: Zap,
    Code: Code,
    Palette: Palette,
    Music: Music,
    Camera: Camera,
    Book: Book,
    Gamepad2: Gamepad2,
    Plane: Plane,
    Wallet: Wallet,
    Leaf: Leaf,
    Shield: Shield,
    Star: Star,
    Target: Target,
    TrendingUp: TrendingUp,
    Globe: Globe,
    MapPin: MapPin,
    Calendar: Calendar,
    Clock: Clock,
    Award: Award,
    Trophy: Trophy,
    Medal: Medal,
    Flag: Flag,
    Anchor: Anchor,
    Mountain: Mountain,
    Waves: Waves,
    Sun: Sun,
    Moon: Moon,
    Cloud: Cloud,
    ShoppingCart: ShoppingCart,
    Building: Building,
    Lock: Lock,
    Key: Key,
    Settings: Settings,
    Bell: Bell,
    Archive: Archive,
    Download: Download,
    Upload: Upload,
    Send: Send,
    Check: Check,
    X: X,
    Plus: Plus,
    Minus: Minus,
    Search: Search,
    Filter: Filter,
    Grid: Grid,
    List: List,
    Menu: Menu,
    Home: Home,
    User: User,
    Bookmark: Bookmark,
    Tag: Tag,
    Hash: Hash,
    AtSign: AtSign,
    Phone: Phone,
    Video: Video,
    Mic: Mic,
    Headphones: Headphones,
    Monitor: Monitor,
    Smartphone: Smartphone,
    Tablet: Tablet,
    Laptop: Laptop,
    Watch: Watch,
    Battery: Battery,
    Wifi: Wifi,
    Bluetooth: Bluetooth,
    Volume2: Volume2,
    VolumeX: VolumeX,
    Play: Play,
    Pause: Pause,
    SkipForward: SkipForward,
    SkipBack: SkipBack,
    RotateCcw: RotateCcw,
    RotateCw: RotateCw,
    RefreshCw: RefreshCw,
    RefreshCcw: RefreshCcw,
    Repeat: Repeat,
    Shuffle: Shuffle,
    Rewind: Rewind,
    FastForward: FastForward
  };

  // Available icons for selection
  const availableIcons = Object.keys(iconMap);

  // Update local state when user context changes
  useEffect(() => {
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  const handleSaveChanges = () => {
    // Save changes logic would go here
    console.log("Saving changes:", { name, username, bio, customLink, email, twitter, linkedin, instagram, youtube });
    // Update the user context
    setUser({ ...user, name, username, email });
    setIsEditing(false); // Exit edit mode after saving
  };

  const handleCancelEdit = () => {
    // Reset form values to original state
    setName(user.name);
    setUsername(user.username);
    setEmail(user.email);
    setIsEditing(false);
  };

  const handleCreatePost = () => {
    // Create post logic would go here
    if (newPostContent.trim() && newPostContent.length <= 150) {
      console.log("Creating post:", newPostContent);
      setNewPostContent(""); // Clear the input after posting
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && userInterests.length < 4) {
      const newId = userInterests.length > 0 ? Math.max(...userInterests.map(i => i.id)) + 1 : 1;
      // Select a random icon from available icons
      const randomIcon = availableIcons[Math.floor(Math.random() * availableIcons.length)];
      setUserInterests([
        ...userInterests,
        { id: newId, name: newInterest.trim(), icon: randomIcon }
      ]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (id: number) => {
    setUserInterests(userInterests.filter(interest => interest.id !== id));
  };

  // Sample data for posts (user's posts)
  const userPosts = [
    { 
      id: 1, 
      title: "Transformers Architecture Breakthrough",
      content: "Just published a new paper on transformer architectures. The results show significant improvements in efficiency while maintaining accuracy.",
      coverImage: "/placeholder-image-2.jpg",
      timestamp: "2 hours ago", 
      likes: 24, 
      comments: 5 
    },
    { 
      id: 2, 
      title: "Computer Vision Meets NLP",
      content: "Working on a fascinating project combining computer vision with natural language processing. The potential applications are endless!",
      coverImage: "/placeholder-image-3.jpg",
      timestamp: "4 hours ago", 
      likes: 18, 
      comments: 3 
    },
    { 
      id: 3, 
      title: "Anomaly Detection in Time Series",
      content: "Exploring new techniques in anomaly detection for time series data. The latest results are quite promising.",
      coverImage: "/placeholder-image-4.jpg",
      timestamp: "1 day ago", 
      likes: 32, 
      comments: 7 
    },
    { 
      id: 4, 
      title: "Responsible AI Deployment",
      content: "Important considerations about AI governance and responsible deployment. We need to ensure these technologies benefit everyone.",
      coverImage: "/placeholder-image-5.jpg",
      timestamp: "1 day ago", 
      likes: 41, 
      comments: 12 
    }
  ];

  // Sample data for launches
  const launches = [
    { id: 1, name: "Project Alpha", description: "A revolutionary new app for productivity", status: "Launched" },
    { id: 2, name: "Beta Testing Platform", description: "Platform for testing new software features", status: "In Beta" },
    { id: 3, name: "Analytics Dashboard", description: "Comprehensive data visualization tool", status: "In Development" },
    { id: 4, name: "Mobile App Framework", description: "Cross-platform mobile development framework", status: "Planning" },
  ];

  // Sample data for products
  const products = [
    { id: 1, name: "Design System Pro", category: "UI Components", price: "$49.99" },
    { id: 2, name: "Workflow Automation", category: "Productivity", price: "$29.99" },
    { id: 3, name: "Data Insights Toolkit", category: "Analytics", price: "$79.99" },
    { id: 4, name: "API Management Suite", category: "Development", price: "$99.99" },
    { id: 5, name: "Security Audit Tool", category: "Security", price: "$149.99" },
  ];

  // Sample data for bookmarks
  const bookmarks = [
    { id: 1, title: "The Future of AI in Healthcare", source: "TechCrunch", date: "2023-05-15" },
    { id: 2, title: "Understanding Neural Networks", source: "AI News", date: "2023-05-10" },
    { id: 3, title: "Machine Learning Best Practices", source: "Medium", date: "2023-05-05" },
    { id: 4, title: "Ethics in AI Development", source: "Wired", date: "2023-04-28" },
  ];

  // Function to format URL for display
  const formatUrlForDisplay = (url: string) => {
    try {
      // If it's already a full URL, extract the hostname
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
      }
      // If it doesn't have a protocol, treat it as a domain
      return url.replace('www.', '');
    } catch (e) {
      // If URL parsing fails, return as is
      return url;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-8">
        {/* Edit Profile Button - Top Right */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        
        {/* Profile Header Section - Avatar and Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Left Column - Avatar and Interests */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start">
            <div className="relative mb-4">
              <div className={`h-40 w-40 ${user.isBusiness ? 'rounded-lg' : 'rounded-full'} bg-muted flex items-center justify-center border-4 border-background shadow-xl`}>
                <Users className="h-20 w-20" />
              </div>
            </div>
            
            {/* Interests Section */}
            <div className="w-full mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Interests</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs"
                  onClick={() => setIsEditingInterests(!isEditingInterests)}
                >
                  {isEditingInterests ? "Done" : "Edit"}
                </Button>
              </div>
              
              {isEditingInterests ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {userInterests.map((interest) => {
                      return (
                        <span 
                          key={interest.id} 
                          className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs"
                        >
                          <span>{interest.name}</span>
                          <button 
                            onClick={() => handleRemoveInterest(interest.id)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                  {userInterests.length < 4 && (
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add interest..."
                        className="text-xs h-8 flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                      />
                      <Button 
                        size="sm" 
                        className="h-8"
                        onClick={handleAddInterest}
                        disabled={!newInterest.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    {4 - userInterests.length} interests remaining
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userInterests.map((interest) => {
                    return (
                      <span 
                        key={interest.id} 
                        className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs"
                      >
                        <span>{interest.name}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Profile Info */}
          <div className="md:w-2/3">
            <div className="flex flex-col">
              {/* Profile Info */}
              <div className="flex-1">
                {/* Followers and Following */}
                <div className="flex gap-4 mb-2 text-sm">
                  <span><span className="font-semibold">0</span> Followers</span>
                  <span><span className="font-semibold">0</span> Following</span>
                </div>
                
                {/* Name and Username */}
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{name}</h1>
                  {user.isBusiness && (
                    <div className="relative group">
                      <div className="h-6 w-6 text-yellow-500 hover:text-yellow-600 cursor-pointer">
                        <BadgeCheck className="h-6 w-6" />
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm rounded py-1 px-2 whitespace-nowrap z-50">
                        This account is verified because it's an official organization on Insearch
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                      </div>
                    </div>
                  )}
                  {user.isPremium && !user.isBusiness && (
                    <div className="relative group">
                      <div className="h-6 w-6 text-teal-500 hover:text-teal-600 cursor-pointer">
                        <BadgeCheck className="h-6 w-6" />
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm rounded py-1 px-2 whitespace-nowrap z-50">
                        This account is verified
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-3">@{username}</p>
                
                {/* Bio */}
                <p className="text-sm mb-4">{bio}</p>
                
                {/* Custom Link */}
                {customLink && (
                  <div className="mb-3">
                    <a 
                      href={customLink.startsWith('http') ? customLink : `https://${customLink}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-500 hover:underline flex items-center text-sm"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      {formatUrlForDisplay(customLink)}
                    </a>
                  </div>
                )}
                
                {/* Social Links */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Social Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {email && (
                      <a href={`mailto:${email}`} className="text-teal-500 hover:underline flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </a>
                    )}
                    {twitter && (
                      <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline flex items-center text-sm">
                        <Twitter className="w-4 h-4 mr-1" />
                        X
                      </a>
                    )}
                    {linkedin && (
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline flex items-center text-sm">
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    )}
                    {instagram && (
                      <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline flex items-center text-sm">
                        <Instagram className="w-4 h-4 mr-1" />
                        Instagram
                      </a>
                    )}
                    {youtube && (
                      <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline flex items-center text-sm">
                        <Youtube className="w-4 h-4 mr-1" />
                        YouTube
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit Profile Form - Hidden by default, shown when editing */}
        {isEditing && (
          <div className="mb-8 border border-muted rounded-lg">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Avatar Upload Section */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Avatar</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow">
                      <Users className="h-8 w-8" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Upload New Avatar</Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG, or GIF (max 5MB)</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">@Username</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    className="min-h-[120px]"
                  />
                </div>
                
                {/* Custom Link Section */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="customLink" className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Custom Link
                  </Label>
                  <Input 
                    id="customLink" 
                    value={customLink} 
                    onChange={(e) => setCustomLink(e.target.value)} 
                    placeholder="Enter a custom link (e.g., x.com)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center">
                    <Twitter className="w-4 h-4 mr-2" />
                    X (Twitter)
                  </Label>
                  <Input 
                    id="twitter" 
                    value={twitter} 
                    onChange={(e) => setTwitter(e.target.value)} 
                    placeholder="Enter Twitter URL"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Label>
                  <Input 
                    id="linkedin" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)} 
                    placeholder="Enter LinkedIn URL"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Label>
                  <Input 
                    id="instagram" 
                    value={instagram} 
                    onChange={(e) => setInstagram(e.target.value)} 
                    placeholder="Enter Instagram URL"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="youtube" className="flex items-center">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </Label>
                  <Input 
                    id="youtube" 
                    value={youtube} 
                    onChange={(e) => setYoutube(e.target.value)} 
                    placeholder="Enter YouTube URL"
                  />
                </div>
              </div>
              
              {/* Save and Cancel buttons */}
              <div className="flex gap-2 mt-6">
                <Button onClick={handleSaveChanges} className="flex-1">Save Changes</Button>
                <Button onClick={handleCancelEdit} variant="outline" className="flex-1">Cancel</Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "posts"
                ? "border-b-2 border-teal-500 text-teal-600"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "launches"
                ? "border-b-2 border-teal-500 text-teal-600"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("launches")}
          >
            Launches
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "products"
                ? "border-b-2 border-teal-500 text-teal-600"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          {/* Bookmarks tab only visible to admin */}
          {isAdminView && (
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "bookmarks"
                  ? "border-b-2 border-teal-500 text-teal-600"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("bookmarks")}
            >
              Bookmarks
            </button>
          )}
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="space-y-8">
              {userPosts.map((post, index) => (
                <div key={post.id} className="pb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Left column - author info, title and description */}
                    <div className="md:w-3/4">
                      {/* Author info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-8 w-8 ${user.isBusiness ? 'rounded-md' : 'rounded-full'} bg-gray-200 flex items-center justify-center`}>
                          <span className="text-xs font-medium text-gray-600">
                            {name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{name}</div>
                        </div>
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
                          author: name,
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
                  {index < userPosts.length - 1 && (
                    <div className="border-b border-muted mt-6"></div>
                  )}
                </div>
              ))}

            </div>
          )}
          
          {/* Launches Tab */}
          {activeTab === "launches" && (
            <div className="space-y-6">
              {launches.map((launch, index) => (
                <div key={launch.id}>
                  <div className="pb-6">
                    <h3 className="text-lg font-semibold mb-2">{launch.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{launch.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className={`font-medium ${
                        launch.status === "Launched" ? "text-green-600" : 
                        launch.status === "In Beta" ? "text-yellow-600" : 
                        launch.status === "In Development" ? "text-blue-600" : "text-gray-600"
                      }`}>
                        {launch.status}
                      </span>
                    </div>
                  </div>
                  {index < launches.length - 1 && (
                    <div className="border-b border-muted"></div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              {products.map((product, index) => (
                <div key={product.id}>
                  <div className="pb-6">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="font-medium">{product.price}</span>
                    </div>
                  </div>
                  {index < products.length - 1 && (
                    <div className="border-b border-muted"></div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Bookmarks Tab - Only visible to admin */}
          {activeTab === "bookmarks" && isAdminView && (
            <div>
              {bookmarks.length > 0 ? (
                <div className="space-y-6">
                  {bookmarks.map((bookmark, index) => (
                    <div key={bookmark.id}>
                      <div className="pb-6">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{bookmark.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{bookmark.source}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Date</span>
                          <span className="text-sm">{bookmark.date}</span>
                        </div>
                      </div>
                      {index < bookmarks.length - 1 && (
                        <div className="border-b border-muted"></div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No bookmarks yet.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}