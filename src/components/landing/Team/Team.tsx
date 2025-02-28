import { TeamCard } from './TeamCard'
import { Button } from '@/components/common/Button'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const Team = () => {
  const teamMembers = [
    {
      name: "William B. Harris",
      role: "UX/UI Designer", 
      image: "/images/image9.png",
    },
    {
      name: "Jane Smith",
      role: "Head of Education",
      image: "/images/team/jane.png",
    },
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "/images/team/john.png",
    }
    // Add more team members as needed...
  ]

  return (
    <AnimatedSection className="w-full py-12 sm:py-16 md:py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-2px] text-gray-900 mb-4 sm:mb-6">
            The great minds behind our work
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto tracking-[-1px]">
            Together, our board ensures The Magnet Academy continues to grow, innovate, and provide high-quality education to those who need it most.
          </p>
        </div>

        {/* Team Grid */}
        <div className="w-full overflow-x-auto md:overflow-visible">
          <div className="flex flex-col md:flex-row gap-6 md:flex-wrap justify-center min-w-max md:min-w-0 pb-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="w-full md:w-[calc(33.33%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <TeamCard {...member} />
              </div>
            ))}
          </div>
        </div>

        {/* Join Team Section */}
        <div className="mt-10 sm:mt-16 bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-1px] text-gray-900 text-center sm:text-left">
              Join our team
            </h3>
            <Button 
              variant="primary"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#5a2662] text-white rounded-full font-semibold tracking-[-1px] hover:bg-[#4a1f52] transition-colors"
            >
              Join The Team
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}