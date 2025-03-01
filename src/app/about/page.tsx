import { Metadata } from 'next'
import { Footer } from '@/components/landing/Footer'
import { Who } from '@/components/about/Who'
import { AboutHero } from '@/components/about/Hero'
import { WhyWeExist } from '@/components/about/WhyWeExist'
import { Leadership } from '@/components/about/Leadership'

export const metadata: Metadata = {
  title: 'About Us - TMA',
  description: 'Learn more about The Magnet Academy',
}

export default function About() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <AboutHero />

        {/* Who We Are Section */}
        <Who />


        {/* Why We Exist Section */}
        <WhyWeExist />

        <Leadership />

        <div className="h-[200px]" />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
} 