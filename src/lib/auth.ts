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

const ignoredPathPrefixes = [
  '/_next/', 
  '/favicon.ico', 
  '/api/feedback', 
  '/manifest.json', 
  '/robots.txt',
  '/api/notifications',
  '/api/holidays',
  '/principal.jpg',
  '/api/study-material',
  '/api/enquiries',
  '/api/admissions',
  '/api/albums',
  '/api/videos',
  '/api/news-bulletins',
  '/api/achievements',
  '/api/faculty'
];

export async function verifyAuth(request: NextRequest, options: { allowPublic?: boolean } = {}): Promise<AuthResult> {
  try {
    const { allowPublic = false } = options;

    const pathname = new URL(request.url).pathname;
    const shouldIgnoreAuth = ignoredPathPrefixes.some(prefix => 
      pathname.startsWith(prefix)
    );

    if (shouldIgnoreAuth) {
      return { isAuthenticated: true };
    }

    console.log('Authenticating request for path:', pathname);
    console.log('Request method:', request.method);

    const authHeader = request.headers.get('authorization');
    
    console.log('Auth header exists:', !!authHeader);
    
    if (!authHeader) {
      const cookies = request.cookies;
      const tokenCookie = cookies.get('admin-token');
      
      console.log('Token cookie exists:', !!tokenCookie);
      
      if (allowPublic) {
        return { isAuthenticated: true };
      }
      
      if (tokenCookie && tokenCookie.value) {
        try {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          const { payload } = await jose.jwtVerify(
            tokenCookie.value,
            secret
          );
          
          console.log('Authenticated via cookie:', payload.username);
          
          return {
            isAuthenticated: true,
            userId: payload.id as string,
            username: payload.username as string,
            role: payload.role as 'admin' | 'editor',
          };
        } catch (jwtError) {
          console.error('Cookie token verification failed:', jwtError);
          
          if (allowPublic) {
            return { isAuthenticated: true };
          }
          
          return { isAuthenticated: false, error: 'Invalid token' };
        }
      }
      
      if (allowPublic) {
        return { isAuthenticated: true };
      }
      
      return { isAuthenticated: false, error: 'No token provided' };
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      console.log('Auth header format incorrect:', authHeader.substring(0, 15) + '...');
      
      if (allowPublic) {
        return { isAuthenticated: true };
      }
      
      return { isAuthenticated: false, error: 'Invalid token format' };
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      if (allowPublic) {
        return { isAuthenticated: true };
      }
      
      return { isAuthenticated: false, error: 'Invalid token format' };
    }
    
    console.log('Token extracted from header:', token.substring(0, 10) + '...');
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    
    console.log('Authentication successful for:', payload.username);
    
    return {
      isAuthenticated: true,
      userId: payload.id as string,
      username: payload.username as string,
      role: payload.role as 'admin' | 'editor',
    };
  } catch (error) {
   
    if (options.allowPublic) {
      return { isAuthenticated: true };
    }
    
    console.error('Authentication error:', error);
    return { isAuthenticated: false, error: 'Authentication failed' };
  }
}