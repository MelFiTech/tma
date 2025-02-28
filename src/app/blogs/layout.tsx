import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - TMA',
  description: 'Read our latest updates and insights',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 