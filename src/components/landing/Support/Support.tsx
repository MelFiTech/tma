import Image from 'next/image'
import { CTA } from './CTA'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Support = () => {
  return (
    <AnimatedSection className="w-full pt-12 sm:pt-16 md:pt-20 pb-32 sm:pb-48 md:pb-64 bg-white">
      <div className="container mx-auto px-4">
        {/* Image Container */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] px-4 sm:px-12 md:px-24 pt-8 sm:pt-16 md:pt-24">
          <div className="rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden h-full">
            <Image
              src="/images/image8.png"
              alt="Students in blue uniforms"
              fill
              className="object-cover rounded-[12px] sm:rounded-[16px] md:rounded-[20px]"
            />
            <div className="absolute inset-0 bg-black/50 rounded-[12px] sm:rounded-[16px] md:rounded-[20px]" />
          </div>
          
          {/* Content overlapping the image */}
          <div className="absolute bottom-0 left-[-0] sm:left-8 md:left-24 translate-y-1/2 w-[90%] sm:w-[85%] md:w-3/4">
            <CTA />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}