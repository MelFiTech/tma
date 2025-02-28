import Image from 'next/image'
import { Button } from '@/components/common/Button'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const AboutUs = () => {
  return (
    <AnimatedSection className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 flex-1 w-full">
            <Image
              src="/images/image1.png"
              alt="Student playing"
              width={400}
              height={500}
              className="rounded-3xl w-full h-[300px] md:h-[500px] object-cover md:-mt-10"
            />
            <Image
              src="/images/image2.png"
              alt="Group of students"
              width={400}
              height={500}
              className="rounded-3xl w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <span className="text-[#6B2D75] uppercase tracking-wider font-medium text-sm md:text-base">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-gray-900 font-bold mt-3 md:mt-4 mb-4 md:mb-6 tracking-[-1px] leading-tight">
              Building a Brighter Future for Orphans and Underprivileged Children
            </h2>
            <p className="text-gray-700 mb-6 md:mb-8 tracking-[-0.5px] leading-relaxed text-sm md:text-base">
              Create a world where every child, regardless of their background, has access to quality education and the opportunity to reach their full potential
            </p>
            <Button 
              variant="primary" 
              size="lg"
              bgColor="bg-[#6B2D75]"
              textColor="text-white"
              hoverBgColor="hover:bg-[#5a2662]"
              className="w-full md:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}