"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Image as ImageIcon,
  Video,
  Coffee,
  Heart,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuyMeACoffeePostEditorProps {
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

export function BuyMeACoffeePostEditor({
  onSave,
  onCancel,
  onAddThreadPost,
  initialTitle = "",
  initialContent = "",
  placeholder = "Share your thoughts, ideas, or updates...",
  titlePlaceholder = "Add a title...",
  saveButtonText = "Post",
  isThread = false,
  showAddButton = false
}: BuyMeACoffeePostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleSave = () => {
    onSave(title, content);
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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        {/* Header with actions */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Coffee className="h-5 w-5 text-amber-600" />
            {isThread ? "New Thread" : "New Post"}
          </h1>
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
              className="px-4 py-1.5 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {saveButtonText}
            </button>
          </div>
        </div>

        {showAddButton && (
          <div className="flex items-center my-2 px-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
            <button
              onClick={onAddThreadPost}
              className="mx-2 p-1 rounded-full bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
              title="Add to thread"
            >
              <span className="text-lg font-bold text-amber-700 dark:text-amber-300">+</span>
            </button>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>
        )}

        <div className="p-4">
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
                        return <blockquote key={i} className="border-l-2 border-amber-500 dark:border-amber-400 pl-3 my-3 text-gray-600 dark:text-gray-400">{line.substring(2)}</blockquote>;
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
                        processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
                        
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
            <div className="space-y-4">
              <input
                type="text"
                placeholder={titlePlaceholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-lg font-bold border-none outline-none placeholder-gray-500 bg-transparent"
              />
              
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  placeholder={placeholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[150px] text-base border border-gray-200 dark:border-gray-800 rounded-lg p-3 outline-none placeholder-gray-500 bg-transparent resize-none"
                  rows={Math.max(5, content.split('\n').length)}
                />
              </div>
              
              {/* Media preview area */}
              <div className="min-h-[50px]">
                {/* This would show image/video previews in a real implementation */}
              </div>
              
              {/* Formatting toolbar */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={insertImage}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Insert image"
                >
                  <ImageIcon className="h-5 w-5 text-amber-600" />
                </button>
                <button
                  onClick={insertVideo}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Insert video"
                >
                  <Video className="h-5 w-5 text-amber-600" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer with character counter and preview toggle */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className={`text-sm ${charCountColor}`}>
              {charCount}/{maxChars}
            </span>
          </div>
          
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="text-sm text-amber-600 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
          >
            {isPreview ? "Back to edit" : "Preview"}
          </button>
        </div>
      </div>
    </div>
  );
}