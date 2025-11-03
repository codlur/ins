import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// With authentication removed, allow all routes
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // If user visits /x, redirect to the appropriate page based on their current location
  if (url.pathname === '/x') {
    // Get the referer header to determine where the user came from
    const referer = request.headers.get('referer');
    
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        // If referer is from our own site, redirect to that page
        if (refererUrl.origin === url.origin && refererUrl.pathname !== '/x') {
          url.pathname = refererUrl.pathname;
          return NextResponse.redirect(url);
        }
      } catch (e) {
        // If referer is not a valid URL, continue with default redirect
      }
    }
    
    // Default redirect to home if no valid referer or not from our site
    url.pathname = '/app/home';
    return NextResponse.redirect(url);
  }
  
  // For root path, redirect to home
  if (url.pathname === '/') {
    url.pathname = '/app/home';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};