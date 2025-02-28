import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'

export const Sports = () => {
  const features = [
    {
      title: 'Develop Athletic Skills',
      description: 'High-quality coaching to enhance performance.'
    },
    {
      title: 'Foster Team Spirit', 
      description: 'Learning collaboration, strategy, and perseverance.'
    },
    {
      title: 'Compete & Excel',
      description: 'Exposure to local and international competitions.'
    },
    {
      title: 'Earn Scholarships',
      description: 'Standing out for college athletics and professional sports pathways.'
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
                Sports Development – Football & Beyond
              </h2>
              <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] sm:tracking-[-1px] leading-relaxed mb-4 sm:mb-6">
                We believe in the power of sports to build discipline, teamwork, and leadership. Football is at the heart of our sports program, providing students with opportunities to:
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
                Our football program is designed to train future stars while also helping students secure scholarships at top universities worldwide.
              </p>

              <Button 
                variant="primary"
                className="bg-[#6B2D75] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full"
              >
                Donate Now
              </Button>
            </div>

            {/* Image Section */}
            <div className="flex-1 w-full">
              <div className="relative h-[300px] sm:h-[500px] md:h-[600px] lg:h-[800px] w-full">
                <Image
                  src="/images/sports.png"
                  alt="Sports Activities"
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