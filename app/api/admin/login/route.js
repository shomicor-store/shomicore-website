import { NextResponse } from 'next/server';
import { applySecurityHeaders } from '@/lib/security';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shomicore123';

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return applySecurityHeaders(
        NextResponse.json({ success: false, message: 'Invalid admin password.' }, { status: 401 })
      );
    }

    const response = NextResponse.json({ success: true, message: 'Authenticated successfully.' }, { status: 200 });
    response.cookies.set('admin-auth', ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8
    });

    return applySecurityHeaders(response);
  } catch {
    return applySecurityHeaders(
      NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 })
    );
  }
}
