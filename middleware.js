import { NextResponse } from 'next/server';
import { applySecurityHeaders, isAdminAuthenticated, isRateLimited } from '@/lib/security';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shomicore123';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    if (isRateLimited(request, { prefix: 'api', limit: 120, windowMs: 60_000 })) {
      return new Response(JSON.stringify({ success: false, message: 'Too many requests. Please try again shortly.' }), {
        status: 429,
        headers: {
          'content-type': 'application/json',
          'Cache-Control': 'no-store, max-age=0',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
        }
      });
    }

    if (pathname.startsWith('/api/upload')) {
      if (!isAdminAuthenticated(request)) {
        return applySecurityHeaders(
          NextResponse.json({ success: false, message: 'Unauthorized upload request.' }, { status: 401 })
        );
      }
    }

    return applySecurityHeaders(NextResponse.next());
  }

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
      return applySecurityHeaders(NextResponse.next());
    }

    if (!isAdminAuthenticated(request)) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return applySecurityHeaders(NextResponse.next());
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
};
