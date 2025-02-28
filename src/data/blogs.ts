export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
  type: 'Publications' | 'News' | 'Event' | 'Podcast'
  author: {
    name: string
    role: string
    avatar: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'request-for-proposal-2025',
    title: 'Request for Proposal for Access to Financial Services in Nigeria 2025 Survey',
    excerpt: 'We are seeking proposals for our upcoming financial services survey...',
    content: `
      <p>We are excited to announce our Request for Proposal (RFP) for the Access to Financial Services in Nigeria 2025 Survey. This comprehensive study aims to:</p>
      
      <ul>
        <li>Assess the current state of financial inclusion in Nigeria</li>
        <li>Identify barriers to accessing financial services</li>
        <li>Evaluate the impact of digital financial solutions</li>
        <li>Propose recommendations for policy makers and stakeholders</li>
      </ul>

      <p>The selected research partner will be responsible for:</p>

      <ul>
        <li>Designing and implementing the survey methodology</li>
        <li>Collecting data from a representative sample across all regions</li>
        <li>Analyzing the data and preparing comprehensive reports</li>
        <li>Presenting findings to key stakeholders</li>
      </ul>

      <p>Interested organizations should submit their proposals by December 31, 2024. The successful candidate will be announced in January 2025.</p>
    `,
    date: 'November 11, 2024',
    readTime: '3 Min',
    category: 'Publications',
    type: 'Publications',
    image: '/images/stem-student.png',
    author: {
      name: 'John Doe',
      role: 'Education Director',
      avatar: '/images/team/john.png'
    }
  },
  {
    id: 2,
    slug: 'stem-education-future',
    title: 'STEM Education: Preparing for the Future',
    excerpt: 'How our STEM program is equipping students with crucial skills for the modern world.',
    content: `
      <p>In today's rapidly evolving world, STEM education is more important than ever. Our comprehensive program focuses on:</p>
      
      <ul>
        <li>Hands-on learning experiences</li>
        <li>Real-world problem solving</li>
        <li>Technology integration</li>
        <li>Innovation and creativity</li>
      </ul>

      <p>Through our innovative curriculum, students develop critical thinking and problem-solving skills that are essential for success in the 21st century. Our approach combines:</p>

      <ul>
        <li>Project-based learning</li>
        <li>Advanced technology tools</li>
        <li>Industry partnerships</li>
        <li>Mentorship programs</li>
      </ul>

      <p>The results speak for themselves:</p>

      <ul>
        <li>90% of our students pursue STEM careers</li>
        <li>85% receive university scholarships</li>
        <li>95% report high job satisfaction</li>
      </ul>
    `,
    date: 'March 10, 2024',
    readTime: '4 min',
    category: 'STEM',
    type: 'News',
    image: '/images/stem-student.png',
    author: {
      name: 'Jane Smith',
      role: 'STEM Coordinator',
      avatar: '/images/team/jane.png'
    }
  },
  {
    id: 3,
    slug: 'annual-tech-conference-2024',
    title: 'Annual Technology Conference 2024: Innovation & Impact',
    excerpt: 'Join us for our biggest tech conference yet, featuring industry leaders and groundbreaking innovations.',
    content: `
      <p>We're excited to announce our Annual Technology Conference 2024! This year's theme focuses on:</p>
      
      <ul>
        <li>Artificial Intelligence and Machine Learning</li>
        <li>Sustainable Technology Solutions</li>
        <li>Digital Transformation</li>
        <li>Cybersecurity in the Modern Age</li>
      </ul>

      <p>Event Details:</p>

      <ul>
        <li>Date: June 15-17, 2024</li>
        <li>Venue: Tech Innovation Center</li>
        <li>Expected Attendance: 1000+ professionals</li>
      </ul>

      <p>Featured Speakers:</p>

      <ul>
        <li>Dr. Sarah Chen - AI Research Director, Google</li>
        <li>Mark Thompson - CTO, Microsoft</li>
        <li>Dr. Lisa Kumar - Cybersecurity Expert</li>
        <li>James Wilson - Digital Transformation Specialist</li>
      </ul>

      <p>Register now to secure your spot at this groundbreaking event!</p>
    `,
    date: 'June 15, 2024',
    readTime: '5 min',
    category: 'Technology',
    type: 'Event',
    image: '/images/stem-student.png',
    author: {
      name: 'Michael Chen',
      role: 'Tech Director',
      avatar: '/images/team/michael.png'
    }
  },
  {
    id: 4,
    slug: 'future-of-education-podcast',
    title: 'The Future of Education: A Discussion with Industry Experts',
    excerpt: 'Listen to our latest podcast episode featuring leading educators discussing the evolution of learning.',
    content: `
      <p>In this enlightening podcast episode, we explore:</p>
      
      <ul>
        <li>The impact of technology on education</li>
        <li>Personalized learning approaches</li>
        <li>The role of AI in education</li>
        <li>Future educational trends</li>
      </ul>

      <p>Key Discussion Points:</p>

      <ul>
        <li>How virtual reality is transforming classroom experiences</li>
        <li>The rise of adaptive learning platforms</li>
        <li>Preparing students for jobs that don't exist yet</li>
        <li>The importance of emotional intelligence in education</li>
      </ul>

      <p>Guest Speakers:</p>

      <ul>
        <li>Prof. David Brown - Harvard Education School</li>
        <li>Dr. Maria Garcia - EdTech Innovator</li>
        <li>Tom Anderson - Education Policy Expert</li>
      </ul>
    `,
    date: 'April 20, 2024',
    readTime: '30 min',
    category: 'Education',
    type: 'Podcast',
    image: '/images/stem-student.png',
    author: {
      name: 'Sarah Johnson',
      role: 'Education Specialist',
      avatar: '/images/team/sarah.png'
    }
  },
  {
    id: 5,
    slug: 'digital-literacy-initiative',
    title: 'Launching Our Digital Literacy Initiative',
    excerpt: 'A new program aimed at bridging the digital divide and empowering communities through technology education.',
    content: `
      <p>Our Digital Literacy Initiative focuses on:</p>
      
      <ul>
        <li>Basic computer skills training</li>
        <li>Internet safety and security</li>
        <li>Digital communication tools</li>
        <li>Online resource utilization</li>
      </ul>

      <p>Program Components:</p>

      <ul>
        <li>Weekly workshops in community centers</li>
        <li>One-on-one mentoring sessions</li>
        <li>Online learning resources</li>
        <li>Certification programs</li>
      </ul>

      <p>Impact Goals:</p>

      <ul>
        <li>Train 1000+ community members in 2024</li>
        <li>Establish 5 new digital learning centers</li>
        <li>Create a sustainable peer-learning network</li>
        <li>Partner with 20+ local businesses for internships</li>
      </ul>
    `,
    date: 'May 5, 2024',
    readTime: '6 min',
    category: 'Education',
    type: 'News',
    image: '/images/stem-student.png',
    author: {
      name: 'Robert Wilson',
      role: 'Program Director',
      avatar: '/images/team/robert.png'
    }
  }
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
} 