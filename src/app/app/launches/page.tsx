"use client";

import { Button } from "@/components/ui/button";
import { Rocket, Calendar, Users, TrendingUp } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";

export default function LaunchesPage() {
  // Mock launch data
  const launches = [
    { 
      id: "1", 
      name: "Project Alpha Launch", 
      description: "Launch of our flagship AI product", 
      date: "2025-10-15" 
    },
    { 
      id: "2", 
      name: "Beta Release", 
      description: "Public beta release of our platform", 
      date: "2025-11-01" 
    },
    { 
      id: "3", 
      name: "Mobile App Launch", 
      description: "Release of our mobile application", 
      date: "2025-12-10" 
    },
    { 
      id: "4", 
      name: "API v2 Release", 
      description: "Next generation API with enhanced features", 
      date: "2026-01-20" 
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Button>
            <Rocket className="mr-2 h-4 w-4" />
            New Launch
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Launches</h3>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground pt-1">+3 from last month</p>
          </div>
        </div>
        
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Active Projects</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground pt-1">+2 in progress</p>
          </div>
        </div>
        
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground pt-1">+5 new members</p>
          </div>
        </div>
        
        <div className="pb-4 border-b border-muted">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Next Deadline</h3>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="pt-2">
            <div className="text-2xl font-bold">14 days</div>
            <p className="text-xs text-muted-foreground pt-1">Project Alpha</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div>
          <div className="pb-4 border-b border-muted mb-4">
            <h3 className="text-lg font-semibold">Recent Launches</h3>
            <p className="text-sm text-muted-foreground">Latest project launches and updates</p>
          </div>
          <div>
            <div className="space-y-8">
              {launches.map((launch, index) => (
                <div key={launch.id}>
                  <div className="flex items-center justify-between p-4" key={launch.id}>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-4">
                        <Rocket className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{launch.name}</p>
                        <p className="text-xs text-muted-foreground">Launched on {launch.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookmarkButton 
                        item={{
                          type: 'launch',
                          id: launch.id,
                          name: launch.name,
                          description: launch.description,
                          date: launch.date
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-muted flex-shrink-0"
                      />
                      <span className="text-sm font-medium">Active</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  {index < launches.length - 1 && (
                    <div className="border-b border-muted mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}