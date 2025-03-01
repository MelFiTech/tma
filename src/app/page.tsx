import { Metadata } from 'next'
import { Hero } from '@/components/landing/Hero/Hero'
import { AboutUs } from '@/components/landing/AboutUs'
import { Programs } from '@/components/landing/Programs'
import { Campus } from '@/components/landing/Campus'
import { Support } from '@/components/landing/Support'
import { News } from '@/components/landing/News'
import { Partners } from '@/components/landing/Partners'
import { Footer } from '@/components/landing/Footer'
import { Header } from '@/components/common/Header/Header'

export const metadata: Metadata = {
  title: 'TMA - Landing Page',
  description: 'Welcome to TMA',
}

export default function Home() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Header />
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center w-full overflow-x-hidden">
        <div className="w-full max-w-[100vw]">
          <Hero />
          <AboutUs />
          <Programs />
          <Campus />
          <Support />
          <div className="h-[60px] sm:h-[80px] md:h-[100px] bg-white"></div>
          <Partners />
          <News />
          <div className="h-[100px] sm:h-[120px] md:h-[150px]"></div>
          <Footer />
        </div>
      </main>
    </>
  )
}
