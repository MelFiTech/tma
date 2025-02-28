import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Features = () => {
  const features = [
    {
      title: 'Service 1',
      description: 'Description of service 1 goes here.',
    },
    {
      title: 'Service 2',
      description: 'Description of service 2 goes here.',
    },
    {
      title: 'Service 3',
      description: 'Description of service 3 goes here.',
    },
  ]

  return (
    <AnimatedSection className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#8F4996]">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              delay={index * 0.2}
            >
              <h3 className="text-xl font-semibold mb-2 text-[#8F4996]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
} 