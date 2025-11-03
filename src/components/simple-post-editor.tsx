"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Eye, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

interface SimplePostEditorProps {
  onSave: (title: string, content: string) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialContent?: string;
  placeholder?: string;
  titlePlaceholder?: string;
  saveButtonText?: string;
}

export function SimplePostEditor({
  onSave,
  onCancel,
  initialTitle = "",
  initialContent = "",
  placeholder = "What's on your mind?",
  titlePlaceholder = "Title (optional)",
  saveButtonText = "Publish"
}: SimplePostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave(title, content);
  };

  const handleInsertLink = () => {
    if (!linkUrl) return;
    
    const textarea = document.getElementById("simple-post-content") as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const linkText = selectedText || "link text";
    const formattedText = `[${linkText}](${linkUrl})`;
    
    const newContent = 
      content.substring(0, start) + 
      formattedText + 
      content.substring(end);
    
    setContent(newContent);
    setLinkUrl("");
    setShowLinkInput(false);
    
    // Set cursor position after the formatted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Create Post</div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
          {onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button size="sm" onClick={handleSave}>
            {saveButtonText}
          </Button>
        </div>
      </div>

      {isPreview ? (
        <div className="border rounded-lg p-4 min-h-[200px]">
          {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
          <div className="prose max-w-none">
            {content ? (
              <div className="whitespace-pre-wrap">
                {content.split('\n').map((line, i) => {
                  if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="mb-3">{line}</p>;
                  }
                })}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Nothing to preview</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            placeholder={titlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg py-3"
          />
          
          <div className="relative">
            <Textarea
              id="simple-post-content"
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] text-base p-4 resize-none"
            />
            
            {/* Floating toolbar */}
            <div className="absolute bottom-3 right-3 flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const fileInput = document.createElement('input');
                  fileInput.type = 'file';
                  fileInput.accept = 'image/*';
                  fileInput.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      // In a real app, you would upload the file and insert a URL
                      alert('In a full implementation, this would upload and insert an image.');
                    }
                  };
                  fileInput.click();
                }}
                title="Insert Image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowLinkInput(true)}
                title="Insert Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Link input popup */}
            {showLinkInput && (
              <div className="absolute bottom-12 right-0 bg-background border rounded-lg shadow-lg p-2 w-80">
                <div className="flex gap-2">
                  <Input
                    ref={linkInputRef}
                    type="url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="flex-1 h-8 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleInsertLink();
                      } else if (e.key === "Escape") {
                        setShowLinkInput(false);
                        setLinkUrl("");
                      }
                    }}
                    autoFocus
                  />
                  <Button size="sm" className="h-8" onClick={handleInsertLink}>
                    Add
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8"
                    onClick={() => {
                      setShowLinkInput(false);
                      setLinkUrl("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{content.length} characters</span>
          </div>
        </div>
      )}
    </div>
  );
}