'use client'

import { BlogCard } from '../BlogCard'
import { BlogFilter } from '../BlogFilter'
import type { BlogPost } from '@/data/blogs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogGridProps {
  posts: BlogPost[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  postsPerPage?: number
}

export const BlogGrid = ({
  posts,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  currentPage,
  setCurrentPage,
  postsPerPage = 9
}: BlogGridProps) => {
  // Filter posts based on category and search
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.type.toLowerCase() === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  return (
    <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-20">
      <div className="container mx-auto">
        <BlogFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />

        {paginatedPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedPosts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                index={index} 
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 flex items-center justify-center rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1)
                .map((page, index, array) => (
                  <>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span key={`ellipsis-${page}`} className="px-2">...</span>
                    )}
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
                  </>
                ))}

              <button
                className="w-8 h-8 flex items-center justify-center rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}