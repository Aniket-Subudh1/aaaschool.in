import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

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
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { isAuthenticated: false, error: 'No token provided' };
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return { isAuthenticated: false, error: 'Invalid token format' };
    }
    
    // Verify the token
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as unknown as {
      id: string;
      username: string;
      role: 'admin' | 'editor';
    };
    
    // If verification is successful, return the decoded user information
    return {
      isAuthenticated: true,
      userId: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { isAuthenticated: false, error: 'Authentication failed' };
  }
}