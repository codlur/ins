import { useState } from "react";
import { MessageCircle, Heart, Share, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserPostCardProps {
  post: {
    $id: string;
    title: string;
    content: string;
    userName: string;
    createdAt: string;
    isThread?: boolean;
  };
}

export function UserPostCard({ post }: UserPostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 1);
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Function to convert video URLs to embed URLs
  const convertToEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      
      // YouTube URL conversion
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        if (urlObj.hostname.includes('youtu.be')) {
          // Convert youtu.be/VIDEO_ID to youtube.com/embed/VIDEO_ID
          const videoId = urlObj.pathname.substring(1);
          return `https://www.youtube.com/embed/${videoId}`;
        } else if (urlObj.pathname.includes('/watch')) {
          // Convert youtube.com/watch?v=VIDEO_ID to youtube.com/embed/VIDEO_ID
          const videoId = urlObj.searchParams.get('v');
          if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
          }
        }
      }
      
      // Vimeo URL conversion
      if (urlObj.hostname.includes('vimeo.com')) {
        const videoId = urlObj.pathname.substring(1);
        return `https://player.vimeo.com/video/${videoId}`;
      }
      
      // Return original URL if no conversion is needed
      return url;
    } catch (e) {
      // Return original URL if it's not a valid URL
      return url;
    }
  };

  // Function to render video embeds
  const renderVideoEmbed = (url: string) => {
    const embedUrl = convertToEmbedUrl(url);
    return (
      <div className="relative pt-[56.25%] my-2 rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded Video"
        ></iframe>
      </div>
    );
  };

  // Function to render content with markdown-like formatting
  const renderContent = (content: string) => {
    // Split content into lines
    const lines = content.split('\n');
    const elements = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle video embeds
      if (line.startsWith('@[video](') && line.endsWith(')')) {
        const url = line.substring(9, line.length - 1);
        elements.push(<div key={i}>{renderVideoEmbed(url)}</div>);
        continue;
      }
      
      // Handle images
      if (line.includes('![') && line.includes('](') && line.includes(')')) {
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        let match;
        let lastIndex = 0;
        const lineElements = [];
        
        while ((match = imageRegex.exec(line)) !== null) {
          // Add text before the image
          if (match.index > lastIndex) {
            lineElements.push(line.substring(lastIndex, match.index));
          }
          
          // Add the image
          lineElements.push(
            <img 
              key={`${i}-${match.index}`} 
              src={match[2]} 
              alt={match[1] || "Image"} 
              className="max-w-full h-auto my-2 rounded-lg"
            />
          );
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text after the last image
        if (lastIndex < line.length) {
          lineElements.push(line.substring(lastIndex));
        }
        
        elements.push(<p key={i} className="my-2">{lineElements}</p>);
        continue;
      }
      
      // Handle horizontal rules
      if (line.trim() === '---') {
        elements.push(<hr key={i} className="my-3 border-t border-gray-300 dark:border-gray-700" />);
        continue;
      }
      
      // Handle headings
      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-lg font-bold mt-4 mb-2">{line.substring(2)}</h1>);
        continue;
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="font-bold mt-3 mb-2">{line.substring(3)}</h2>);
        continue;
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="font-semibold mt-2 mb-1">{line.substring(4)}</h3>);
        continue;
      } else if (line.startsWith('> ')) {
        elements.push(<blockquote key={i} className="border-l-2 border-gray-300 dark:border-gray-700 pl-3 my-2 text-gray-600 dark:text-gray-400">{line.substring(2)}</blockquote>);
        continue;
      } else if (line.trim() === '') {
        elements.push(<br key={i} />);
        continue;
      }
      
      // Handle inline formatting
      let processedLine = line;
      
      // Handle bold (**text**)
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Handle italic (*text*)
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Handle links ([text](url))
      processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      elements.push(<p key={i} className="my-2" dangerouslySetInnerHTML={{ __html: processedLine }} />);
    }
    
    return elements;
  };

  // Truncate content for preview but preserve formatting
  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="rounded-lg border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
        <div>
          <h4 className="font-semibold">{post.userName}</h4>
          <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <div className="text-muted-foreground">
          {renderContent(truncateContent(post.content))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-xs">{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{Math.floor(Math.random() * 20)}</span>
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}