"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Move, Square, Circle, Type } from "lucide-react";

interface Annotation {
  id: string;
  type: "rectangle" | "circle" | "text" | "arrow";
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
}

interface ImageAnnotationProps {
  imageUrl: string;
  onAnnotationsChange: (annotations: Annotation[]) => void;
}

export function ImageAnnotation({ imageUrl, onAnnotationsChange }: ImageAnnotationProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedTool, setSelectedTool] = useState<"rectangle" | "circle" | "text" | "arrow" | "move" | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Notify parent of annotation changes
  useEffect(() => {
    onAnnotationsChange(annotations);
  }, [annotations, onAnnotationsChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedTool || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPos({ x, y });
    setCurrentPos({ x, y });
    
    if (selectedTool === "move") {
      // Check if clicking on an existing annotation
      const clickedAnnotation = annotations.find(annotation => {
        if (annotation.type === "rectangle") {
          return (
            x >= annotation.x &&
            x <= annotation.x + (annotation.width || 0) &&
            y >= annotation.y &&
            y <= annotation.y + (annotation.height || 0)
          );
        }
        // Add other shape checks as needed
        return false;
      });
      
      if (clickedAnnotation) {
        setSelectedAnnotation(clickedAnnotation.id);
      }
      return;
    }
    
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentPos({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !selectedTool || !canvasRef.current) {
      setIsDrawing(false);
      return;
    }
    
    const width = Math.abs(currentPos.x - startPos.x);
    const height = Math.abs(currentPos.y - startPos.y);
    const x = Math.min(startPos.x, currentPos.x);
    const y = Math.min(startPos.y, currentPos.y);
    
    if (width > 5 && height > 5) {
      // For move tool, we don't create new annotations
      if (selectedTool !== "move" && selectedTool !== "arrow") {
        const newAnnotation: Annotation = {
          id: Math.random().toString(36).substr(2, 9),
          type: selectedTool as "rectangle" | "circle" | "text",
          x,
          y,
          width,
          height,
          color: "#3b82f6" // blue
        };
        
        if (selectedTool === "text") {
          setShowTextInput(true);
          setTextInput("");
          // We'll add the annotation after text input
        } else {
          setAnnotations(prev => [...prev, newAnnotation]);
        }
      }
    }
    
    setIsDrawing(false);
    setSelectedTool(null);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      const newAnnotation: Annotation = {
        id: Math.random().toString(36).substr(2, 9),
        type: "text",
        x: startPos.x,
        y: startPos.y,
        text: textInput,
        color: "#3b82f6"
      };
      
      setAnnotations(prev => [...prev, newAnnotation]);
    }
    
    setShowTextInput(false);
    setTextInput("");
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(ann => ann.id !== id));
    if (selectedAnnotation === id) {
      setSelectedAnnotation(null);
    }
  };

  const clearAllAnnotations = () => {
    setAnnotations([]);
    setSelectedAnnotation(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedTool === "rectangle" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTool("rectangle")}
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedTool === "circle" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTool("circle")}
        >
          <Circle className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedTool === "text" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTool("text")}
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          variant={selectedTool === "move" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTool("move")}
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearAllAnnotations}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        ref={canvasRef}
        className="relative border rounded-lg overflow-hidden cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          ref={imageRef}
          src={imageUrl} 
          alt="Annotation canvas" 
          className="w-full h-auto"
        />
        
        {/* Render existing annotations */}
        {annotations.map(annotation => (
          <div
            key={annotation.id}
            className={`absolute border-2 ${
              selectedAnnotation === annotation.id 
                ? "border-blue-500 bg-blue-500/20" 
                : "border-blue-400"
            }`}
            style={{
              left: annotation.x,
              top: annotation.y,
              width: annotation.width,
              height: annotation.height,
            }}
            onClick={() => setSelectedAnnotation(annotation.id)}
          >
            {annotation.type === "text" && (
              <div className="p-1 text-sm bg-white/80">
                {annotation.text}
              </div>
            )}
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                deleteAnnotation(annotation.id);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        
        {/* Render current drawing */}
        {isDrawing && selectedTool !== "text" && (
          <div
            className="absolute border-2 border-dashed border-blue-400 bg-blue-400/20"
            style={{
              left: Math.min(startPos.x, currentPos.x),
              top: Math.min(startPos.y, currentPos.y),
              width: Math.abs(currentPos.x - startPos.x),
              height: Math.abs(currentPos.y - startPos.y),
            }}
          />
        )}
      </div>
      
      {showTextInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter annotation text"
            className="flex-1 p-2 border rounded"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTextSubmit();
              if (e.key === "Escape") setShowTextInput(false);
            }}
          />
          <Button onClick={handleTextSubmit}>Add</Button>
          <Button variant="outline" onClick={() => setShowTextInput(false)}>Cancel</Button>
        </div>
      )}
      
      <div className="text-sm text-muted-foreground">
        {selectedTool 
          ? `Selected: ${selectedTool}. Click and drag on the image to annotate.` 
          : "Select a tool to start annotating."}
      </div>
    </div>
  );
}