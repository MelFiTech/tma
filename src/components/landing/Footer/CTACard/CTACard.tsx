import { Button } from '@/components/common/Button'
import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const CTACard = () => {
  return (
    <AnimatedSection className="bg-[#5a2662] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-16 text-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-white tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] mb-4 leading-tight sm:leading-[1.2] lg:leading-[74px]">
          Give Hope, Change Lives<br />
          Every Donation Counts
        </h2>
        <Button 
          variant="primary"
          className="bg-white !text-[#5a2662] px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-base font-semibold tracking-[-0.5px] sm:tracking-[-1px] hover:bg-gray-100 transition-colors"
        >
          Donate Now
        </Button>
      </div>
    </AnimatedSection>
  )
} 