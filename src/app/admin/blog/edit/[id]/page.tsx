'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import Input from '@/components/admin/ui/Input'
import Select from '@/components/admin/ui/Select'
import Textarea from '@/components/admin/ui/Textarea'

interface ImageUpload {
  id: string
  file: File
  preview: string
  alt: string
  asset?: unknown
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  content: unknown[]
  featuredImage?: unknown
  category: string
  tags: string[]
  author: string
  publishedAt: string
  featured: boolean
}

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const featuredFileInputRef = useRef<HTMLInputElement>(null)
  const contentFileInputRef = useRef<HTMLInputElement>(null)
  
  // Loading state
  const [loading, setLoading] = useState(true)
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  
  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedAt, setPublishedAt] = useState('')
  const [featured, setFeatured] = useState(false)
  
  // Image handling - simplified to just 2 images
  const [featuredImage, setFeaturedImage] = useState<ImageUpload | null>(null)
  const [featuredImageAlt, setFeaturedImageAlt] = useState('')
  const [existingFeaturedImage, setExistingFeaturedImage] = useState<unknown>(null)
  const [contentImage, setContentImage] = useState<ImageUpload | null>(null)
  const [contentImageAlt, setContentImageAlt] = useState('')
  const [existingContentImage, setExistingContentImage] = useState<unknown>(null)
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`)
        const result = await response.json()
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to load blog post')
        }
        
        const post = result.data
        setBlogPost(post)
        
        // Populate form fields
        setTitle(post.title || '')
        setSlug(post.slug?.current || '')
        setExcerpt(post.excerpt || '')
        setCategory(post.category || 'education')
        setTags(post.tags || [])
        setAuthor(post.author || 'TMA Team')
        setPublishedAt(post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : '')
        setFeatured(post.featured || false)
        
        // Handle existing featured image
        if (post.featuredImage) {
          setExistingFeaturedImage(post.featuredImage)
        }
        
        // Process content and extract text + content image
        if (post.content && Array.isArray(post.content)) {
          const textBlocks = []
          let foundContentImage = null
          
          for (const block of post.content) {
            if (block._type === 'block' && block.children) {
              // Extract text from spans
              const text = block.children
                .filter((child: unknown) => 
                  typeof child === 'object' && 
                  child !== null && 
                  '_type' in child && 
                  child._type === 'span'
                )
                .map((child: unknown) => {
                  if (typeof child === 'object' && child !== null && 'text' in child) {
                    return typeof child.text === 'string' ? child.text : ''
                  }
                  return ''
                })
                .join('')
              if (text.trim()) {
                textBlocks.push(text.trim())
              }
            } else if (block._type === 'image' && !foundContentImage) {
              // Take the first image as content image
              foundContentImage = block
              setExistingContentImage(block)
              if (typeof block === 'object' && block !== null && 'alt' in block) {
                setContentImageAlt(typeof block.alt === 'string' ? block.alt : '')
              }
            }
          }
          
          // Join text blocks with double line breaks
          setContent(textBlocks.join('\n\n'))
        }
        
      } catch (error: unknown) {
        console.error('Error loading blog post:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to load blog post'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
      fetchBlogPost()
    }
  }, [id])

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    // Don't auto-update slug when editing unless it's currently matching the old title
    if (blogPost && generateSlug(blogPost.title) === slug) {
      setSlug(generateSlug(newTitle))
    }
  }

  // Handle featured image upload
  const handleFeaturedImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return
    
    const file = files[0]
    if (file && file.type.startsWith('image/')) {
      try {
        // Clean up previous image if exists
        if (featuredImage) {
          URL.revokeObjectURL(featuredImage.preview)
        }
        
        const id = 'featured_' + Date.now().toString()
        setFeaturedImage({
          id,
          file,
          preview: URL.createObjectURL(file),
          alt: ''
        })
        setExistingFeaturedImage(null) // Remove existing when new one is uploaded
        setError(null)
      } catch (error) {
        console.error('Error handling featured image upload:', error)
        setError('Failed to process the selected image. Please try a different image.')
      }
    } else {
      setError('Please select a valid image file.')
    }
  }

  const removeFeaturedImage = () => {
    if (featuredImage) {
      try {
        URL.revokeObjectURL(featuredImage.preview)
      } catch (error) {
        console.error('Error revoking URL:', error)
      }
    }
    setFeaturedImage(null)
    setExistingFeaturedImage(null)
    setFeaturedImageAlt('')
  }

  // Handle content image upload
  const handleContentImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return
    
    const file = files[0]
    if (file && file.type.startsWith('image/')) {
      try {
        // Clean up previous image if exists
        if (contentImage) {
          URL.revokeObjectURL(contentImage.preview)
        }
        
        const id = 'content_' + Date.now().toString()
        setContentImage({
          id,
          file,
          preview: URL.createObjectURL(file),
          alt: ''
        })
        setExistingContentImage(null) // Remove existing when new one is uploaded
        setError(null)
      } catch (error) {
        console.error('Error handling content image upload:', error)
        setError('Failed to process the selected image. Please try a different image.')
      }
    } else {
      setError('Please select a valid image file.')
    }
  }

  const removeContentImage = () => {
    if (contentImage) {
      try {
        URL.revokeObjectURL(contentImage.preview)
      } catch (error) {
        console.error('Error revoking URL:', error)
      }
    }
    setContentImage(null)
    setExistingContentImage(null)
    setContentImageAlt('')
  }

  // Handle tags
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate required fields
      if (!title.trim() || !slug.trim() || !content.trim()) {
        throw new Error('Title, slug, and content are required')
      }

      // Handle featured image - use existing or upload new
      let featuredImageAsset = existingFeaturedImage
      if (featuredImage) {
        const formData = new FormData()
        formData.append('file', featuredImage.file)
        formData.append('alt', featuredImageAlt)
        
        console.log('Uploading new featured image:', featuredImage.file.name, featuredImage.file.size, featuredImage.file.type)
        
        const uploadResponse = await fetch('/api/assets/upload', {
          method: 'POST',
          body: formData
        })
        
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text()
          console.error('Upload response error:', errorText)
          throw new Error(`Upload failed with status ${uploadResponse.status}: ${errorText}`)
        }
        
        const uploadResult = await uploadResponse.json()
        
        if (!uploadResult.success) {
          throw new Error(`Failed to upload featured image: ${uploadResult.error}`)
        }
        
        featuredImageAsset = uploadResult.asset
      }

      // Handle content image - use existing or upload new
      let contentImageAsset: unknown = null
      if (existingContentImage && typeof existingContentImage === 'object' && existingContentImage !== null) {
        const imageObj = existingContentImage as { asset?: unknown }
        contentImageAsset = imageObj.asset || existingContentImage
      }
      
      if (contentImage) {
        const formData = new FormData()
        formData.append('file', contentImage.file)
        formData.append('alt', contentImageAlt)
        
        console.log('Uploading new content image:', contentImage.file.name, contentImage.file.size, contentImage.file.type)
        
        const uploadResponse = await fetch('/api/assets/upload', {
          method: 'POST',
          body: formData
        })
        
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text()
          console.error('Content image upload response error:', errorText)
          throw new Error(`Content image upload failed with status ${uploadResponse.status}: ${errorText}`)
        }
        
        const uploadResult = await uploadResponse.json()
        
        if (!uploadResult.success) {
          throw new Error(`Failed to upload content image: ${uploadResult.error}`)
        }
        
        contentImageAsset = uploadResult.asset
      }

      // Build simple Portable Text content with content image in the middle
      const portableTextContent = []
      
      // Split content into paragraphs
      const paragraphs = content.trim().split('\n\n').filter(p => p.trim())
      
      // Add first half of paragraphs
      const midPoint = Math.ceil(paragraphs.length / 2)
      
      for (let i = 0; i < midPoint; i++) {
        portableTextContent.push({
          _key: `paragraph_${i}`,
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: `span_${i}`,
              _type: 'span',
              text: paragraphs[i],
              marks: []
            }
          ],
          markDefs: []
        })
      }
      
      // Add content image in the middle if it exists
      if (contentImageAsset) {
        portableTextContent.push({
          _key: 'content_image',
          _type: 'image',
          asset: contentImageAsset,
          alt: contentImageAlt || ''
        })
      }
      
      // Add remaining paragraphs
      for (let i = midPoint; i < paragraphs.length; i++) {
        portableTextContent.push({
          _key: `paragraph_${i}`,
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: `span_${i}`,
              _type: 'span',
              text: paragraphs[i],
              marks: []
            }
          ],
          markDefs: []
        })
      }

      // Create update data
      const blogPostData: Record<string, unknown> = {
        title: title.trim(),
        slug: {
          current: slug.trim(),
          _type: 'slug'
        },
        excerpt: excerpt.trim() || undefined,
        content: portableTextContent,
        category: category.trim() || 'education',
        tags: tags,
        author: author.trim() || 'TMA Team',
        publishedAt: publishedAt || new Date().toISOString(),
        featured,
      }

      if (featuredImageAsset) {
        blogPostData.featuredImage = featuredImageAsset
      }

      if (featuredImageAlt.trim()) {
        blogPostData.featuredImageAlt = featuredImageAlt.trim()
      }

      console.log('Updating blog post with data:', blogPostData)

      const response = await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPostData)
      })

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update blog post')
      }

      // Redirect to blog management page
      router.push('/admin/blog')
      
    } catch (error: unknown) {
      console.error('Error updating blog post:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update blog post'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'education', label: 'Education' },
    { value: 'sports', label: 'Sports' },
    { value: 'community', label: 'Community' },
    { value: 'news', label: 'News' },
    { value: 'events', label: 'Events' }
  ]

  useEffect(() => {
    // Cleanup function to revoke all blob URLs when the component unmounts
    return () => {
      if (featuredImage) {
        URL.revokeObjectURL(featuredImage.preview)
      }
      if (contentImage) {
        URL.revokeObjectURL(contentImage.preview)
      }
    }
  }, [featuredImage, contentImage])

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white shadow sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
              <p className="mt-1 text-sm text-gray-500">Loading...</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !blogPost) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white shadow sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
              <p className="mt-1 text-sm text-gray-500">Error loading blog post</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Blog Post</h3>
                  <p className="mt-1 text-sm text-gray-500">{error}</p>
                  <div className="mt-6">
                    <button
                      onClick={() => router.back()}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Go Back
                    </button>
                  </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
              <p className="mt-1 text-sm text-gray-500">
                Edit your blog post with a featured image and optional content image
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Blog Post</h2>
                <p className="mt-1 text-sm text-gray-500">Maximum 2 images: 1 featured + 1 content image</p>
              </div>

              <div className="px-6 py-6 space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <Input
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog post title"
                    required
                    className="text-gray-900"
                  />
                </div>

                {/* Slug */}
                <div>
                  <Input
                    id="slug"
                    label="Slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                    required
                    className="text-gray-900"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <Textarea
                    id="excerpt"
                    label="Excerpt"
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of the blog post"
                    className="text-gray-900"
                  />
                </div>

                {/* Content */}
                <div>
                  <Textarea
                    id="content"
                    label="Content"
                    rows={15}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post content here... Separate paragraphs with double line breaks. The content image (if uploaded) will be inserted in the middle of your content."
                    required
                    className="text-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Tip: Separate paragraphs with double line breaks. The content image will automatically be placed in the middle of your text.
                  </p>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image (Required for good SEO)
                  </label>
                  
                  {!featuredImage && !existingFeaturedImage && (
                    <div
                      onClick={() => featuredFileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer"
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload featured image
                      </p>
                    </div>
                  )}

                  <input
                    ref={featuredFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFeaturedImageUpload(e.target.files)}
                    className="hidden"
                  />

                  {(featuredImage || Boolean(existingFeaturedImage)) && (
                    <div className="relative border border-gray-200 rounded-lg p-3">
                      <div className="relative h-48 mb-2">
                        <Image
                          src={featuredImage?.preview || (existingFeaturedImage ? urlFor(existingFeaturedImage).width(600).height(400).url() : '')}
                          alt={featuredImageAlt || 'Featured image'}
                          fill
                          className="object-cover rounded"
                          onError={() => {
                            console.error('Failed to load featured image preview')
                            setError('Failed to display image preview. The image may be corrupted.')
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeFeaturedImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                      
                      <Input
                        label="Featured Image Alternative Text"
                        type="text"
                        placeholder="Describe the featured image for accessibility"
                        value={featuredImageAlt}
                        onChange={(e) => setFeaturedImageAlt(e.target.value)}
                        className="text-gray-900"
                      />
                      
                      {!featuredImage && Boolean(existingFeaturedImage) && (
                        <button
                          type="button"
                          onClick={() => featuredFileInputRef.current?.click()}
                          className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Replace Image
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Content Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Image (Optional)
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    This image will be automatically inserted in the middle of your content to break up the text.
                  </p>
                  
                  {!contentImage && !existingContentImage && (
                    <div
                      onClick={() => contentFileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer"
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload content image
                      </p>
                    </div>
                  )}

                  <input
                    ref={contentFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleContentImageUpload(e.target.files)}
                    className="hidden"
                  />

                  {(contentImage || Boolean(existingContentImage)) && (
                    <div className="relative border border-gray-200 rounded-lg p-3">
                      <div className="relative h-48 mb-2">
                        <Image
                          src={contentImage?.preview || (existingContentImage ? (() => {
                            const imageObj = existingContentImage as { asset?: unknown }
                            const imageAsset = imageObj.asset || existingContentImage
                            return urlFor(imageAsset).width(600).height(400).url()
                          })() : '')}
                          alt={contentImageAlt || 'Content image'}
                          fill
                          className="object-cover rounded"
                          onError={() => {
                            console.error('Failed to load content image preview')
                            setError('Failed to display image preview. The image may be corrupted.')
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeContentImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                      
                      <Input
                        label="Content Image Alternative Text"
                        type="text"
                        placeholder="Describe the content image for accessibility"
                        value={contentImageAlt}
                        onChange={(e) => setContentImageAlt(e.target.value)}
                        className="text-gray-900"
                      />
                      
                      {!contentImage && Boolean(existingContentImage) && (
                        <button
                          type="button"
                          onClick={() => contentFileInputRef.current?.click()}
                          className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Replace Image
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <Select
                    id="category"
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={categoryOptions}
                    className="text-gray-900"
                  />
                </div>

                {/* Tags */}
                <div>
                  <Input
                    id="tags"
                    label="Tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Enter tag and press ENTER…"
                    className="text-gray-900"
                  />
                  {tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Author */}
                <div>
                  <Input
                    id="author"
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    className="text-gray-900"
                  />
                </div>

                {/* Published At */}
                <div>
                  <Input
                    type="datetime-local"
                    id="publishedAt"
                    label="Published At"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="text-gray-900"
                  />
                  <p className="mt-1 text-xs text-gray-500">Leave empty to use current date and time</p>
                </div>

                {/* Featured Post Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Featured Post</h3>
                    <p className="text-sm text-gray-500">Mark this post as featured to highlight it on the blog page</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFeatured(!featured)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      featured ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        featured ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Updating...' : 'Update Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 