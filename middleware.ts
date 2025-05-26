import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

// Security headers
function setSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Strict transport security (HTTPS only)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: Consider removing unsafe-* in production
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.sanity.io wss://api.sanity.io",
    "media-src 'self' blob:",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)
  
  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Feature policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  )
  
  return response
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next()

  // Apply security headers to all responses
  response = setSecurityHeaders(response)

  // Handle admin routes with enhanced security
  if (pathname.startsWith('/admin')) {
    // Handle the main admin route (/admin) - Login page
    if (pathname === '/admin') {
      const session = getSessionFromRequest(request)
      if (session?.isValid) {
        // If user is already logged in, redirect to dashboard
        const redirectResponse = NextResponse.redirect(new URL('/admin/dashboard', request.url))
        return setSecurityHeaders(redirectResponse)
      }
      // If not logged in, show login page
      return response
    }

    // Check authentication for all other admin routes (dashboard, team, blog, etc.)
    const session = getSessionFromRequest(request)
    
    if (!session || !session.isValid) {
      // Redirect to login page if not authenticated
      const redirectResponse = NextResponse.redirect(new URL('/admin', request.url))
      return setSecurityHeaders(redirectResponse)
    }

    // Additional security checks for sensitive admin routes
    if (pathname.startsWith('/admin/users') || pathname.includes('/settings')) {
      // These routes require super_admin or admin role
      if (session.role !== 'super_admin' && session.role !== 'admin') {
        const forbiddenResponse = NextResponse.redirect(new URL('/admin/dashboard', request.url))
        return setSecurityHeaders(forbiddenResponse)
      }
    }

    // User is authenticated and authorized, allow access
    return response
  }

  // For non-admin routes, continue with security headers
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
} 