"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerLinks?: {
    href: string;
    text: string;
    linkText: string;
  }[];
}

export function AuthCard({ title, description, children, footerLinks }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <img 
              src="/acces-logo-black.png" 
              alt="Acces Logo" 
              className="absolute w-16 h-16 transition-opacity duration-300 ease-in-out opacity-100 dark:opacity-0" 
            />
            <img 
              src="/acces-logo-white.png" 
              alt="Acces Logo" 
              className="absolute w-16 h-16 transition-opacity duration-300 ease-in-out opacity-0 dark:opacity-100" 
            />
            <img 
              src="/acces-logo-teal.png" 
              alt="Acces Logo" 
              className="absolute w-16 h-16 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100" 
            />
          </div>
        </div>
        <CardTitle className="text-2xl font-light">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footerLinks && (
        <CardFooter className="flex flex-col space-y-4">
          {footerLinks.map((link, index) => (
            <div key={index} className="text-sm text-muted-foreground text-center">
              {link.text}{" "}
              <Link href={link.href} className="text-primary hover:underline">
                {link.linkText}
              </Link>
            </div>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}