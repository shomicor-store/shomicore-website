import { NextResponse } from 'next/server';
import { applySecurityHeaders } from '@/lib/security';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out.' }, { status: 200 });
  response.cookies.set('admin-auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });

  return applySecurityHeaders(response);
}
