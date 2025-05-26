import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Validate input format and length
    if (username.length > 100 || password.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Invalid input format' },
        { status: 400 }
      )
    }

    // Validate credentials with enhanced security
    const { user, error } = await validateCredentials(username, password, request)
    
    if (!user || error) {
      return NextResponse.json(
        { success: false, error: error || 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { 
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    })

    // Set secure session cookie
    return setSessionCookie(response, user, request)
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 