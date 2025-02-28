import { Metadata } from 'next'
import { Footer } from '@/components/landing/Footer'
import { KatsinaCampus } from '@/components/projects/KatsinaCampus'
import { CampusGallery } from '@/components/projects/CampusGallery'

export const metadata: Metadata = {
  title: 'Our Projects - TMA',
  description: 'Explore our ongoing and completed projects at The Magnet Academy',
}

export default function Projects() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        {/* Katsina Campus Section */}
        <KatsinaCampus />

        {/* Campus Gallery */}
        <CampusGallery />

        <div className="h-[160px]" />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
} 