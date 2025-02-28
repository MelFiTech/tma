import Image from 'next/image'
import Link from 'next/link'

interface NewsCardProps {
  title: string
  location: string
  tags: string[]
  image: string
  className?: string
}

export const NewsCard = ({ title, location, tags, image, className }: NewsCardProps) => {
  return (
    <div className={`relative rounded-[24px] sm:rounded-[32px] overflow-hidden group ${className}`}>
      {/* Image */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8">
        <div className="flex flex-col gap-3 sm:gap-4 bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-xl sm:rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-[-0.5px] sm:tracking-[-1px]">
              {location}
            </h3>
            <Link href="#">
              <button className="w-full sm:w-auto bg-[#5a2662] text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base tracking-[-0.5px] sm:tracking-[-1px] hover:bg-[#4a1f52] transition-colors">
                Learn More
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="text-white/80 text-xs sm:text-sm"
              >
                • {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 