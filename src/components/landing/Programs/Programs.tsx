import { ProgramCard } from './ProgramCard'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Programs = () => {
  const programs = [
    {
      title: "STEM & Technology Focus",
      description: "In today's fast-evolving world, STEM (Science, Technology, Engineering, and Mathematics) is key to unlocking opportunities",
      image: "/images/image3.png",
      imageAlt: "STEM Education"
    },
    {
      title: "Islamic & Arabic Language Studies", 
      description: "Alongside Western education, we provide deep-rooted Islamic teachings to nurture moral values, discipline, and a strong spiritual identity.",
      image: "/images/image4.png",
      imageAlt: "Islamic Studies"
    },
    {
      title: "Sports Development – Football & Beyond",
      description: "We believe in the power of sports to build discipline, teamwork, and leadership. Football is at the heart of our sports program",
      image: "/images/image5.png",
      imageAlt: "Sports Development"
    }
  ]

  return (
    <AnimatedSection className="w-full py-12 md:py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <span className="text-[#5a2662] uppercase tracking-wider font-semibold text-sm md:text-base">
            Programs & Curriculum
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 tracking-[-1px] text-gray-900">
            A Holistic Education for the Modern World
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto tracking-[-0.5px]">
            At The Magnet Academy, we blend Western education, Islamic studies, and sports to equip students with knowledge, skills, and strong values for global success.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="space-y-4 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {programs.slice(0, 2).map((program, index) => (
              <ProgramCard
                key={index}
                {...program}
              />
            ))}
          </div>
          
          <div className="w-full">
            <ProgramCard
              {...programs[2]}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}