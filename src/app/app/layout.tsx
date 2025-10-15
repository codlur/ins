"use client";

import { useState, createContext, useContext } from "react";
import { 
  Home as HomeIcon,
  Rss, 
  BarChart3 as AnalyticsIcon, 
  Users, 
  Scan, 
  Bell, 
  Search,
  Menu,
  X,
  Rocket,
  MessageCircle,
  Plus,
  PanelLeft,
  Star,
  Bookmark,
  BadgeCheck,
  Pencil,
  RocketIcon,
  Package,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { useIsClient } from "@/hooks/use-is-client";
import { PremiumRedirect } from "@/components/premium-redirect";
// Add dropdown menu components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Create context for admin view state
const AdminViewContext = createContext({
  isAdminView: true,
  setIsAdminView: (value: boolean) => {}
});

export const useAdminView = () => useContext(AdminViewContext);

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = useIsClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Collapsed by default
  const [isAdminView, setIsAdminView] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, setUser } = useUser();

  const navItems = [
    { name: "Home", icon: HomeIcon, href: "/app/home" },
    { name: "Search", icon: Search, href: "/app/search" },
    { name: "Chat", icon: MessageCircle, href: "/app/discover" },
    { name: "News", icon: Rss, href: "/app/news" },
    { name: "Products", icon: Star, href: "/app/products" },
    { name: "Launches", icon: Rocket, href: "/app/launches" },
    { name: "Bookmarks", icon: Bookmark, href: "/app/bookmarks" },
    { name: "Premium", icon: BadgeCheck, href: "/app/premium-sign-up" }, // Default to sign-up page
    { name: "Profile", icon: Users, href: "/app/profile" },
  ];

  // Get the current tab name based on the pathname
  const getCurrentTabName = () => {
    // Check if we're on the create page
    if (pathname?.startsWith('/app/create')) {
      return "Create New Post";
    }
    
    const currentItem = navItems.find(item => item.href === pathname);
    return currentItem ? currentItem.name : "Insearch";
  };

  // Don't render anything on server to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <AdminViewContext.Provider value={{ isAdminView, setIsAdminView }}>
      <div className="flex min-h-screen bg-background">
        {/* Mobile sidebar toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-40 bg-background border-r transition-all duration-300 ease-in-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${sidebarCollapsed ? "w-16" : "w-64"}`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b justify-center px-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/favicon-light.png" 
                    alt="Insearch Favicon" 
                    className="absolute w-8 h-8 transition-opacity duration-300 ease-in-out opacity-0 dark:opacity-100" 
                  />
                  <img 
                    src="/favicon-dark.png" 
                    alt="Insearch Favicon" 
                    className="absolute w-8 h-8 transition-opacity duration-300 ease-in-out opacity-100 dark:opacity-0" 
                  />
                  <img 
                    src="/favicon-teal.png" 
                    alt="Insearch Favicon" 
                    className="absolute w-8 h-8 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" 
                  />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-light">Insearch</span>
                    <span className="text-xs bg-teal-500 text-white px-1.5 py-0.5 rounded">beta</span>
                  </div>
                )}
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.name === "Premium" ? (
                      <PremiumRedirect sidebarCollapsed={sidebarCollapsed} />
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          pathname === item.href 
                            ? "bg-accent text-accent-foreground" 
                            : "opacity-70 hover:opacity-100"
                        } ${sidebarCollapsed ? "justify-center" : "gap-3"}`}
                      >
                        <item.icon className="h-4 w-4" />
                        {!sidebarCollapsed && item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Collapse/Expand button - now positioned inside sidebar below tabs */}
            <div className="px-2 mb-2">
              <Button
                variant="ghost"
                className={`w-full flex items-center justify-center gap-2 ${
                  sidebarCollapsed ? "px-2" : "px-3"
                }`}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <PanelLeft className="h-4 w-4" />
                {!sidebarCollapsed && <span>Collapse</span>}
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </div>
            
            {/* Create button with dropdown menu */}
            <div className="p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className={`w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center gap-2 ${
                    sidebarCollapsed ? "px-2" : ""
                  }`}>
                    <Plus className="h-4 w-4" />
                    {!sidebarCollapsed && "Create"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/app/create/post" className="flex items-center gap-2">
                      <Pencil className="h-4 w-4" />
                      <span>Post</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.isPremium && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/app/create/launch" className="flex items-center gap-2">
                          <RocketIcon className="h-4 w-4" />
                          <span>Launch</span>
                        </Link>
                      </DropdownMenuItem>
                      {user.isBusiness && (
                        <DropdownMenuItem asChild>
                          <Link href="/app/create/product" className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>Product</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* User menu with menu icon */}
            <div className="p-4 border-t relative">
              <Button
                variant="ghost"
                className={`w-full flex items-center justify-between px-2 py-2 h-auto ${
                  sidebarCollapsed ? "justify-center px-2" : ""
                }`}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 ${user.isBusiness ? 'rounded-md' : 'rounded-full'} bg-muted flex items-center justify-center`}>
                    <span className="text-xs font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {!sidebarCollapsed && (
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{user.name}</span>
                        {user.isBusiness && (
                          <div className="relative group">
                            <div className="h-5 w-5 text-yellow-500 hover:text-yellow-600 cursor-pointer">
                              <BadgeCheck className="h-5 w-5" />
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                              This account is verified because it's an official organization on Insearch
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                            </div>
                          </div>
                        )}
                        {user.isPremium && !user.isBusiness && (
                          <div className="relative group">
                            <div className="h-5 w-5 text-teal-500 hover:text-teal-600 cursor-pointer">
                              <BadgeCheck className="h-5 w-5" />
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                              This account is verified
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  )}
                </div>
                {!sidebarCollapsed && <Menu className="h-4 w-4 text-muted-foreground" />}
              </Button>

              {/* User menu dropdown */}
              {userMenuOpen && (
                <div className={`mt-2 py-2 bg-background border rounded-md shadow-lg absolute bottom-16 z-50 ${
                  sidebarCollapsed 
                    ? "left-12 right-0 w-auto" 
                    : "left-4 right-4 w-[calc(100%-2rem)]"
                }`}>
                  <Link 
                    href="/app/profile" 
                    className="block px-4 py-2 text-sm hover:bg-accent"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/app/settings" 
                    className="block px-4 py-2 text-sm hover:bg-accent"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <div className="border-t my-1"></div>
                  {user.isBusiness && (
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                      onClick={() => {
                        // Switch to premium profile - ensure isPremium remains true
                        setUser({ ...user, isBusiness: false, isPremium: true });
                        setUserMenuOpen(false);
                      }}
                    >
                      Switch to Premium Profile
                    </button>
                  )}
                  {user.isPremium && !user.isBusiness && (
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                      onClick={() => {
                        // Switch to business profile - ensure isPremium remains true
                        setUser({ ...user, isBusiness: true, isPremium: true });
                        setUserMenuOpen(false);
                      }}
                    >
                      Switch to Business Profile
                    </button>
                  )}
                  <div className="border-t my-1"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-accent">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Removed the external collapse button since it's now inside the sidebar */}

        {/* Main content */}
        <div className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        }`}>
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex flex-1 items-center gap-4">
              <h1 className="text-lg font-sans" style={{ letterSpacing: '-0.02em' }}>
                {getCurrentTabName()}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ModeToggle />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminViewContext.Provider>
  );
}