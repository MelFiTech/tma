'use client'

import { motion } from 'framer-motion'
import { LeadershipCard } from './LeadershipCard'

const leaders = [
  {
    name: "Suhailat Mohamed",
    title: "Board Member", 
    bio: "Suhailat Mohamed is a dedicated professional with a background in office administration and medical billing and coding, currently pursuing her education at Guilford Technical Community College. She holds certifications as an Executive Director, phlebotomist, and in First Aid and CPR, showcasing her diverse skill set and commitment to service. As a mother of three and natural organizer, she excels in coordinating within both her household and community. Her passion for community development began in Ghana, West Africa, where she organized Islamic youth tournaments to inspire academic excellence. She is the founder of Islamic Ummah Relief (IUR), a global humanitarian organization, and serves as Director of Islamic Ummah Relief USA, leading initiatives for flood victims and feeding programs. Additionally, she founded Alhuda Learning Center in Greensboro, NC, running a weekend Islamic school and the Bint Al Nisaa youth mentorship program. Her journey reflects a lifetime dedication to empowering others and fostering community growth.",
    image: "team/suhailat",
    linkedIn: "https://linkedin.com/in/suhailat-mohamed"
  },

  {
    name: "Jamal Bagigah",
    title: "Board Member",
    bio: "Jamal Bagigah is an experienced audit and finance professional with over a decade of experience working for Fortune 500 companies. A Certified Public Accountant, Jamal holds an MBA from Rutgers Business School and a bachelor's degree in Accounting and Economics from the City University of New York. As a board member of The Magnet Academy, Jamal is dedicated to advancing the mission of providing quality education and opportunities for orphans and underprivileged children in West Africa. He is deeply passionate about the long-term development and transformation of underserved communities, leveraging tools such as education and sports to drive meaningful change. Outside of his professional and philanthropic pursuits, Jamal enjoys playing soccer and engaging in activities that promote teamwork and personal growth.",
    image: "team/jamal",
    linkedIn: "https://linkedin.com/in/jamal-bagigah"
  },
  {
    name: "Zaharaddeen Ibrahim",
    title: "Board Member",
    bio: "Zaharaddeen Ibrahim holds a Bachelor's degree in Science from Bayero University, Kano. He is the co-founder of Islamic Ummah Relief, a humanitarian organization, and Alhuda Learning Center in Greensboro, NC, which provides Islamic education and youth-focused programs. In addition to his nonprofit work, Zaharaddeen is the owner of Alhuda Logistics LLC, a Greensboro-based business specializing in logistics and transportation. He holds Hazmat and Tanker certifications, showcasing his expertise and dedication to safety and compliance in the transportation industry. His work exemplifies a balance between community service and entrepreneurial success",
    image: "team/zaharaddeen",
    linkedIn: "https://linkedin.com/in/zaharaddeen-ibrahim"
  },
  {
    name: "Abdul Malik Muftau",
    title: "Board Member",
    bio: "Abdul Malik Muftau has always valued the importance of mentorship, a lesson he embraced early on while mentoring his younger siblings. This sense of responsibility and leadership shaped his passion for managing and completing impactful projects. Malik firmly believes that by helping others, we are ultimately contributing to our collective well-being as part of a global community. A graduate of Columbia University, Malik earned a Master's degree in Economics and Education, where he developed a deep understanding of education, economic policy and the critical intersection between these fields. His academic background fuels his dedication to volunteering time and resources to uplift underprivileged communities. In his free time, Malik enjoys playing soccer and watching sports, finding joy in activities that foster teamwork and shared experiences.",
    image: "team/Abdulmalik",
    linkedIn: "https://linkedin.com/in/abdul-malik-muftau"
  },
  
]

export const Leadership = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-[56px] leading-[1.2] tracking-tighter mb-8 md:mb-16 text-gray-900 font-bold"
        >
          Our Leadership
        </motion.h2>

        <div className="grid grid-cols-1 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <LeadershipCard {...leader} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}