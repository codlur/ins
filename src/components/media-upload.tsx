"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Video, Upload, X } from "lucide-react";

interface MediaUploadProps {
  onMediaUpload: (url: string, type: 'image' | 'video') => void;
  onClose: () => void;
}

export function MediaUpload({ onMediaUpload, onClose }: MediaUploadProps) {
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (!mediaUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }
    
    // Determine media type from URL
    const lowerUrl = mediaUrl.toLowerCase();
    const type = lowerUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i) ? 'image' : 'video';
    
    onMediaUpload(mediaUrl, type);
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      setError('Please select a valid image or video file');
      return;
    }
    
    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    try {
      // In a real implementation, this would upload to a server
      // For now, we'll create a local object URL
      const url = URL.createObjectURL(file);
      const type = isImage ? 'image' : 'video';
      
      onMediaUpload(url, type);
      onClose();
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4">
          <h3 className="font-semibold">Add Media</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex rounded-lg bg-gray-100 dark:bg-zinc-800 p-1 mb-4">
            <button
              onClick={() => setUploadMethod('url')}
              className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                uploadMethod === 'url' 
                  ? 'bg-white dark:bg-zinc-700 shadow' 
                  : 'hover:bg-gray-200 dark:hover:bg-zinc-700'
              }`}
            >
              From URL
            </button>
            <button
              onClick={() => setUploadMethod('file')}
              className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                uploadMethod === 'file' 
                  ? 'bg-white dark:bg-zinc-700 shadow' 
                  : 'hover:bg-gray-200 dark:hover:bg-zinc-700'
              }`}
            >
              Upload File
            </button>
          </div>
          
          {uploadMethod === 'url' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Media URL</label>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 outline-none bg-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUrlSubmit}
                  className="flex-1 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add Media
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div 
                onClick={triggerFileInput}
                className="p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Click to upload an image or video
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Max file size: 50MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              {isUploading && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-zinc-500"></div>
                  <p className="text-sm mt-2">Uploading...</p>
                </div>
              )}
              
              <button
                onClick={onClose}
                className="w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}