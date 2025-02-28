import { CampusCard } from './CampusCard'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Campus = () => {
  const campuses = [
    {
      date: "Aug 20th, 2024",
      title: "Our Katsina, Nigeria Campus",
      image: "/images/image6.png",
      imageAlt: "Katsina Campus"
    },
    {
      date: "May 28th, 2024",
      title: "Expanding Our Reach – Ghana Campus Development",
      image: "/images/image7.png",
      imageAlt: "Ghana Campus"
    }
  ]

  return (
    <AnimatedSection className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <span className="text-[#5a2662] uppercase tracking-[-0.5px] md:tracking-[-1px] font-semibold text-sm md:text-base">
            Campus and Facilities
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 tracking-[-1px] md:tracking-[-2px] text-gray-900">
            A Safe, Nurturing, and Inspiring Learning Environment
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto tracking-[-0.5px] md:tracking-[-1px]">
            At The Magnet Academy, we have built a modern, well-equipped campus designed to provide students with a safe, comfortable, and stimulating environment for learning and personal growth
          </p>
        </div>

        {/* Campus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {campuses.map((campus, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <CampusCard
                {...campus}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
} 