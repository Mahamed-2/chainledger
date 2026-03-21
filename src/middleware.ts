import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simulating eIDAS 2.0 Auth Middleware
// In production, this would verify a real JWT or eIDAS wallet signature
export function middleware(request: NextRequest) {
  const currentRole = request.cookies.get('demo_eidas_role')?.value || 'public';
  const path = request.nextUrl.pathname;

  // Protect Admin / PIM routes
  if (path.startsWith('/admin')) {
    if (currentRole !== 'admin' && currentRole !== 'regulator') {
      return NextResponse.redirect(new URL('/?error=unauthorized_admin', request.url));
    }
  }

  // Protect B2B Dashboard
  if (path.startsWith('/dashboard')) {
    if (currentRole === 'public' || currentRole === 'consumer') {
      return NextResponse.redirect(new URL('/?error=unauthorized_b2b', request.url));
    }
  }

  const response = NextResponse.next();
  // Pass the role as a header to API routes for field-level filtering
  response.headers.set('X-User-Role', currentRole);
  
  return response;
}

export const config = {
  matcher: [
    // Apply middleware to these paths
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/(.*)', 
  ],
};
