const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '0zvpcao3',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to get this from Sanity manage
})

const teamMembers = [
  {
    _type: 'teamMember',
    name: "Taofeek A. Fowotade",
    title: "Principal",
    department: "Administration",
    location: "Katsina",
    bio: "Mallam Taofeek is a seasoned educator with a rich educational background in teaching and linguistics. He has taught across various educational levels, from nursery to tertiary institutions, in both Nigeria and the Niger Republic. His extensive experience has equipped him with a unique understanding of the educational landscape.\n\nAs a school administrator, Mallam Fowotade has held key positions, including Head of Department, Vice Principal, and Principal of schools. He has developed academic calendars, trained teachers, and established operational policies for schools, showcasing his expertise in educational leadership.\n\nCurrently, Mallam Fowotade serves as the Principal at the Magnet Academy at Alhuda Katsina, where he continues to make a positive impact on students and the educational community. His dedication to education is evident in his work, inspiring students and fostering a love for learning.",
    order: 1,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Sumayya Abubakar Yakubu",
    title: "School Nurse",
    department: "Medical",
    location: "Katsina",
    bio: "Sumayya Abubakar Yakubu is a dedicated school nurse from Bauchi State with a Bachelor of Science degree in Pharmacology. As a compassionate and health-conscious professional, she plays a vital role in promoting student well-being through health education, first aid, and routine medical care. Her background in pharmacology equips her with the knowledge to support preventive healthcare and manage minor ailments effectively within the school environment.",
    order: 2,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Abubakar Ismail",
    title: "School Imam/Islamic Studies & Qur'an Teacher",
    department: "Academic",
    location: "Katsina",
    bio: "Abubakar Ismail is a dedicated Islamic scholar and educator from Kankara Local Government Area of Katsina State, Nigeria. A graduate of Arabic Language, he brings deep knowledge and experience in leading Islamiyyah schools. He currently serves as the school Imam as well as the Islamic Studies and Qur'an teacher, guiding students in both religious knowledge and moral upbringing as well Qur'an memorisation. His passion for teaching and spiritual leadership makes him a respected figure within the school community.",
    order: 3,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Mika'ilu Isyaku",
    title: "Housemaster",
    department: "Administration",
    location: "Katsina",
    bio: "Mika'ilu Isyaku is a committed and disciplined housemaster who plays a key role in ensuring the welfare, safety, and moral guidance of our pupils. With a calm and approachable demeanor, he fosters a supportive living environment that promotes discipline, responsibility, and academic focus. Mika'ilu supervises the school maintenance as well.",
    order: 4,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Maryam Abbas",
    title: "School Matron & Cook",
    department: "Support",
    location: "Katsina",
    bio: "Maryam Abbas is a compassionate and hardworking school matron who goes beyond providing hostel care to support the overall well-being of students. With added knowledge in Islamic education, she nurtures both the physical and spiritual growth of the children. In addition to her matron duties, she is also an experienced cook, ensuring students are well-fed with nutritious and balanced meals. Her motherly care, moral guidance, and culinary skills make her a beloved and trusted presence in the school community.",
    order: 5,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Maryam Abdullahi",
    title: "Science Teacher",
    department: "Academic",
    location: "Katsina",
    bio: "Maryam is a passionate and committed science teacher from Borno State. She holds a Bachelor of Science in Biology Education (B.Sc.Ed), which combines strong scientific knowledge with effective teaching strategies. With her background, she inspires curiosity and critical thinking in her students, making science engaging and accessible. Maryam is dedicated to nurturing the next generation of scientists through hands-on learning and a supportive classroom environment.",
    order: 6,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Shakira Akanbi O.",
    title: "Literacy Teacher",
    department: "Academic",
    location: "Katsina",
    bio: "Akanbi Shakirat Oyindamola is a passionate literacy teacher from Oyo State. She holds a degree in Library and Information Science and is committed to building strong reading and writing skills in young learners. With a deep understanding of language development, she creates engaging and supportive learning environments that foster a lifelong love for reading. Her dedication to literacy education helps students gain the foundational skills they need for academic success.",
    order: 7,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Umar Ibrahim Adamu",
    title: "School Guard II",
    department: "Security",
    location: "Katsina",
    bio: "Umar Ibrahim Adamu is a dedicated security professional from Katsina State. He holds a diploma and brings several years of experience in security services, having worked in both Abuja and Bauchi. Known for his vigilance and discipline, Umar is currently one of the security guards at Magnet Academy, Al-Huda, Katsina. His commitment to maintaining a safe and secure environment makes him a valued member of the school community.",
    order: 8,
    isActive: true,
  },
  {
    _type: 'teamMember',
    name: "Sani Abdullahi",
    title: "School Guard I",
    department: "Security",
    location: "Katsina",
    bio: "Sani Abdullahi is a highly experienced security guard with over twenty years of dedicated service in various security companies and corporate organizations. His extensive knowledge, discipline, and leadership skills have earned him the position of the most senior guard on our team. Sani is deeply committed to ensuring the safety and security of lives and property, and he serves as a role model to younger guards through his professionalism and sense of duty.",
    order: 9,
    isActive: true,
  }
]

async function populateTeamData() {
  console.log('Starting to populate team member data...')
  
  try {
    for (const member of teamMembers) {
      const result = await client.create(member)
      console.log(`Created team member: ${member.name} (ID: ${result._id})`)
    }
    console.log('Successfully populated all team member data!')
  } catch (error) {
    console.error('Error populating team data:', error)
  }
}

populateTeamData() 