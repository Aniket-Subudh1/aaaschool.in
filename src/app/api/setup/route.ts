import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserByUsername, createAdminUser } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    // Check if setup is allowed
    if (process.env.ALLOW_SETUP !== 'true') {
      return NextResponse.json(
        { message: 'Setup is not allowed' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { username, password, email } = body;

    if (!username || !password || !email) {
      return NextResponse.json(
        { message: 'Username, password, and email are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getAdminUserByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newUser = await createAdminUser({
      username,
      password: hashedPassword,
      email,
      role: 'admin',
    });

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error in setup:', error);
    return NextResponse.json(
      { message: 'Setup failed' },
      { status: 500 }
    );
  }
}