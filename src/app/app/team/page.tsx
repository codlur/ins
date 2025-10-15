"use client";

import { Button } from "@/components/ui/button";
import { Users, PlusCircle } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={item}>
            <div className="pb-6">
              <h3 className="text-lg font-semibold mb-2">Team Member {item}</h3>
              <p className="text-sm text-muted-foreground mb-4">Role and position</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mr-3">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Member Name</p>
                    <p className="text-xs text-muted-foreground">member@example.com</p>
                  </div>
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