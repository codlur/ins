"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
        <div className="flex items-center space-x-2">
          <Button>New Document</Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={item}>
            <div className="pb-6">
              <h3 className="text-lg font-semibold mb-2">Document {item}</h3>
              <p className="text-sm text-muted-foreground mb-4">Created on October {item}, 2025</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">PDF</span>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
            {index < 5 && (
              <div className="border-b border-muted"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}