import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Read-only client for public data (can use CDN for better performance)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for better performance
})

// Write client for admin operations (server-side only, includes token)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for write operations
  token: process.env.SANITY_API_WRITE_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: Parameters<typeof builder.image>[0]) => {
  return builder.image(source)
}

// GROQ queries
export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  tags,
  author,
  publishedAt,
  featured
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
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
  featured
}`

export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember" && isActive == true] | order(order asc, name asc) {
  _id,
  name,
  title,
  bio,
  image,
  department,
  location,
  linkedIn,
  order,
  isActive
}`

export const TEAM_MEMBERS_BY_LOCATION_QUERY = `*[_type == "teamMember" && isActive == true && location == $location] | order(order asc, name asc) {
  _id,
  name,
  title,
  bio,
  image,
  department,
  location,
  linkedIn,
  order,
  isActive
}` 