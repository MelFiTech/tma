import { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/common/Header/Header'
import { Footer } from '@/components/landing/Footer'
import { getBlogPost } from '@/data/blogs'
import { notFound } from 'next/navigation'

// Add SearchParams type for Next.js pages
type SearchParams = { [key: string]: string | string[] | undefined }

// Add proper types for Next.js page props
type PageProps = {
  params: { slug: string }
  searchParams: SearchParams
}

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - TMA',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} - TMA Blog`,
    description: post.excerpt
  }
}

export default async function BlogPost({ 
  params, 
  // Use underscore to indicate this parameter is required but unused
  _searchParams: searchParams 
}: PageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <main className="flex min-h-screen flex-col">
        <header className="fixed top-0 left-0 w-full z-50 bg-black/70">
          <div className="container mx-auto px-4 flex justify-center">
            <Header variant="black" />
          </div>
        </header>

        <div className="relative h-[600px] w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-white">
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#5a2662] mb-4">
                  {post.category}
                </span>
                <h1 className="text-[48px] font-bold tracking-[-4px] leading-[1.1] mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-black prose-ul:text-black prose-li:text-black prose-strong:text-black prose-a:text-black text-black"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        <div className="h-[160px]" />

        <Footer />
      </main>
    </>
  )
}