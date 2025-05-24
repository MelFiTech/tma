'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/common/Header/Header'
import { Footer } from '@/components/landing/Footer'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogCard } from '@/components/blog/BlogCard'
import { client, urlFor } from '@/lib/sanity'
import type { BlogPost } from '@/data/blogs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SanityBlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  content?: unknown[]
  featuredImage?: unknown
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featured: boolean
  _createdAt: string
  _updatedAt: string
}

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const postsPerPage = 9

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setError(null)
        const sanityPosts = await client.fetch(`
          *[_type == "blogPost"] | order(publishedAt desc, _createdAt desc) {
            _id,
            title,
            slug,
            excerpt,
            content,
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

        // Transform Sanity data to match the expected BlogPost interface
        const transformedPosts: BlogPost[] = sanityPosts.map((post: SanityBlogPost, index: number) => ({
          id: index + 1, // Convert to number for compatibility
          slug: post.slug?.current || '',
          title: post.title || 'Untitled',
          excerpt: post.excerpt || 'No excerpt available',
          content: '', // We'll fetch full content on the individual post page
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : new Date(post._createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          readTime: '5 min', // Default read time - could be calculated based on content length
          category: post.category || 'General',
          image: post.featuredImage ? urlFor(post.featuredImage).width(800).height(600).url() : '/images/stem-student.png',
          type: mapCategoryToType(post.category),
          author: {
            name: post.author || 'TMA Team',
            role: 'Content Writer',
            avatar: '/images/team/default.png'
          }
        }))

        setPosts(transformedPosts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Helper function to map Sanity categories to BlogPost types
  function mapCategoryToType(category: string): 'Publications' | 'News' | 'Event' | 'Podcast' {
    switch (category?.toLowerCase()) {
      case 'education':
      case 'sports':
      case 'community':
        return 'Publications'
      case 'news':
        return 'News'
      case 'events':
        return 'Event'
      default:
        return 'Publications'
    }
  }

  // Calculate pagination - show all posts since filtering is removed
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage)

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-[#FAFAFA]">
        <header className="fixed top-0 left-0 w-full z-50 bg-black/70">
          <div className="container mx-auto px-4 flex justify-center">
            <Header />
          </div>
        </header>

        <BlogHero />
        
        <div className="container mx-auto px-4 py-12 mb-[200px]">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5a2662] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>

        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col bg-[#FAFAFA]">
        <header className="fixed top-0 left-0 w-full z-50 bg-black/70">
          <div className="container mx-auto px-4 flex justify-center">
            <Header />
          </div>
        </header>

        <BlogHero />
        
        <div className="container mx-auto px-4 py-12 mb-[200px]">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Posts</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#5a2662] text-white px-4 py-2 rounded hover:bg-[#4a1e52] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>

        <Footer />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <header className="fixed top-0 left-0 w-full z-50 bg-black/70">
        <div className="container mx-auto px-4 flex justify-center">
          <Header />
        </div>
      </header>

      <BlogHero />
      
      <div className="container mx-auto px-4 py-12 mb-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              index={index} 
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 flex items-center justify-center rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Simplified pagination - show all pages if <= 7, otherwise show smart truncation */}
              {totalPages <= 7 ? (
                // Show all pages
                Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      currentPage === page
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))
              ) : (
                // Show smart truncation
                <>
                  {/* First page */}
                  <button
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      currentPage === 1
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </button>
                  
                  {/* Left ellipsis */}
                  {currentPage > 3 && <span className="px-2">...</span>}
                  
                  {/* Current page and neighbors */}
                  {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                    .filter(page => page > 1 && page < totalPages)
                    .map(page => (
                      <button
                        key={page}
                        className={`w-8 h-8 flex items-center justify-center rounded ${
                          currentPage === page
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  
                  {/* Right ellipsis */}
                  {currentPage < totalPages - 2 && <span className="px-2">...</span>}
                  
                  {/* Last page */}
                  {totalPages > 1 && (
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded ${
                        currentPage === totalPages
                          ? 'bg-black text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  )}
                </>
              )}

              <button
                className="w-8 h-8 flex items-center justify-center rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}