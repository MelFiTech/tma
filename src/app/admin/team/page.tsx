'use client'

import { useState, useEffect } from 'react'
import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

interface TeamMember {
  _id: string
  name: string
  title: string
  department: string
  location: string
  isActive: boolean
  order: number
  image?: unknown
  bio?: string
  linkedIn?: string
}

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setError(null)
      const members = await client.fetch(`
        *[_type == "teamMember"] | order(order asc, name asc) {
          _id,
          name,
          title,
          department,
          location,
          bio,
          image {
            asset -> {
              _ref,
              url
            }
          },
          linkedIn,
          isActive,
          order,
          _createdAt,
          _updatedAt
        }
      `)
      
      if (Array.isArray(members)) {
        setTeamMembers(members)
      } else {
        setTeamMembers([])
      }
    } catch (error) {
      console.error('Error fetching team members:', error)
      setError('Failed to load team members. Please try again.')
      setTeamMembers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return
    }

    try {
      setDeleting(id)
      await client.delete(id)
      setTeamMembers(prev => Array.isArray(prev) ? prev.filter(member => member._id !== id) : [])
    } catch (error) {
      console.error('Error deleting team member:', error)
      alert('Error deleting team member. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await client
        .patch(id)
        .set({ isActive: !currentStatus })
        .commit()
      
      setTeamMembers(prev => 
        Array.isArray(prev) ? prev.map(member => 
          member._id === id 
            ? { ...member, isActive: !currentStatus }
            : member
        ) : []
      )
    } catch (error) {
      console.error('Error updating team member status:', error)
      alert('Error updating status. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white shadow sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white shadow sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your team member profiles and information
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Team Members</h3>
                <p className="mt-1 text-sm text-gray-500">{error}</p>
                <div className="mt-6">
                  <button
                    onClick={fetchTeamMembers}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your team member profiles and information
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin/team/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Team Member
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg">
            {!Array.isArray(teamMembers) || teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No team members</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding your first team member.</p>
                <div className="mt-6">
                  <Link
                    href="/admin/team/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Team Member
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {teamMembers.filter(m => m?.isActive).length} active
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {member.image ? (
                            <Image
                              src={urlFor(member.image).width(64).height(64).url()}
                              alt={member.name}
                              width={64}
                              height={64}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-lg font-medium">
                                {member.name ? member.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '??'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-medium text-gray-900 truncate">
                            {member.name || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {member.title || 'No title'}
                          </p>
                          <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                            <span>{member.department || 'No department'}</span>
                            <span>•</span>
                            <span>{member.location || 'No location'}</span>
                            <span>•</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              member.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {member.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleActive(member._id, member.isActive)}
                          className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                            member.isActive
                              ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                              : 'text-green-700 bg-green-100 hover:bg-green-200'
                          }`}
                        >
                          {member.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <Link
                          href={`/admin/team/${member._id}`}
                          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(member._id, member.name || 'Unknown')}
                          disabled={deleting === member._id}
                          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleting === member._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 