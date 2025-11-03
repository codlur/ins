"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Image as ImageIcon,
  Video
} from "lucide-react";

interface CleanPostEditorProps {
  onSave: (title: string, content: string) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialContent?: string;
  placeholder?: string;
  titlePlaceholder?: string;
  saveButtonText?: string;
}

export function CleanPostEditor({
  onSave,
  onCancel,
  initialTitle = "",
  initialContent = "",
  placeholder = "What's on your mind?",
  titlePlaceholder = "Title (optional)",
  saveButtonText = "Publish"
}: CleanPostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    onSave(title, content);
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      const formattedText = `\n![Image](${url})\n`;
      
      if (!textareaRef.current) return;
      
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newContent = 
        content.substring(0, start) + 
        formattedText + 
        content.substring(end);
      
      setContent(newContent);
      
      // Position cursor after the image
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(start + formattedText.length, start + formattedText.length);
        }
      }, 0);
    }
  };

  const insertVideo = () => {
    const url = prompt("Enter video URL (YouTube, Vimeo, etc.):");
    if (url) {
      const formattedText = `\n@[video](${url})\n`;
      
      if (!textareaRef.current) return;
      
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newContent = 
        content.substring(0, start) + 
        formattedText + 
        content.substring(end);
      
      setContent(newContent);
      
      // Position cursor after the video
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(start + formattedText.length, start + formattedText.length);
        }
      }, 0);
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">New Post</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
          >
            Preview
          </button>
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
            className="px-4 py-1.5 text-sm bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity"
          >
            {saveButtonText}
          </button>
        </div>
      </div>

      {isPreview ? (
        // Preview mode
        <div className="border-t border-b border-gray-200 dark:border-gray-800 py-8">
          {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
          <div className="prose prose-lg max-w-none dark:prose-invert">
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
                    return <hr key={i} className="my-4 border-t border-gray-300 dark:border-gray-700" />;
                  }
                  
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{line.substring(4)}</h3>;
                  } else if (line.startsWith('#### ')) {
                    return <h4 key={i} className="text-base font-bold mt-3 mb-2">{line.substring(5)}</h4>;
                  } else if (line.startsWith('##### ')) {
                    return <h5 key={i} className="text-sm font-bold mt-3 mb-2">{line.substring(6)}</h5>;
                  } else if (line.startsWith('###### ')) {
                    return <h6 key={i} className="text-xs font-bold mt-3 mb-2">{line.substring(7)}</h6>;
                  } else if (line.startsWith('> ')) {
                    return <blockquote key={i} className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 text-gray-600 dark:text-gray-400">{line.substring(2)}</blockquote>;
                  } else if (line.match(/^\d+\./)) {
                    return <li key={i} className="list-decimal ml-6 my-1">{line.replace(/^\d+\.\s*/, '')}</li>;
                  } else if (line.startsWith('- ')) {
                    return <li key={i} className="list-disc ml-6 my-1">{line.substring(2)}</li>;
                  } else if (line.startsWith('* ')) {
                    return <li key={i} className="list-disc ml-6 my-1">{line.substring(2)}</li>;
                  } else if (line.startsWith('```')) {
                    return <pre key={i} className="bg-gray-100 dark:bg-gray-900 p-4 rounded my-4"><code>{line.substring(3)}</code></pre>;
                  } else if (line.startsWith('`') && line.endsWith('`') && line.length > 2) {
                    // Handle inline code
                    const codeContent = line.substring(1, line.length - 1);
                    return <code key={i} className="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">{codeContent}</code>;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    // Handle inline formatting
                    let processedLine = line;
                    
                    // Handle bold (**text**)
                    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    
                    // Handle italic (*text*)
                    processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    
                    // Handle underline (__text__)
                    processedLine = processedLine.replace(/__(.*?)__/g, '<u>$1</u>');
                    
                    // Handle inline code (`text`)
                    processedLine = processedLine.replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
                    
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
                      
                      return <p key={i} className="my-3">{parts}</p>;
                    }
                    
                    return <p key={i} className="my-3" dangerouslySetInnerHTML={{ __html: processedLine }} />;
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
            className="w-full text-2xl font-bold border-none outline-none placeholder-gray-400 bg-transparent"
          />
          
          {/* Simplified Formatting toolbar with only image and video */}
          <div className="flex flex-wrap gap-1 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <button
              onClick={insertImage}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
              title="Image"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <button
              onClick={insertVideo}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
              title="Video"
            >
              <Video className="h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            <textarea
              ref={textareaRef}
              id="clean-post-content"
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[400px] text-lg border border-gray-200 dark:border-gray-800 rounded-lg p-4 outline-none placeholder-gray-400 bg-transparent resize-none"
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-500">
            <span>{content.length} characters</span>
          </div>
        </div>
      )}
    </div>
  );
}