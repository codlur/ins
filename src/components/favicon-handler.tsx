"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function FaviconHandler() {
  const { theme } = useTheme();

  // Update favicon when theme changes
  useEffect(() => {
    const updateFavicon = (src: string) => {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = src;
    };

    // Use light favicon (blue) instead of teal
    updateFavicon('/favicon-light.png');
  }, [theme]);

  return null;
}