"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  BarChart3, 
  Zap, 
  Users, 
  ArrowRight, 
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Get deep insights into AI trends and developments with our powerful analytics tools."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Updates",
      description: "Stay ahead with real-time updates on the latest AI breakthroughs and research."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Community",
      description: "Connect with AI researchers and practitioners in our vibrant community."
    }
  ];

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <img src="/insearch.svg" alt="Insearch Logo" className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">Insearch</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search AI insights..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[350px]"
                />
              </div>
            </div>
            <nav className="flex items-center">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signin">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
          
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="container md:hidden">
            <div className="border-t pt-4 pb-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main>
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 flex flex-col items-center gap-4 text-center lg:text-left">
                <h1 className="text-3xl font-thin tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Understand AI .
                </h1>
                <h2 className="text-2xl font-light tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover What's Possible .
                </h2>
                <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                  Insearch provides cutting-edge insights into artificial intelligence research, 
                  helping you stay ahead in the rapidly evolving world of AI.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              {/* Sponsors Section */}
              <div className="w-full lg:w-80">
                <div className="border-l border-muted pl-6">
                  <h3 className="text-lg font-light mb-4">Our Sponsors</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <span className="text-sm font-medium">Company Name</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <span className="text-sm font-medium">Company Name</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <span className="text-sm font-medium">Company Name</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <span className="text-sm font-medium">Company Name</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Powerful Features
            </h2>
            <p className="max-w-[800px] text-lg text-muted-foreground md:text-xl">
              Everything you need to stay informed about the latest developments in artificial intelligence.
            </p>
          </div>
          
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-md transition-shadow"
              >
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="flex items-center space-x-2">
                    {feature.icon}
                    <h3 className="font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-4 text-center rounded-lg bg-muted p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Ready to get started?
            </h2>
            <p className="max-w-[800px] text-lg text-muted-foreground md:text-xl">
              Join thousands of AI researchers and practitioners using Insearch to stay ahead.
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 Insearch. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Documentation
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}