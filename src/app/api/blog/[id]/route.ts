import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const blogPost = await writeClient.fetch(`
      *[_type == "blogPost" && _id == $id][0] {
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
    `, { id })
    
    if (!blogPost) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: blogPost })
  } catch (error: unknown) {
    console.error('Error fetching blog post:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blog post'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updates = await request.json()

    console.log('API: Updating blog post', id, 'with:', updates)

    const result = await writeClient.patch(id).set(updates).commit()
    
    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    console.error('Error updating blog post:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to update blog post'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    console.log('API: Deleting blog post', id)

    await writeClient.delete(id)
    
    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' })
  } catch (error: unknown) {
    console.error('Error deleting blog post:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete blog post'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
} 