'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { urlFor } from '@/lib/sanity'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' },
  { name: 'Team Members', href: '/admin/team', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
  { name: 'Blog Posts', href: '/admin/blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
]

interface AdminUser {
  id: string
  username: string
  email: string
  fullName: string
  role: string
  profileImage?: unknown
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Get user from session using secure API endpoint
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        })
        
        const data = await response.json()
        
        if (data.success && data.user) {
          setUser({
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            fullName: data.user.fullName,
            role: data.user.role,
            profileImage: data.user.profileImage
          })
        }
      } catch (error) {
        console.error('Error fetching current user:', error)
        // If there's an error fetching user data, they're likely not authenticated
        setUser(null)
      }
    }

    // Only fetch user data if we're not on the login page
    if (pathname !== '/admin') {
      fetchCurrentUser()
    }
  }, [pathname])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin'
      case 'admin': return 'Admin'
      case 'editor': return 'Editor'
      default: return role
    }
  }

  // If we're on the login page, don't show the sidebar
  if (pathname === '/admin') {
    return <div className="h-screen bg-gray-100">{children}</div>
  }

  const sidebarContent = (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-white text-lg font-semibold">TMA Admin</h1>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <svg
                  className={classNames(
                    isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* User Profile & Logout Section */}
      <div className="flex-shrink-0 bg-gray-700">
        {user ? (
          <div className="px-4 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {user.profileImage ? (
                  <Image
                    className="h-10 w-10 rounded-full object-cover"
                    src={urlFor(user.profileImage).width(40).height(40).url()}
                    alt={user.fullName}
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-base font-medium text-white truncate">
                  {user.fullName}
                </div>
                <div className="text-sm font-medium text-gray-300 truncate">
                  {getRoleDisplayName(user.role)}
                </div>
              </div>
            </div>
            
            {/* Logout Button */}
            <div className="mt-3">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="mr-3 flex-shrink-0 h-5 w-5" />
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        ) : (
          <div className="px-4 py-4">
            <div className="animate-pulse">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
                <div className="ml-3 space-y-1">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                  <div className="h-3 bg-gray-600 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0">
        {sidebarContent}
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          {sidebarOpen && (
            <>
              <div
                className="fixed inset-0 bg-gray-600 bg-opacity-75"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative flex-1 flex flex-col max-w-xs w-full">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {sidebarContent}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-56 flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}