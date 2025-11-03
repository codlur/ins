"use client";

import { Editor } from "@/components/ui/editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EditorTestPage() {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");

  const handleSave = (content: any) => {
    console.log("Auto-saved content:", content);
    setSavedContent(JSON.stringify(content, null, 2));
  };

  const handleChange = (content: any) => {
    setContent(JSON.stringify(content, null, 2));
  };

  const handleManualSave = () => {
    console.log("Manually saved content");
    setSavedContent(content);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Rich Text Editor Test</h1>
        <p className="text-muted-foreground mt-2">
          Test the rich text editor functionality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Editor</h2>
            <Button onClick={handleManualSave}>Save Content</Button>
          </div>
          <Editor
            content=""
            onSave={handleSave}
            onChange={handleChange}
            placeholder="Start typing here... Try typing ## for a heading, or * for a list."
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Content</h2>
          <pre className="bg-muted p-4 rounded-lg max-h-96 overflow-auto text-xs">
            {content || "No content yet"}
          </pre>

          <h2 className="text-xl font-semibold">Saved Content</h2>
          <pre className="bg-muted p-4 rounded-lg max-h-96 overflow-auto text-xs">
            {savedContent || "No content saved yet"}
          </pre>
        </div>
      </div>
    </div>
  );
}