import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Header } from '@/components/common/Header/Header'
import Image from 'next/image'

export const ProgramHero = () => {
  return (
    <section className="relative w-full min-h-[550px] px-4 sm:px-6 lg:px-20">
      <Image
        src="/images/programs-hero.png"
        alt="Programs Hero Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <Header />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto relative h-full">
        <AnimatedSection className="flex items-center justify-left h-full pt-48">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white tracking-[-4px] mb-6">
              Our Programs
            </h1>
            <p className="text-white/80 text-xl tracking-[-1px]">
              Comprehensive education that nurtures both academic excellence and character development
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}