'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/components/admin/ImageUpload'
import Input from '@/components/admin/ui/Input'
import Select from '@/components/admin/ui/Select'
import Textarea from '@/components/admin/ui/Textarea'
import Checkbox from '@/components/admin/ui/Checkbox'

interface TeamMemberForm {
  name: string
  title: string
  department: string
  location: string
  bio: string
  linkedIn: string
  order: number
  isActive: boolean
  image?: {
    asset: {
      _ref: string
      url?: string
    }
  }
}

interface EditTeamMemberProps {
  params: Promise<{
    id: string
  }>
}

export default function EditTeamMember({ params }: EditTeamMemberProps) {
  const [form, setForm] = useState<TeamMemberForm>({
    name: '',
    title: '',
    department: 'Administration',
    location: 'Katsina',
    bio: '',
    linkedIn: '',
    order: 1,
    isActive: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [memberId, setMemberId] = useState<string | null>(null)
  const router = useRouter()

  const departments = [
    { value: 'Administration', label: 'Administration' },
    { value: 'Academic', label: 'Academic' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Support', label: 'Support' },
    { value: 'Security', label: 'Security' },
    { value: 'Leadership', label: 'Leadership' }
  ]

  const locations = [
    { value: 'Katsina', label: 'Katsina' },
    { value: 'Kaduna', label: 'Kaduna' },
    { value: 'Abuja', label: 'Abuja' },
    { value: 'Lagos', label: 'Lagos' }
  ]

  // Resolve params asynchronously
  useEffect(() => {
    async function resolveParams() {
      try {
        const resolvedParams = await params
        setMemberId(resolvedParams.id)
      } catch (error) {
        console.error('Error resolving params:', error)
        setError('Failed to load team member. Invalid ID.')
        setLoading(false)
      }
    }
    
    resolveParams()
  }, [params])

  // Fetch team member when memberId is available
  useEffect(() => {
    if (memberId) {
      fetchTeamMember(memberId)
    }
  }, [memberId])

  const fetchTeamMember = async (id: string) => {
    try {
      setError(null)
      const member = await client.fetch(`
        *[_type == "teamMember" && _id == $id][0] {
          _id,
          name,
          title,
          department,
          location,
          bio,
          linkedIn,
          order,
          isActive,
          image {
            asset -> {
              _ref,
              url
            }
          }
        }
      `, { id })

      if (member) {
        setForm({
          name: member.name || '',
          title: member.title || '',
          department: member.department || 'Administration',
          location: member.location || 'Katsina',
          bio: member.bio || '',
          linkedIn: member.linkedIn || '',
          order: member.order || 1,
          isActive: member.isActive ?? true,
          image: member.image
        })
      } else {
        setError('Team member not found')
      }
    } catch (error) {
      console.error('Error fetching team member:', error)
      setError('Failed to load team member. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!memberId) return
    
    setSaving(true)
    setError(null)

    try {
      // Validate required fields
      if (!form.name.trim()) {
        setError('Name is required')
        setSaving(false)
        return
      }
      
      if (!form.title.trim()) {
        setError('Job title is required')
        setSaving(false)
        return
      }

      // Prepare updates object with proper data types and validation
      const updates: Record<string, unknown> = {
        name: form.name.trim(),
        title: form.title.trim(),
        department: form.department,
        location: form.location,
        bio: form.bio.trim(),
        order: Number(form.order) || 0,
        isActive: Boolean(form.isActive)
      }

      // Only add linkedIn if it's not empty and is a valid URL
      if (form.linkedIn.trim()) {
        try {
          new URL(form.linkedIn.trim())
          updates.linkedIn = form.linkedIn.trim()
        } catch {
          setError('LinkedIn profile must be a valid URL')
          setSaving(false)
          return
        }
      } else {
        // Explicitly unset linkedIn if empty
        updates.linkedIn = null
      }

      // Handle image properly
      if (form.image?.asset?._ref) {
        updates.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: form.image.asset._ref
          }
        }
      }

      console.log('Updating team member with:', updates)

      // Use API route instead of direct Sanity client
      const response = await fetch(`/api/team/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to update team member')
      }

      router.push('/admin/team')
    } catch (error: unknown) {
      console.error('Error updating team member:', error)
      
      // Provide more specific error messages
      let errorMessage = 'Failed to update team member. Please try again.'
      
      if (error instanceof Error && error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      // Use API route instead of direct Sanity client
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/assets/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to upload image')
      }

      setForm(prev => ({
        ...prev,
        image: {
          asset: {
            _ref: result.data._id,
            url: result.data.url
          }
        }
      }))
    } catch (error: unknown) {
      console.error('Error uploading image:', error)
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      setError(`Failed to upload image: ${errorMessage}`)
    }
  }

  const handleImageRemove = () => {
    setForm(prev => ({
      ...prev,
      image: undefined
    }))
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
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
            <div className="bg-white shadow rounded-lg">
              <div className="animate-pulse p-6">
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
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
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <Link href="/admin/team" className="text-sm text-gray-500 hover:text-gray-700">
                      Team Members
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-4 text-sm text-gray-500">Edit Team Member</span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">Edit Team Member</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update team member profile information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex gap-6">
                {/* Left side - Form fields */}
                <div className="flex-1 space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="name"
                      label="Full Name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter full name"
                    />

                    <Input
                      id="title"
                      label="Job Title"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Enter job title"
                    />

                    <Select
                      id="department"
                      label="Department"
                      required
                      options={departments}
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                    />

                    <Select
                      id="location"
                      label="Campus Location"
                      required
                      options={locations}
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />

                    <Input
                      id="order"
                      label="Display Order"
                      type="number"
                      min="0"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                      helpText="Lower numbers appear first"
                    />

                    <Input
                      id="linkedIn"
                      label="LinkedIn Profile"
                      type="url"
                      value={form.linkedIn}
                      onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  {/* Biography */}
                  <Textarea
                    id="bio"
                    label="Biography"
                    rows={4}
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Brief biography or description..."
                  />

                  {/* Settings */}
                  <Checkbox
                    id="isActive"
                    label="Active member"
                    description="Will be displayed on the website"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  />
                </div>

                {/* Right side - Image upload */}
                <div className="w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <div className="w-64 h-64">
                    <ImageUpload
                      currentImage={form.image?.asset?.url}
                      onImageSelect={handleImageUpload}
                      onImageRemove={handleImageRemove}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                <Link
                  href="/admin/team"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}