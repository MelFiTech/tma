'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageUpload from '@/components/admin/ImageUpload'
import Input from '@/components/admin/ui/Input'
import Select from '@/components/admin/ui/Select'
import Textarea from '@/components/admin/ui/Textarea'
import Checkbox from '@/components/admin/ui/Checkbox'

interface FormData {
  name: string
  title: string
  department: string
  location: string
  bio: string
  linkedIn: string
  isActive: boolean
  order: number
  image?: {
    asset?: {
      _ref: string
    }
  }
}

export default function NewTeamMember() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    title: '',
    department: 'Administration',
    location: 'Katsina',
    bio: '',
    linkedIn: '',
    isActive: true,
    order: 0
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required'
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Biography is required'
    }

    if (formData.linkedIn && !formData.linkedIn.startsWith('https://')) {
      newErrors.linkedIn = 'LinkedIn profile must be a valid URL starting with https://'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setErrors(prev => ({ ...prev, submit: '' }))

    try {
      const teamMember = {
        _type: 'teamMember',
        name: formData.name,
        title: formData.title,
        department: formData.department,
        location: formData.location,
        bio: formData.bio,
        isActive: formData.isActive,
        order: formData.order,
        ...(formData.linkedIn && { linkedIn: formData.linkedIn }), // Only add linkedIn if it's not empty
        ...(formData.image && {
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: formData.image.asset?._ref
            }
          }
        })
      }

      console.log('Creating team member with:', teamMember)

      // Use API route instead of direct Sanity client
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamMember)
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to create team member')
      }

      router.push('/admin/team')
    } catch (error: unknown) {
      console.error('Error creating team member:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create team member'
      setErrors(prev => ({ ...prev, submit: errorMessage }))
    } finally {
      setLoading(false)
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

      setFormData(prev => ({
        ...prev,
        image: {
          asset: {
            _ref: result.data._id
          }
        }
      }))
    } catch (error: unknown) {
      console.error('Error uploading image:', error)
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      setErrors(prev => ({ ...prev, image: errorMessage }))
    }
  }

  const handleImageRemove = () => {
    setFormData({ ...formData, image: undefined })
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
                      <span className="ml-4 text-sm text-gray-500">New Team Member</span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">Add Team Member</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create a new team member profile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            {errors.submit && (
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
                      <p>{errors.submit}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the team member&apos;s basic details
                  </p>
                </div>
                <div className="px-6 py-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="name"
                      label="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      error={errors.name}
                      placeholder="Enter full name"
                    />

                    <Input
                      id="title"
                      label="Job Title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      error={errors.title}
                      placeholder="Enter job title"
                    />

                    <Select
                      id="department"
                      label="Department"
                      options={departments}
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />

                    <Select
                      id="location"
                      label="Campus Location"
                      options={locations}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />

                    <Input
                      id="order"
                      label="Display Order"
                      type="number"
                      min="0"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      helpText="Lower numbers appear first"
                      placeholder="0"
                    />

                    <Input
                      id="linkedIn"
                      label="LinkedIn Profile"
                      type="url"
                      value={formData.linkedIn}
                      onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                      error={errors.linkedIn}
                      placeholder="https://linkedin.com/in/username"
                      helpText="Optional"
                    />
                  </div>

                  <Textarea
                    id="bio"
                    label="Biography"
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    error={errors.bio}
                    placeholder="Enter team member&apos;s biography..."
                  />

                  <Checkbox
                    id="isActive"
                    label="Active"
                    description="Visible on website"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Profile Image</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a profile image for the team member
                  </p>
                </div>
                <div className="px-6 py-6">
                  <ImageUpload
                    onImageSelect={handleImageUpload}
                    onImageRemove={handleImageRemove}
                  />
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pb-8">
                <Link
                  href="/admin/team"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Team Member'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 