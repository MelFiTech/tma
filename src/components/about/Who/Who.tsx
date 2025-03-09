import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Who = () => {
  const missionPoints = [
    {
      title: 'Educate',
      description: 'Provide a world-class curriculum integrating Western education and Islamic teachings.'
    },
    {
      title: 'Empower',
      description: 'Equip students with critical thinking, leadership, and problem-solving skills to excel in the modern world.'
    },
    {
      title: 'Uplift',
      description: 'Support children emotionally, socially, and spiritually, ensuring they grow into confident and responsible individuals.'
    },
    {
      title: 'Transform',
      description: 'Create a ripple effect of change by developing future leaders who will uplift their communities.'
    }
  ]

  return (
    <AnimatedSection className="w-full py-12 sm:py-16 md:py-20 bg-white px-4 sm:px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Image Section */}
          <div className="flex-1 w-full">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[1001px]">
              <Image
                src="/images/student-walking.png"
                alt="Student walking"
                fill
                className="object-cover object-top lg:object-center rounded-2xl sm:rounded-3xl"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 w-full">
            {/* Who We Are Section */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px] text-gray-900">
                  Who We Are
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] leading-relaxed">
                  The Magnet Academy is more than just a school—it is a beacon of hope for orphans and underprivileged children in Katsina, Nigeria, and beyond. We provide a holistic education that combines academic excellence, character development, and spiritual growth, equipping our students with the tools to thrive in a global society.
                </p>
                <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] leading-relaxed">
                  Founded on the belief that education is the most powerful tool for change, our academy is dedicated to nurturing young minds, instilling values, and fostering leadership in every child we serve.
                </p>
              </div>
            </div>

            {/* Our Mission Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px] text-gray-900">
                  Our Mission
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {missionPoints.map((point, index) => (
                  <AnimatedSection 
                    key={index}
                    className="p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl"
                    delay={index * 0.1}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-[#6B2D75] mb-1 sm:mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px]">
                      {point.description}
                    </p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
} 