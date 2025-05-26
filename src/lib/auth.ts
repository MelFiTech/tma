import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import CryptoJS from 'crypto-js'
import { writeClient, client } from './sanity'

// Security constants - Make JWT_SECRET and ENCRYPTION_KEY required
const JWT_SECRET = process.env.JWT_SECRET
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY environment variable is required')
}

if (ENCRYPTION_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be exactly 32 characters long')
}

const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// Rate limiters
const loginLimiter = new RateLimiterMemory({
  keyPrefix: 'login_attempt',
  points: MAX_LOGIN_ATTEMPTS, // Number of attempts
  duration: 900, // Per 15 minutes
  blockDuration: 900, // Block for 15 minutes
})

const ipLimiter = new RateLimiterMemory({
  keyPrefix: 'login_ip',
  points: 20, // 20 attempts per IP
  duration: 3600, // Per hour
  blockDuration: 3600, // Block for 1 hour
})

export interface AdminSession {
  id: string
  username: string
  email: string
  fullName: string
  role: string
  profileImage?: unknown
  loginTime: number
  sessionId: string
  ipAddress?: string
  userAgent?: string
  isValid: boolean
}

export interface AdminUser {
  _id: string
  username: string
  email: string
  password: string
  fullName: string
  role: string
  isActive: boolean
  profileImage?: unknown
  lastLogin?: string
  loginAttempts?: number
  lockedUntil?: string
  twoFactorSecret?: string
  twoFactorEnabled?: boolean
}

export interface LoginAttempt {
  _type: 'loginAttempt'
  username: string
  ipAddress: string
  userAgent: string
  success: boolean
  timestamp: string
  failureReason?: string
}

// Generate secure session ID
function generateSessionId(): string {
  return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex)
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// Log login attempt
async function logLoginAttempt(
  username: string,
  ipAddress: string,
  userAgent: string,
  success: boolean,
  failureReason?: string
): Promise<void> {
  try {
    await writeClient.create({
      _type: 'loginAttempt',
      username,
      ipAddress,
      userAgent,
      success,
      timestamp: new Date().toISOString(),
      failureReason,
    })
  } catch (error) {
    console.error('Failed to log login attempt:', error)
  }
}

// Check if user is locked out
function isUserLockedOut(user: AdminUser): boolean {
  if (!user.lockedUntil) return false
  
  const lockoutTime = new Date(user.lockedUntil).getTime()
  return lockoutTime > Date.now()
}

// Lock user account
async function lockUserAccount(userId: string): Promise<void> {
  try {
    const lockedUntil = new Date(Date.now() + LOCKOUT_DURATION).toISOString()
    await writeClient
      .patch(userId)
      .set({ 
        loginAttempts: MAX_LOGIN_ATTEMPTS,
        lockedUntil 
      })
      .commit()
  } catch (error) {
    console.error('Failed to lock user account:', error)
  }
}

// Reset login attempts
async function resetLoginAttempts(userId: string): Promise<void> {
  try {
    await writeClient
      .patch(userId)
      .unset(['loginAttempts', 'lockedUntil'])
      .commit()
  } catch (error) {
    console.error('Failed to reset login attempts:', error)
  }
}

// Increment login attempts
async function incrementLoginAttempts(userId: string, currentAttempts: number): Promise<void> {
  try {
    const newAttempts = (currentAttempts || 0) + 1
    
    if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
      await lockUserAccount(userId)
    } else {
      await writeClient
        .patch(userId)
        .set({ loginAttempts: newAttempts })
        .commit()
    }
  } catch (error) {
    console.error('Failed to increment login attempts:', error)
  }
}

// Get admin user from Sanity
async function getAdminUser(username: string): Promise<AdminUser | null> {
  try {
    const user = await client.fetch(
      `*[_type == "adminUser" && (username == $username || email == $username) && isActive == true][0]`,
      { username }
    )
    return user || null
  } catch (error) {
    console.error('Error fetching admin user:', error)
    return null
  }
}

// Update last login time
async function updateLastLogin(userId: string): Promise<void> {
  try {
    await writeClient
      .patch(userId)
      .set({ lastLogin: new Date().toISOString() })
      .commit()
  } catch (error) {
    console.error('Error updating last login:', error)
  }
}

// Validate admin credentials against Sanity with enhanced security
export async function validateCredentials(
  username: string, 
  password: string,
  request: NextRequest
): Promise<{ user: AdminUser | null; error?: string }> {
  const ipAddress = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  try {
    // Check rate limits
    try {
      await loginLimiter.consume(username)
      await ipLimiter.consume(ipAddress)
    } catch {
      await logLoginAttempt(username, ipAddress, userAgent, false, 'Rate limit exceeded')
      return { user: null, error: 'Too many login attempts. Please try again later.' }
    }

    const user = await getAdminUser(username)
    
    if (!user || !user.isActive) {
      await logLoginAttempt(username, ipAddress, userAgent, false, 'User not found or inactive')
      return { user: null, error: 'Invalid username or password' }
    }

    // Check if user is locked out
    if (isUserLockedOut(user)) {
      await logLoginAttempt(username, ipAddress, userAgent, false, 'Account locked')
      return { user: null, error: 'Account is temporarily locked. Please try again later.' }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      await incrementLoginAttempts(user._id, user.loginAttempts || 0)
      await logLoginAttempt(username, ipAddress, userAgent, false, 'Invalid password')
      return { user: null, error: 'Invalid username or password' }
    }

    // Reset login attempts on successful login
    await resetLoginAttempts(user._id)
    
    // Update last login time
    await updateLastLogin(user._id)
    
    // Log successful login
    await logLoginAttempt(username, ipAddress, userAgent, true)
    
    return { user }
  } catch (error) {
    console.error('Error validating credentials:', error)
    await logLoginAttempt(username, ipAddress, userAgent, false, 'System error')
    return { user: null, error: 'System error. Please try again.' }
  }
}

// Hash password for storing in Sanity
export async function hashPassword(password: string): Promise<string> {
  // Validate password strength
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long')
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number')
  }
  
  return bcrypt.hash(password, 12)
}

// Create secure JWT session token
export function createSessionToken(user: AdminUser, request: NextRequest): string {
  const sessionId = generateSessionId()
  const ipAddress = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    profileImage: user.profileImage,
    sessionId,
    ipAddress,
    userAgent,
    loginTime: Date.now(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor((Date.now() + SESSION_DURATION) / 1000)
  }
  
  return jwt.sign(payload, JWT_SECRET as string, { algorithm: 'HS256' })
}

interface JWTPayload extends jwt.JwtPayload {
  id: string
  username: string
  email: string
  fullName: string
  role: string
  profileImage?: unknown
  sessionId: string
  ipAddress: string
  userAgent: string
  loginTime: number
}

// Verify JWT session token
export function verifySessionToken(token: string): AdminSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JWTPayload
    
    // Optional IP verification can be enabled here if needed
    // Currently disabled to avoid issues with mobile users and changing IPs
    
    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      fullName: decoded.fullName,
      role: decoded.role,
      profileImage: decoded.profileImage,
      loginTime: decoded.loginTime,
      sessionId: decoded.sessionId,
      ipAddress: decoded.ipAddress,
      userAgent: decoded.userAgent,
      isValid: true
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Token expired but still return partial info for logging
      try {
        const decoded = jwt.decode(token) as JWTPayload | null
        if (decoded && decoded.id) {
          return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            fullName: decoded.fullName,
            role: decoded.role,
            profileImage: decoded.profileImage,
            loginTime: decoded.loginTime,
            sessionId: decoded.sessionId,
            ipAddress: decoded.ipAddress,
            userAgent: decoded.userAgent,
            isValid: false
          }
        }
      } catch {
        return null
      }
    }
    return null
  }
}

// Check if user is authenticated from request
export function getSessionFromRequest(request: NextRequest): AdminSession | null {
  const token = request.cookies.get('admin-session')?.value
  if (!token) return null
  
  return verifySessionToken(token)
}

// Create authenticated response with secure session cookie
export function setSessionCookie(response: NextResponse, user: AdminUser, request: NextRequest): NextResponse {
  const token = createSessionToken(user, request)
  
  response.cookies.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // Changed to 'strict' for better security
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  })
  
  return response
}

// Clear session cookie securely
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set('admin-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
  
  return response
}

// Check if user has required role
export function hasRole(session: AdminSession | null, requiredRole: string | string[]): boolean {
  if (!session || !session.isValid) return false
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  
  // Role hierarchy: super_admin > admin > editor
  const roleHierarchy: Record<string, number> = {
    super_admin: 3,
    admin: 2,
    editor: 1
  }
  
  const userRoleLevel = roleHierarchy[session.role] || 0
  const requiredLevel = Math.min(...roles.map(role => roleHierarchy[role] || 999))
  
  return userRoleLevel >= requiredLevel
}

// Create default admin user (for initial setup)
export async function createDefaultAdminUser(): Promise<void> {
  try {
    // Check if any admin users exist
    const existingUsers = await client.fetch(
      `count(*[_type == "adminUser"])`
    )
    
    if (existingUsers > 0) {
      return // Users already exist
    }

    // Create default admin user
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'TMA@Admin2024!' // Strong default password
    const hashedPassword = await hashPassword(defaultPassword)
    
    await writeClient.create({
      _type: 'adminUser',
      username: 'admin',
      email: 'admin@tma.com',
      password: hashedPassword,
      fullName: 'System Administrator',
      role: 'super_admin',
      isActive: true,
    })

    console.log('✅ Default admin user created!')
    console.log('👤 Username: admin')
    console.log('📧 Email: admin@tma.com')
    console.log('🔑 Password:', defaultPassword)
    console.log('🔒 IMPORTANT: Change the password immediately after first login!')
  } catch (error) {
    console.error('Error creating default admin user:', error)
  }
} 