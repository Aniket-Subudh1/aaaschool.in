// src/app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserByUsername } from '@/lib/db';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

if (!process.env.JWT_SECRET) {
  throw new Error('Please add your JWT_SECRET to .env.local');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt for username:', username);

    // Validate input
    if (!username || !password) {
      console.log('Missing username or password');
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await getAdminUserByUsername(username);
    if (!user) {
      console.log('User not found:', username);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token using jose (Edge runtime compatible)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    console.log('User authenticated successfully:', username);
    console.log('Token generated:', token.substring(0, 10) + '...');

    // Set cookie in the response
    const response = NextResponse.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // Set the cookie in HTTP response
    response.cookies.set({
      name: 'admin-token',
      value: token,
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      httpOnly: false, // Make it accessible to client-side JavaScript
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}