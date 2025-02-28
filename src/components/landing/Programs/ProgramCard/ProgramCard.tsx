import Image from 'next/image'
import Link from 'next/link'

interface ProgramCardProps {
  title: string
  description: string
  image: string
  imageAlt: string
  className?: string
}

export const ProgramCard = ({ title, description, image, imageAlt, className }: ProgramCardProps) => {
  return (
    <div className={`rounded-3xl overflow-hidden bg-white ${className}`}>
      <div className="px-6 pt-6">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            width={400}
            height={300}
            className="w-full h-[300px] object-cover"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 tracking-[-0.5px] text-gray-900">{title}</h3>
        <p className="text-gray-700 mb-4 tracking-[-0.5px]">{description}</p>
        <Link 
          href="#" 
          className="inline-flex items-center text-[#5a2662] font-semibold hover:text-[#4a1f52]"
        >
          Read More
          <svg 
            className="ml-2 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
} 