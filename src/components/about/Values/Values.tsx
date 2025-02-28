import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Values = () => {
  const values = [
    {
      title: 'Excellence',
      description: 'Striving for the highest standards in education and character development',
      icon: (
        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
      )
    },
    {
      title: 'Integrity', 
      description: 'Building trust through honesty, transparency, and ethical conduct',
      icon: (
        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
      )
    },
    {
      title: 'Innovation',
      description: 'Embracing new ideas and methods to enhance learning experiences',
      icon: (
        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
      )
    },
  ]

  return (
    <AnimatedSection className="w-full py-12 sm:py-16 md:py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#6B2D75]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px] text-gray-900">
              Our Values
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-[56px] font-bold text-gray-900 tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px]">
            What We Stand For
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {values.map((value, index) => (
            <AnimatedSection
              key={index}
              className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-sm"
              delay={index * 0.2}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                {value.icon}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{value.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 tracking-[-0.3px] sm:tracking-[-0.5px]">
                {value.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}