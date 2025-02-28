'use client'

import { useState } from 'react'
import { Header } from '@/components/common/Header/Header'
import { Footer } from '@/components/landing/Footer'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { getAllBlogPosts } from '@/data/blogs'

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const posts = getAllBlogPosts()

  return (
    <main className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <header className="fixed top-0 left-0 w-full z-50 bg-black/70">
        <div className="container mx-auto px-4 flex justify-center">
          <Header />
        </div>
      </header>

      <BlogHero />
      
      <div className="container mx-auto px-4 py-12 mb-[200px]">
        <BlogGrid
          posts={posts}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Footer />
    </main>
  )
}