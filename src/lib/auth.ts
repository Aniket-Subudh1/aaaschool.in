// src/lib/auth.ts

import { NextRequest } from 'next/server';
import * as jose from 'jose';

if (!process.env.JWT_SECRET) {
  throw new Error('Please add your JWT_SECRET to .env.local');
}

interface AuthResult {
  isAuthenticated: boolean;
  userId?: string;
  username?: string;
  role?: 'admin' | 'editor';
  error?: string;
}

export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    // Debug: Log auth header presence (remove in production)
    console.log('Auth header exists:', !!authHeader);
    
    if (!authHeader) {
      // Also check for cookie as a fallback (since we're using cookies for authentication)
      const cookies = request.cookies;
      const tokenCookie = cookies.get('admin-token');
      
      // Debug: Log cookie presence (remove in production)
      console.log('Token cookie exists:', !!tokenCookie);
      
      // If there's a token in cookies, use that
      if (tokenCookie && tokenCookie.value) {
        try {
          // Use jose for JWT verification (compatible with Edge Runtime)
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          const { payload } = await jose.jwtVerify(
            tokenCookie.value,
            secret
          );
          
          // Debug: Log successful cookie auth (remove in production)
          console.log('Authenticated via cookie:', payload.username);
          
          return {
            isAuthenticated: true,
            userId: payload.id as string,
            username: payload.username as string,
            role: payload.role as 'admin' | 'editor',
          };
        } catch (jwtError) {
          console.error('Cookie token verification failed:', jwtError);
          return { isAuthenticated: false, error: 'Invalid token' };
        }
      }
      
      return { isAuthenticated: false, error: 'No token provided' };
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      console.log('Auth header format incorrect:', authHeader.substring(0, 15) + '...');
      return { isAuthenticated: false, error: 'Invalid token format' };
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return { isAuthenticated: false, error: 'Invalid token format' };
    }
    
    // Debug: Log token presence (remove in production)
    console.log('Token extracted from header:', token.substring(0, 10) + '...');
    
    // Use jose for JWT verification (compatible with Edge Runtime)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    
    // Debug: Log successful auth (remove in production)
    console.log('Authentication successful for:', payload.username);
    
    // If verification is successful, return the decoded user information
    return {
      isAuthenticated: true,
      userId: payload.id as string,
      username: payload.username as string,
      role: payload.role as 'admin' | 'editor',
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { isAuthenticated: false, error: 'Authentication failed' };
  }
}