import Image from 'next/image'
import Link from 'next/link'

interface CampusCardProps {
  date: string
  title: string
  image: string
  imageAlt: string
  className?: string
}

export const CampusCard = ({ date, title, image, imageAlt, className }: CampusCardProps) => {
  return (
    <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group ${className}`}>
      <Image
        src={image}
        alt={imageAlt}
        width={600}
        height={400}
        className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="p-4 sm:p-6 md:p-8 text-white h-full flex flex-col justify-between">
          <div>
            <span className="block text-xs sm:text-sm mb-1 sm:mb-2">{date}</span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-[-0.5px] sm:tracking-[-1px]">{title}</h3>
          </div>
          <Link 
            href="#" 
            className="inline-flex items-center text-white font-semibold group-hover:opacity-80 tracking-[-0.5px] sm:tracking-[-1px] text-sm sm:text-base"
          >
            Read More
            <svg 
              className="ml-2 w-4 h-4 sm:w-5 sm:h-5" 
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
    </div>
  )
} 