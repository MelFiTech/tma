'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TeamCard } from '../TeamCard'

interface TeamMember {
  name: string
  title: string
  image: string
  department: string
  location: string
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Taofeek A. Fowotade",
    title: "Principal",
    image: "team/placeholder1",
    department: "Administration",
    location: "Katsina",
    bio: "Mallam Taofeek is a seasoned educator with a rich educational background in teaching and linguistics. He has taught across various educational levels, from nursery to tertiary institutions, in both Nigeria and the Niger Republic. His extensive experience has equipped him with a unique understanding of the educational landscape.\n\nAs a school administrator, Mallam Fowotade has held key positions, including Head of Department, Vice Principal, and Principal of schools. He has developed academic calendars, trained teachers, and established operational policies for schools, showcasing his expertise in educational leadership.\n\nCurrently, Mallam Fowotade serves as the Principal at the Magnet Academy at Alhuda Katsina, where he continues to make a positive impact on students and the educational community. His dedication to education is evident in his work, inspiring students and fostering a love for learning."
  },
  {
    name: "Sumayya Abubakar Yakubu",
    title: "School Nurse", 
    image: "team/placeholder2",
    department: "Medical",
    location: "Katsina",
    bio: "Sumayya Abubakar Yakubu is a dedicated school nurse from Bauchi State with a Bachelor of Science degree in Pharmacology. As a compassionate and health-conscious professional, she plays a vital role in promoting student well-being through health education, first aid, and routine medical care. Her background in pharmacology equips her with the knowledge to support preventive healthcare and manage minor ailments effectively within the school environment."
  },
  {
    name: "Abubakar Ismail",
    title: "School Imam/Islamic Studies & Qur'an Teacher",
    image: "team/placeholder3", 
    department: "Academic",
    location: "Katsina",
    bio: "Abubakar Ismail is a dedicated Islamic scholar and educator from Kankara Local Government Area of Katsina State, Nigeria. A graduate of Arabic Language, he brings deep knowledge and experience in leading Islamiyyah schools. He currently serves as the school Imam as well as the Islamic Studies and Qur'an teacher, guiding students in both religious knowledge and moral upbringing as well Qur'an memorisation. His passion for teaching and spiritual leadership makes him a respected figure within the school community."
  },
  {
    name: "Mika'ilu Isyaku",
    title: "Housemaster",
    image: "team/placeholder4",
    department: "Administration",
    location: "Katsina",
    bio: "Mika'ilu Isyaku is a committed and disciplined housemaster who plays a key role in ensuring the welfare, safety, and moral guidance of our pupils. With a calm and approachable demeanor, he fosters a supportive living environment that promotes discipline, responsibility, and academic focus. Mika'ilu supervises the school maintenance as well."
  },
  {
    name: "Maryam Abbas",
    title: "School Matron & Cook",
    image: "team/placeholder5",
    department: "Support",
    location: "Katsina",
    bio: "Maryam Abbas is a compassionate and hardworking school matron who goes beyond providing hostel care to support the overall well-being of students. With added knowledge in Islamic education, she nurtures both the physical and spiritual growth of the children. In addition to her matron duties, she is also an experienced cook, ensuring students are well-fed with nutritious and balanced meals. Her motherly care, moral guidance, and culinary skills make her a beloved and trusted presence in the school community."
  },
  {
    name: "Maryam Abdullahi",
    title: "Science Teacher",
    image: "team/placeholder6",
    department: "Academic",
    location: "Katsina",
    bio: "Maryam is a passionate and committed science teacher from Borno State. She holds a Bachelor of Science in Biology Education (B.Sc.Ed), which combines strong scientific knowledge with effective teaching strategies. With her background, she inspires curiosity and critical thinking in her students, making science engaging and accessible. Maryam is dedicated to nurturing the next generation of scientists through hands-on learning and a supportive classroom environment."
  },
  {
    name: "Shakira Akanbi O.",
    title: "Literacy Teacher",
    image: "team/placeholder7",
    department: "Academic",
    location: "Katsina",
    bio: "Akanbi Shakirat Oyindamola is a passionate literacy teacher from Oyo State. She holds a degree in Library and Information Science and is committed to building strong reading and writing skills in young learners. With a deep understanding of language development, she creates engaging and supportive learning environments that foster a lifelong love for reading. Her dedication to literacy education helps students gain the foundational skills they need for academic success."
  },
  {
    name: "Umar Ibrahim Adamu",
    title: "School Guard II",
    image: "team/placeholder8",
    department: "Security",
    location: "Katsina",
    bio: "Umar Ibrahim Adamu is a dedicated security professional from Katsina State. He holds a diploma and brings several years of experience in security services, having worked in both Abuja and Bauchi. Known for his vigilance and discipline, Umar is currently one of the security guards at Magnet Academy, Al-Huda, Katsina. His commitment to maintaining a safe and secure environment makes him a valued member of the school community."
  },
  {
    name: "Sani Abdullahi",
    title: "School Guard I",
    image: "team/placeholder9",
    department: "Security",
    location: "Katsina",
    bio: "Sani Abdullahi is a highly experienced security guard with over twenty years of dedicated service in various security companies and corporate organizations. His extensive knowledge, discipline, and leadership skills have earned him the position of the most senior guard on our team. Sani is deeply committed to ensuring the safety and security of lives and property, and he serves as a role model to younger guards through his professionalism and sense of duty."
  }
]

export const Team = () => {
  const [selectedLocation, setSelectedLocation] = useState('Katsina')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Add all potential locations, including inactive ones
  const allLocations = ['Katsina', 'Kaduna', 'Abuja', 'Lagos']

  const filteredMembers = teamMembers.filter(member => 
    member.location === selectedLocation
  )

  const openModal = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const closeModal = () => {
    setSelectedMember(null)
  }

  return (
    <section className="py-12 md:py-20 bg-[#F8F9FA] px-4 sm:px-6 lg:px-20">
      <div className="container mx-auto">
        {/* Location Tabs */}
        <div className="flex justify-center mb-8 space-x-4 overflow-x-auto">
          {allLocations.map(location => (
            <button
              key={location}
              onClick={() => location === 'Katsina' && setSelectedLocation(location)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                selectedLocation === location
                  ? 'bg-[#84368C] text-white rounded-2xl'
                  : location === 'Katsina' 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={location !== 'Katsina'}
            >
              {location}
              {location !== 'Katsina' && ' (Coming Soon)'}
            </button>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl md:text-4xl leading-[1.2] tracking-tighter mb-4 text-gray-900 font-bold text-center"
        >
          THE MAGNET ACADEMY AT ALHUDA {selectedLocation.toUpperCase()}
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-xl md:text-2xl leading-[1.2] tracking-tighter mb-8 md:mb-16 text-gray-700 font-semibold text-center"
        >
          STAFF PROFILE
        </motion.h3>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TeamCard {...member} onClick={() => openModal(member)} />
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-[95%] md:w-full md:max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-start md:items-center justify-between gap-3">
                  <div className="flex items-start md:items-center gap-3 md:gap-4">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <div className="text-gray-500 text-base md:text-lg font-bold">
                          {selectedMember.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg md:text-2xl tracking-tighter text-gray-900 font-bold">
                        {selectedMember.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">{selectedMember.title}</p>
                      <p className="text-xs md:text-sm text-gray-500">{selectedMember.department} • {selectedMember.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 p-1.5 md:p-2"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 md:p-6">
                <div className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedMember.bio}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}