import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const WhyWeExist = () => {
  const points = [
    {
      title: 'A Crisis in Education',
      description: 'Nigeria has one of the highest numbers of out-of-school children globally, with over 12 million lacking access to formal education.'
    },
    {
      title: 'Orphaned and Vulnerable', 
      description: 'Many children have lost their parents due to conflict, poverty, and disease, leaving them without the resources for a stable future.'
    },
    {
      title: 'Bridging the Gap',
      description: 'The Magnet Academy steps in to fill this gap by offering a safe, nurturing, and academically rigorous environment for these children'
    }
  ]

  return (
    <AnimatedSection className="w-full py-12 sm:py-16 md:py-20 bg-white px-4 sm:px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Content Section */}
          <div className="flex-1 w-full">
            {/* Why We Exist Section */}
            <div className="mb-4 sm:mb-5 bg-[#F9F9FB] p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px] text-gray-900">
                  Why We Exist
                </h2>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {points.map((point, index) => (
                  <div key={index} className="space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {point.title}:
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Growth And Future Section */}
            <div className="bg-[#F9F9FB] p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px] text-gray-900">
                  Our Growth And Future
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] leading-relaxed">
                While our work began in Katsina, Nigeria, we are expanding our impact with the development of a new campus in Ghana, allowing us to reach even more children in need.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 w-full">
            <div className="relative h-[300px] sm:h-[450px] md:h-[550px] lg:h-[650px] w-full">
              <Image
                src="/images/students-with-teacher.png"
                alt="Students with teacher"
                fill
                className="object-cover object-top lg:object-center rounded-2xl sm:rounded-3xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}