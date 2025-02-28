import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { Button } from '@/components/common/Button'

export const Islamic = () => {
  const features = [
    {
      title: "Qur'an Memorization & Tafsir",
      description: 'Understanding and applying Islamic teachings.'
    },
    {
      title: 'Fiqh & Hadith Studies',
      description: 'Learning Islamic jurisprudence and prophetic traditions.'
    },
    {
      title: 'Arabic Language & Literacy',
      description: 'Enabling fluency in Arabic for deeper religious comprehension.'
    }
  ]

  return (
    <AnimatedSection className="w-full py-12 sm:py-16 md:py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4">
        <div className="bg-[#F9F9FB] p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Image Section */}
            <div className="flex-1 w-full">
              <div className="relative h-[300px] sm:h-[450px] md:h-[550px] lg:h-[700px] w-full">
                <Image
                  src="/images/islamic-studies.png"
                  alt="Islamic Studies"
                  fill
                  className="object-cover rounded-2xl sm:rounded-3xl"
                  priority
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 w-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] mb-3 sm:mb-4">
                Islamic & Arabic Language Studies
              </h2>
              <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] sm:tracking-[-1px] leading-relaxed mb-4">
                Alongside Western education, we provide deep-rooted Islamic teachings to nurture moral values, discipline, and a strong spiritual identity. Our Islamic studies program includes:
              </p>

              <div className="space-y-4 sm:space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#6B2D75] tracking-[-0.5px] sm:tracking-[-1px]">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-700 tracking-[-0.5px] leading-relaxed mt-6 sm:mt-8 mb-6 sm:mb-8">
                We ensure that students grow with a balance of spiritual wisdom and academic excellence.
              </p>

              <Button 
                variant="primary"
                className="w-full sm:w-auto bg-[#6B2D75] text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base"
              >
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}