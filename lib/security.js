import { NextResponse } from 'next/server';

const rateLimitStore = new Map();

export function applySecurityHeaders(response) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}

export function getClientIdentifier(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

export function isRateLimited(request, options = {}) {
  const limit = options.limit || 60;
  const windowMs = options.windowMs || 60_000;
  const key = `${options.prefix || 'global'}:${getClientIdentifier(request)}`;
  const now = Date.now();

  const entries = rateLimitStore.get(key) || [];
  const recentEntries = entries.filter((timestamp) => now - timestamp < windowMs);

  if (recentEntries.length >= limit) {
    rateLimitStore.set(key, recentEntries);
    return true;
  }

  recentEntries.push(now);
  rateLimitStore.set(key, recentEntries);
  return false;
}

export function createRateLimitResponse(message = 'Too many requests. Please try again shortly.') {
  return applySecurityHeaders(
    NextResponse.json({ success: false, message }, { status: 429 })
  );
}

export function isAdminAuthenticated(request) {
  const adminCookie = request.cookies?.get?.('admin-auth')?.value;
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '').trim();
  const password = process.env.ADMIN_PASSWORD || 'shomicore123';

  return Boolean(adminCookie && adminCookie === password) || Boolean(token && token === password);
}
