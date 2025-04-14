import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  // Always allow auth and setup routes
  if (
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname === '/api/setup'
  ) {
    return NextResponse.next();
  }

  if (
    request.method === 'GET' && 
    (request.nextUrl.pathname.startsWith('/api/announcements') ||
     request.nextUrl.pathname.startsWith('/api/notifications') ||
     request.nextUrl.pathname.startsWith('/api/holidays') ||
     request.nextUrl.pathname.startsWith('/api/feedback'))
  ) {
    return NextResponse.next();
  }

  // For non-GET API requests, verify authentication
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // For POST, PUT, DELETE requests to protected endpoints
    const authResult = await verifyAuth(request);
    
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.next();
  }

  // Admin page protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin-login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      // Use jose instead of jsonwebtoken (Edge compatible)
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jose.jwtVerify(token, secret);

      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*', '/admin-login'],
};