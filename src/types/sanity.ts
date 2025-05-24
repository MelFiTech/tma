export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content?: unknown[] // Portable Text
  featuredImage?: SanityImage
  category: 'education' | 'sports' | 'community' | 'news' | 'events'
  tags?: string[]
  author: string
  publishedAt: string
  featured: boolean
}

export interface TeamMember {
  _id: string
  name: string
  title: string
  bio: string
  image?: SanityImage
  department: 'Administration' | 'Academic' | 'Medical' | 'Support' | 'Security' | 'Leadership'
  location: 'Katsina' | 'Kaduna' | 'Abuja' | 'Lagos'
  linkedIn?: string
  order?: number
  isActive: boolean
} 