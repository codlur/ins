"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Image as ImageIcon,
  Video,
  Upload,
  X
} from "lucide-react";
import { MediaUpload } from "@/components/media-upload";

interface BlogPostEditorProps {
  onSave: (title: string, content: string) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialContent?: string;
  placeholder?: string;
  titlePlaceholder?: string;
  saveButtonText?: string;
}

export function BlogPostEditor({
  onSave,
  onCancel,
  initialTitle = "",
  initialContent = "",
  placeholder = "Write your post content here...",
  titlePlaceholder = "Post title",
  saveButtonText = "Publish"
}: BlogPostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 10000;

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const handleSave = () => {
    onSave(title, content);
  };

  const insertImage = () => {
    setMediaType('image');
    setShowMediaUpload(true);
  };

  const insertVideo = () => {
    setMediaType('video');
    setShowMediaUpload(true);
  };

  const handleMediaUpload = (url: string, type: 'image' | 'video') => {
    const formattedText = type === 'image' 
      ? `\n![Image](${url})\n`
      : `\n@[video](${url})\n`;
    insertAtCursor(formattedText);
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
      <div className="my-4 p-4">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-500 hover:underline break-all"
        >
          {url}
        </a>
      </div>
    );
  };

  const charCountColor = charCount > maxChars * 0.9 ? 
    (charCount > maxChars ? "text-red-500" : "text-yellow-500") : 
    "text-muted-foreground";

  return (
    <div className="max-w-4xl mx-auto">
      {showMediaUpload && (
        <MediaUpload 
          onMediaUpload={handleMediaUpload}
          onClose={() => setShowMediaUpload(false)}
        />
      )}
      
      {/* Header with actions */}
      <div className="flex justify-between items-center py-4">
        <div></div>
        <div className="flex gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
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

      <div className="py-4">
        {isPreview ? (
          // Preview mode - simple rendering without formatting
          <div className="py-2">
            {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
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
                      return <hr key={i} className="my-6 border-t border-gray-300 dark:border-zinc-700" />;
                    }
                    
                    // Simple paragraph rendering without formatting
                    if (line.trim() === '') {
                      return <br key={i} />;
                    } else {
                      return <p key={i} className="my-3">{line}</p>;
                    }
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-zinc-500 italic">Nothing to preview</p>
              )}
            </div>
          </div>
        ) : (
          // Edit mode - simple textarea with media insertion
          <div className="space-y-4">
            <input
              type="text"
              placeholder={titlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-bold border-none outline-none placeholder-gray-500 bg-transparent"
            />
            
            {/* Media toolbar */}
            <div className="flex flex-wrap gap-1 p-2 rounded-lg">
              <button
                onClick={insertImage}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
                title="Insert image"
              >
                <ImageIcon className="h-4 w-4" />
              </button>
              <button
                onClick={insertVideo}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
                title="Insert video"
              >
                <Video className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowMediaUpload(true)}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
                title="Upload media"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
            
            <div className="relative">
              <textarea
                ref={textareaRef}
                placeholder={placeholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[400px] text-base outline-none placeholder-gray-500 bg-transparent resize-none font-mono border border-gray-200 dark:border-zinc-700 rounded-lg p-4"
              />
            </div>
            
            {/* Media preview area */}
            <div className="min-h-[50px]">
              {/* This would show image/video previews in a real implementation */}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with character counter and preview toggle */}
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <span className={`text-sm ${charCountColor}`}>
            {charCount}/{maxChars}
          </span>
        </div>
        
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="text-sm text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-500 transition-colors"
        >
          {isPreview ? "Back to edit" : "Preview"}
        </button>
      </div>
    </div>
  );
}