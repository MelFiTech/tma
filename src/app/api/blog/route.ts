import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const blogPostData = await request.json()

    console.log('API: Creating blog post:', blogPostData)

    // Prepare the document for Sanity with required _type and proper slug format
    const sanityDocument = {
      _type: 'blogPost',
      title: blogPostData.title,
      slug: {
        current: blogPostData.slug,
        _type: 'slug'
      },
      excerpt: blogPostData.excerpt,
      content: blogPostData.content, // This is now Portable Text array
      category: blogPostData.category,
      tags: blogPostData.tags || [],
      author: blogPostData.author,
      publishedAt: blogPostData.publishedAt,
      featured: blogPostData.featured || false,
      ...(blogPostData.featuredImage && { featuredImage: blogPostData.featuredImage })
    }

    const result = await writeClient.create(sanityDocument)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    console.error('Error creating blog post:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create blog post'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const blogPosts = await writeClient.fetch(`
      *[_type == "blogPost"] | order(_updatedAt desc) {
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
    
    return NextResponse.json({ success: true, data: blogPosts })
  } catch (error: unknown) {
    console.error('Error fetching blog posts:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blog posts'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
} 