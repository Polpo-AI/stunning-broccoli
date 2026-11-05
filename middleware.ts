import { NextResponse, type NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Answers have no network path. Local scripts/styles are required by Next hydration.
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '') + "; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'none'; frame-ancestors 'none'; base-uri 'self'");
  return response;
}
export const config = { matcher: ['/ricerca/:path*'] };
