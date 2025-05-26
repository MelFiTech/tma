import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request)
    
    if (!session || !session.isValid) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Return user information (without sensitive data)
    return NextResponse.json({
      success: true,
      user: {
        id: session.id,
        username: session.username,
        email: session.email,
        fullName: session.fullName,
        role: session.role,
        profileImage: session.profileImage,
        loginTime: session.loginTime,
        sessionId: session.sessionId
      }
    })
    
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 