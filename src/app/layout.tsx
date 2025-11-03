import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/contexts/user-context";
import { FaviconHandler } from "@/components/favicon-handler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400", // Regular weight
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const edunline = localFont({
  src: "./fonts/edunline.ttf",
  variable: "--font-edunline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Access",
  description: "Discover and explore innovative products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${edunline.variable} antialiased`}
        style={{ colorScheme: 'dark' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <FaviconHandler />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}