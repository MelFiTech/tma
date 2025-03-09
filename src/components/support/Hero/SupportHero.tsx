import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Header } from '@/components/common/Header/Header'
import Image from 'next/image'

export const SupportHero = () => {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[550px] px-4 sm:px-6 lg:px-20">
      <Image
        src="/images/support-hero.png"
        alt="Support Hero Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <Header />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto relative h-full">
        <AnimatedSection className="flex items-center justify-left h-full pt-32 sm:pt-40 md:pt-48">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-2px] sm:tracking-[-3px] md:tracking-[-4px] mb-4 sm:mb-6">
              Support & Donations
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 tracking-[-0.5px] sm:tracking-[-1px]">
              {"Transform a Child's Future – Join Our Mission"}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}