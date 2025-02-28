import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Header } from '@/components/common/Header/Header'
import Image from 'next/image'

export const ProjectHero = () => {
  return (
    <section className="relative w-full min-h-[550px]">
      <Image
        src="/images/projects-hero.png"
        alt="Projects Hero Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <Header />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4 relative h-full">
        <AnimatedSection className="flex items-center justify-left h-full pt-48">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white tracking-[-4px] mb-6">
              Our Projects
            </h1>
            <p className="text-white/80 text-xl tracking-[-1px]">
              Building a brighter future through education and infrastructure development
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
} 