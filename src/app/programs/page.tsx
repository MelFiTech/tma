import { Metadata } from 'next'
import { Footer } from '@/components/landing/Footer'
import { ProgramHero } from '@/components/programs/Hero'
import { Stem } from '@/components/programs/Stem'
import { Islamic } from '@/components/programs/Islamic'
import { Sports } from '@/components/programs/Sports'

export const metadata: Metadata = {
  title: 'Our Programs - TMA',
  description: 'Explore our comprehensive educational programs at The Magnet Academy',
}

export default function Programs() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <ProgramHero />

        {/* STEM Section */}
        <Stem />

        {/* Islamic Studies Section */}
        <Islamic />

        {/* Sports Section */}
        <Sports />

        <div className="h-[160px]" />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
} 