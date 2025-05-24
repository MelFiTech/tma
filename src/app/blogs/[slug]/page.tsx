import { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/common/Header/Header'
import { Footer } from '@/components/landing/Footer'
import { client, urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { ResolvingMetadata } from 'next'
import { PortableText, PortableTextComponents } from '@portabletext/react'

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

async function getBlogPost(slug: string): Promise<SanityBlogPost | null> {
  try {
    const post = await client.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
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
    `, { slug })

    return post || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - TMA',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} - TMA Blog`,
    description: post.excerpt || 'Read this blog post from TMA',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Read this blog post from TMA',
      images: post.featuredImage ? [urlFor(post.featuredImage).width(1200).height(630).url()] : [],
    }
  }
}

// Simple content renderer for PortableText
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (typeof value === 'object' && value !== null && 'alt' in value) {
        return (
          <div className="my-8">
            <Image
              src={urlFor(value).width(800).height(600).url()}
              alt={(typeof value.alt === 'string' ? value.alt : '') || 'Blog image'}
              width={800}
              height={600}
              className="rounded-lg"
            />
            {typeof value.alt === 'string' && value.alt && (
              <p className="text-sm text-gray-700 mt-2 text-center italic">{value.alt}</p>
            )}
          </div>
        )
      }
      return null
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || '#'
      return (
        <a href={href} className="text-[#4a1e52] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
  },
}

export default async function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Calculate read time based on content
  const calculateReadTime = (content: unknown[]): string => {
    if (!content || !Array.isArray(content)) return '5 min'
    
    const wordCount = content.reduce((count: number, block) => {
      if (typeof block === 'object' && block !== null && '_type' in block && block._type === 'block' && 'children' in block && Array.isArray(block.children)) {
        const blockText = block.children
          .filter((child: unknown) => 
            typeof child === 'object' && 
            child !== null && 
            '_type' in child && 
            child._type === 'span'
          )
          .map((child: unknown) => {
            if (typeof child === 'object' && child !== null && 'text' in child && typeof child.text === 'string') {
              return child.text
            }
            return ''
          })
          .join(' ')
        return count + blockText.split(' ').length
      }
      return count
    }, 0)
    
    const readTime = Math.ceil(wordCount / 200) // Average reading speed: 200 words per minute
    return `${readTime} min`
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const readTime = calculateReadTime(post.content || [])
  const publishDate = post.publishedAt ? formatDate(post.publishedAt) : formatDate(post._createdAt)

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <header className="fixed top-0 left-0 w-full z-50 bg-black/70">
          <div className="container mx-auto px-4 flex justify-center">
            <Header />
          </div>
        </header>

        <div className="relative h-[600px] w-full">
          <Image
            src={post.featuredImage ? urlFor(post.featuredImage).width(1200).height(600).url() : '/images/stem-student.png'}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-white">
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#5a2662] mb-4 capitalize font-medium">
                  {post.category}
                </span>
                <h1 className="text-[48px] font-bold tracking-[-4px] leading-[1.1] mb-4 text-white">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-white/90 font-medium">
                  <span>{publishDate}</span>
                  <span>•</span>
                  <span>{readTime} read</span>
                  <span>•</span>
                  <span>By {post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {post.excerpt && (
              <div className="text-xl text-gray-800 mb-8 font-medium leading-relaxed">
                {post.excerpt}
              </div>
            )}
            
            {post.content && Array.isArray(post.content) && post.content.length > 0 ? (
              <div className="prose prose-lg max-w-none">
                <PortableText 
                  value={post.content as never} 
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <p className="text-gray-700 italic">No content available.</p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <div className="h-[160px]" />

        <Footer />
      </main>
    </>
  )
}