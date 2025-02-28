'use client'

import { Search } from 'lucide-react'

interface BlogFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const BlogFilter = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: BlogFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 cursor-pointer outline-none"
      >
        <option value="news">News</option>
        <option value="publications">Publications</option>
        <option value="events">Events</option>
        <option value="podcast">Podcast</option>
      </select>

      <div className="relative flex-1 md:max-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for anything"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none"
        />
      </div>
    </div>
  )
} 