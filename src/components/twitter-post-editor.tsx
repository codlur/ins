"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Image as ImageIcon,
  Video,
  Smile,
  Calendar,
  MapPin,
  BarChart3,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TwitterPostEditorProps {
  onSave: (title: string, content: string) => void;
  onCancel?: () => void;
  onAddThreadPost?: () => void;
  initialTitle?: string;
  initialContent?: string;
  placeholder?: string;
  titlePlaceholder?: string;
  saveButtonText?: string;
  isThread?: boolean;
  showAddButton?: boolean;
}

export function TwitterPostEditor({
  onSave,
  onCancel,
  onAddThreadPost,
  initialTitle = "",
  initialContent = "",
  placeholder = "What's happening?",
  titlePlaceholder = "Add a title...",
  saveButtonText = "Post",
  isThread = false,
  showAddButton = false
}: TwitterPostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 280;

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleSave = () => {
    onSave(title, content);
  };

  const insertEmoji = () => {
    // In a real implementation, this would open an emoji picker
    const emoji = "😊";
    insertAtCursor(emoji);
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const formattedText = `\n![Image](${url})\n`;
      insertAtCursor(formattedText);
    }
  };

  const insertVideo = () => {
    const url = prompt("Enter video URL (YouTube, Vimeo, etc.):");
    if (url) {
      const formattedText = `\n@[video](${url})\n`;
      insertAtCursor(formattedText);
    }
  };

  const insertAtCursor = (text: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newContent = 
      content.substring(0, start) + 
      text + 
      content.substring(end);
    
    setContent(newContent);
    
    // Position cursor after the inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + text.length, start + text.length);
      }
    }, 0);
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

  // Function to render video embeds in preview mode
  const renderVideoEmbed = (url: string) => {
    const embedUrl = convertToEmbedUrl(url);
    return (
      <div className="relative pt-[56.25%] my-4 rounded-lg overflow-hidden">
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

  // Function to render generic embeds in preview mode
  const renderGenericEmbed = (url: string) => {
    return (
      <div className="my-4">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Embedded content: {url}
        </a>
      </div>
    );
  };

  const charCountColor = charCount > maxChars * 0.9 ? 
    (charCount > maxChars ? "text-red-500" : "text-yellow-500") : 
    "text-muted-foreground";

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">{isThread ? "New Thread" : "New Post"}</h1>
        <div className="flex gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={charCount > maxChars || (!title.trim() && !content.trim())}
            className="px-4 py-1.5 text-sm bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saveButtonText}
          </button>
        </div>
      </div>
      
      {showAddButton && (
        <div className="flex items-center mb-2">
          <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <button
            onClick={onAddThreadPost}
            className="mx-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Add to thread"
          >
            <span className="text-lg font-bold">+</span>
          </button>
          <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      )}

      <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        {isPreview ? (
          // Preview mode
          <div className="py-2">
            {title && <h2 className="text-xl font-bold mb-3">{title}</h2>}
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {content ? (
                <div className="whitespace-pre-wrap">
                  {content.split('\n').map((line, i) => {
                    // Handle video embeds
                    if (line.startsWith('@[video](') && line.endsWith(')')) {
                      const url = line.substring(9, line.length - 1);
                      return <div key={i}>{renderVideoEmbed(url)}</div>;
                    }
                    
                    // Handle generic embeds
                    if (line.startsWith('@[embed](') && line.endsWith(')')) {
                      const url = line.substring(9, line.length - 1);
                      return <div key={i}>{renderGenericEmbed(url)}</div>;
                    }
                    
                    // Handle horizontal rules
                    if (line.trim() === '---') {
                      return <hr key={i} className="my-3 border-t border-gray-300 dark:border-gray-700" />;
                    }
                    
                    if (line.startsWith('# ')) {
                      return <h1 key={i} className="text-lg font-bold mt-4 mb-3">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={i} className="text-base font-bold mt-3 mb-2">{line.substring(3)}</h2>;
                    } else if (line.startsWith('### ')) {
                      return <h3 key={i} className="font-bold mt-3 mb-2">{line.substring(4)}</h3>;
                    } else if (line.startsWith('> ')) {
                      return <blockquote key={i} className="border-l-2 border-gray-300 dark:border-gray-700 pl-3 my-3 text-gray-600 dark:text-gray-400">{line.substring(2)}</blockquote>;
                    } else if (line.trim() === '') {
                      return <br key={i} />;
                    } else {
                      // Handle inline formatting
                      let processedLine = line;
                      
                      // Handle bold (**text**)
                      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      
                      // Handle italic (*text*)
                      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
                      
                      // Handle links ([text](url))
                      processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
                      
                      // Handle inline images
                      if (processedLine.includes('![') && processedLine.includes('](') && processedLine.includes(')')) {
                        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
                        const parts = [];
                        let lastIndex = 0;
                        let match;
                        
                        while ((match = imageRegex.exec(processedLine)) !== null) {
                          // Add text before the image
                          if (match.index > lastIndex) {
                            parts.push(<span key={`${i}-${lastIndex}`} dangerouslySetInnerHTML={{ __html: processedLine.substring(lastIndex, match.index) }} />);
                          }
                          
                          // Add the image
                          parts.push(
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
                        if (lastIndex < processedLine.length) {
                          parts.push(<span key={`${i}-${lastIndex}`} dangerouslySetInnerHTML={{ __html: processedLine.substring(lastIndex) }} />);
                        }
                        
                        return <p key={i} className="my-2">{parts}</p>;
                      }
                      
                      return <p key={i} className="my-2" dangerouslySetInnerHTML={{ __html: processedLine }} />;
                    }
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-500 italic">Nothing to preview</p>
              )}
            </div>
          </div>
        ) : (
          // Edit mode
          <div className="space-y-3">
            {isThread && (
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            )}
            
            <div className="flex gap-3">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0" />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={titlePlaceholder}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-lg font-bold border-none outline-none placeholder-gray-500 bg-transparent mb-2"
                />
                
                <textarea
                  ref={textareaRef}
                  placeholder={placeholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[100px] text-lg border-none outline-none placeholder-gray-500 bg-transparent resize-none"
                  rows={Math.max(3, content.split('\n').length)}
                />
                
                {/* Media preview area */}
                <div className="mt-3 min-h-[50px]">
                  {/* This would show image/video previews in a real implementation */}
                </div>
              </div>
            </div>
            
            {/* Character counter */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={insertImage}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Media"
                >
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                </button>
                <button
                  onClick={insertVideo}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Video"
                >
                  <Video className="h-5 w-5 text-blue-500" />
                </button>
                <button
                  onClick={insertEmoji}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Emoji"
                >
                  <Smile className="h-5 w-5 text-blue-500" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" title="Schedule">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" title="Location">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" title="Poll">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className={`text-sm ${charCountColor}`}>
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Preview toggle */}
      <div className="flex justify-center mt-3">
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isPreview ? "Back to edit" : "Preview"}
        </button>
      </div>
    </div>
  );
}