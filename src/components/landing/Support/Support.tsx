import Image from 'next/image'
import { CTA } from './CTA'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Support = () => {
  return (
    <AnimatedSection className="w-full pt-12 sm:pt-16 md:pt-20 pb-32 sm:pb-48 md:pb-64 bg-white px-4 sm:px-6 lg:px-20">
      <div className="container mx-auto">
        {/* Image Container */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] pt-8 sm:pt-16 md:pt-24">
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[calc(100%- -2rem)] sm:w-[90%] md:w-[85%] lg:w-[90%]">
            <CTA />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}