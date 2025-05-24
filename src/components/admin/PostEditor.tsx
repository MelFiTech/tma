'use client'

import { useState } from 'react'
import { Input, Textarea, FileInput } from '@/components/common/Input'

export const PostEditor = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    thumbnail: '',
    images: '',
    category: ''
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setImages(prev => [...prev, ...files])
      const newPreviewUrls = files.map(file => URL.createObjectURL(file))
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls])
    }
  }

  const validateForm = () => {
    const newErrors = {
      title: '',
      content: '',
      thumbnail: '',
      images: '',
      category: ''
    }
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required'
    }

    if (!category) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handlePublish = async () => {
    if (!validateForm()) return
    
    // TODO: Implement post publishing logic
    console.log({ title, content, category, thumbnail, images })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          error={errors.title}
        />
        
        <Input
          type="select"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={errors.category}
          options={[
            { value: '', label: 'Select a category' },
            { value: 'technology', label: 'Technology' },
            { value: 'lifestyle', label: 'Lifestyle' },
            { value: 'travel', label: 'Travel' },
            { value: 'food', label: 'Food' },
            { value: 'health', label: 'Health' }
          ]}
        />

        <Textarea
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="Write your post content here..."
          error={errors.content}
        />

        <div className="grid grid-cols-2 gap-4">
          <FileInput
            label="Thumbnail"
            accept="image/*"
            onChange={handleImageChange}
            previewUrl={previewUrl}
            error={errors.thumbnail}
          />

          <FileInput
            label="Additional Images"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            error={errors.images}
          />
        </div>

        {imagePreviewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imagePreviewUrls.map((url, index) => (
              <div key={index} className="relative h-32">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handlePublish}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          Publish
        </button>
      </div>
    </div>
  )
}