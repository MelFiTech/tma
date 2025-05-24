'use client'

import { useState, useEffect } from 'react'
import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: unknown
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featured: boolean
  _createdAt: string
  _updatedAt: string
}

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(3) // Temporarily reduced to 3 for testing - change back to 10 later

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      setError(null)
      const posts = await client.fetch(`
        *[_type == "blogPost"] | order(publishedAt desc, _createdAt desc) {
          _id,
          title,
          slug,
          excerpt,
          featuredImage,
          category,
          tags,
          author,
          publishedAt,
          featured,
          _createdAt,
          _updatedAt
        }
      `)
      
      if (Array.isArray(posts)) {
        setBlogPosts(posts)
      } else {
        setBlogPosts([])
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      setError('Failed to load blog posts. Please try again.')
      setBlogPosts([])
    } finally {
      setLoading(false)
    }
  }

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = blogPosts.slice(startIndex, startIndex + postsPerPage)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5 // Show 5 page numbers at a time
    
    let startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    try {
      setDeleting(id)
      
      // Use API route instead of direct Sanity client
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete blog post')
      }

      setBlogPosts(prev => {
        const newPosts = Array.isArray(prev) ? prev.filter(post => post._id !== id) : []
        
        // Adjust current page if we deleted the last post on the current page
        const newTotalPages = Math.ceil(newPosts.length / postsPerPage)
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        }
        
        return newPosts
      })
    } catch (error: unknown) {
      console.error('Error deleting blog post:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error deleting blog post: ${errorMessage}`)
    } finally {
      setDeleting(null)
    }
  }

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      // Use API route instead of direct Sanity client
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !currentStatus })
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to update featured status')
      }
      
      setBlogPosts(prev => 
        Array.isArray(prev) ? prev.map(post => 
          post._id === id 
            ? { ...post, featured: !currentStatus }
            : post
        ) : []
      )
    } catch (error: unknown) {
      console.error('Error updating featured status:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error updating featured status: ${errorMessage}`)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
            <div className="bg-white shadow rounded-lg p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-20 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
        <div className="bg-white shadow sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your blog content and articles
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
                <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Blog Posts</h3>
                <p className="mt-1 text-sm text-gray-500">{error}</p>
                <div className="mt-6">
                  <button
                    onClick={fetchBlogPosts}
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
              <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your blog content and articles
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin/blog/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg">
            {!Array.isArray(blogPosts) || blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p>
                <div className="mt-6">
                  <Link
                    href="/admin/blog/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Post
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {blogPosts.length} blog post{blogPosts.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {blogPosts.filter(p => p?.featured).length} featured
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </span>
                      {/* Debug info - remove later */}
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        Debug: {blogPosts.length} posts, {postsPerPage} per page, {totalPages} pages
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, blogPosts.length)} of {blogPosts.length}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {paginatedPosts.map((post) => (
                      <div
                        key={post._id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {post.featuredImage ? (
                              <Image
                                src={urlFor(post.featuredImage).width(80).height(60).url()}
                                alt={post.title || 'Blog post'}
                                width={80}
                                height={60}
                                className="w-20 h-16 rounded object-cover"
                              />
                            ) : (
                              <div className="w-20 h-16 rounded bg-gray-200 flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-lg font-medium text-gray-900 truncate">
                              {post.title || 'Untitled'}
                            </p>
                            {post.excerpt && (
                              <p className="text-sm text-gray-600 truncate mt-1">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {post.category || 'Uncategorized'}
                              </span>
                              {Array.isArray(post.tags) && post.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {tag}
                                </span>
                              ))}
                              {Array.isArray(post.tags) && post.tags.length > 2 && (
                                <span className="text-gray-400">+{post.tags.length - 2} more</span>
                              )}
                              <span>•</span>
                              <span>{post.author || 'Unknown'}</span>
                              <span>•</span>
                              <span>{post.publishedAt ? formatDate(post.publishedAt) : 'No date'}</span>
                              {post.featured && (
                                <>
                                  <span>•</span>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Featured
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleFeatured(post._id, post.featured)}
                            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                              post.featured
                                ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200'
                                : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                            }`}
                          >
                            {post.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          <Link
                            href={`/admin/blog/edit/${post._id}`}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id, post.title || 'Untitled')}
                            disabled={deleting === post._id}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deleting === post._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                {/* Always show for debugging - change back to {totalPages > 1 && ( later */}
                {blogPosts.length > 0 && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-center">
                      {totalPages > 1 ? (
                        <nav className="flex items-center gap-2" aria-label="Pagination">
                          {/* Previous Button */}
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                          </button>

                          {/* Page Numbers */}
                          <div className="flex items-center gap-1">
                            {currentPage > 3 && (
                              <>
                                <button
                                  onClick={() => setCurrentPage(1)}
                                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                  1
                                </button>
                                {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                              </>
                            )}

                            {getPageNumbers().map(number => (
                              <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                  currentPage === number
                                    ? 'bg-blue-600 text-white border border-blue-600'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {number}
                              </button>
                            ))}

                            {currentPage < totalPages - 2 && (
                              <>
                                {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                                <button
                                  onClick={() => setCurrentPage(totalPages)}
                                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                  {totalPages}
                                </button>
                              </>
                            )}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </nav>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Only one page - pagination not needed (Total posts: {blogPosts.length}, Per page: {postsPerPage})
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 