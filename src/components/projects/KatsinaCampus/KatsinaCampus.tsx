import { AnimatedSection } from '@/components/common/AnimatedSection'
import { ProjectCard } from '../ProjectCard'
import { Header } from '@/components/common/Header/Header'

export const KatsinaCampus = () => {
  const facilities = [
    {
      title: 'Classroom Blocks',
      description: 'Spacious, well-lit, and technology-enabled learning spaces.'
    },
    {
      title: 'Male & Female Hostels', 
      description: 'Safe, comfortable accommodations to foster a sense of home.'
    },
    {
      title: 'Masjid',
      description: 'A dedicated place of worship and spiritual reflection.'
    },
    {
      title: 'Library & Study Halls',
      description: 'Resources for research, learning, and personal development.'
    },
    {
      title: 'Science & Technology Labs',
      description: 'Hands-on STEM education with modern equipment.'
    },
    {
      title: 'Sports Complex & Football Pitch',
      description: 'A training ground for student-athletes.'
    },
    {
      title: 'Admin Block',
      description: 'There are offices for staffs, a clinic and an auditorium for meetings.'
    },
    {
      title: 'Dining & Recreation Areas',
      description: 'Spaces that promote well-being and community.'
    }
  ]

  return (
    <>
      <div className="w-full flex justify-center">
        <Header />
      </div>
      <AnimatedSection className="relative w-full py-20">
        <div className="absolute inset-0 bg-[url('/images/katsina-campus.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mb-20 mt-20">
            <h2 className="text-[48px] font-bold text-white tracking-[-4px] mb-6">
              Our Katsina, Nigeria Campus
            </h2>
            <p className="text-white/80 text-lg tracking-[-1px]">
              Our state-of-the-art campus in Katsina, Nigeria, is designed to cater to the unique needs of orphans and underprivileged children. It includes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <ProjectCard
                key={index}
                title={facility.title}
                description={facility.description}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}