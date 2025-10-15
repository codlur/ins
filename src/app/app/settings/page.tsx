"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Button>Save Changes</Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="pb-4 border-b border-muted mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </h2>
            <p className="text-sm text-muted-foreground">Configure how you receive notifications</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        <div className="border-b border-muted"></div>
        
        <div>
          <div className="pb-4 border-b border-muted mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Appearance
            </h2>
            <p className="text-sm text-muted-foreground">Customize the look and feel of the application</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Enable dark theme for the application</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input id="language" defaultValue="English" />
            </div>
          </div>
        </div>
        
        <div className="border-b border-muted"></div>
        
        <div>
          <div className="pb-4 border-b border-muted mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Security
            </h2>
            <p className="text-sm text-muted-foreground">Manage your security settings and preferences</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Current Password</Label>
              <Input id="password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <Button>Update Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
}