import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'

export const Stem = () => {
  const features = [
    {
      title: 'Mathematics & Science',
      description: 'Building analytical and problem-solving skills.'
    },
    {
      title: 'Technology & Coding',
      description: 'Hands-on learning in programming, robotics, and AI.'
    },
    {
      title: 'Engineering & Innovation',
      description: 'Encouraging creativity and real-world application.'
    },
    {
      title: 'Entrepreneurship & Leadership',
      description: 'Preparing students for business and career success.'
    }
  ]

  return (
    <AnimatedSection className="w-full py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#F9F9FB] p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Content Section */}
            <div className="flex-1 w-full">
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-gray-900 tracking-[-1px] sm:tracking-[-2px] md:tracking-[-4px] mb-2 sm:mb-4">
                STEM & Technology Focus
              </h2>
              <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] sm:tracking-[-1px] leading-relaxed mb-4 sm:mb-6">
                {"In today's fast-evolving world, STEM (Science, Technology, Engineering, and Mathematics) is key to unlocking opportunities. Our modern curriculum ensures that students are prepared for the future with:"}
              </p>

              <div className="space-y-4 sm:space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#6B2D75] tracking-[-0.5px] sm:tracking-[-1px]">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] sm:tracking-[-1px]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] leading-relaxed mt-6 sm:mt-8 mb-6 sm:mb-8">
                {"Our students are equipped with advanced STEM skills through hands-on learning and modern technology."}
              </p>

              <Button 
                variant="primary"
                className="w-full sm:w-auto bg-[#6B2D75] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full"
              >
                Donate Now
              </Button>
            </div>

            {/* Image Section */}
            <div className="flex-1 w-full">
              <div className="relative h-[300px] sm:h-[500px] md:h-[600px] lg:h-[800px] w-full">
                <Image
                  src="/images/stem-student.png"
                  alt="Student using VR headset"
                  fill
                  className="object-cover rounded-2xl sm:rounded-3xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}