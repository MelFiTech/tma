import Image from 'next/image'

interface TeamCardProps {
  name: string
  role: string
  image: string
  className?: string
}

export const TeamCard = ({ name, role, image, className }: TeamCardProps) => {
  return (
    <div className={`bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow w-full sm:w-[521px] min-h-[200px] sm:h-[260px] ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        {/* Image Container */}
        <div className={`rounded-xl sm:rounded-2xl overflow-hidden w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] flex-shrink-0 mx-auto sm:mx-0`}>
          <Image
            src={image}
            alt={name}
            width={180}
            height={180}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col text-center sm:text-left">
          <h3 className="text-2xl sm:text-[32px] font-bold tracking-[-1px] sm:tracking-[-2px] text-gray-900 mb-2 sm:mb-4">
            {name}
          </h3>
          <p className="text-gray-500 text-base sm:text-lg tracking-[-1px] leading-relaxed">
            {role}
          </p>
        </div>
      </div>
    </div>
  )
}