import Image from 'next/image'
import { DonateButton } from '@/components/common/DonateButton'
import { AnimatedSection } from '@/components/common/AnimatedSection'

interface DonationCardProps {
  number?: string
  title: string
  description: string
  image?: string
  buttonText: string
  buttonLink: string
  amounts?: {
    amount: string
    description: string
  }[]
}

export const DonationCard = ({ 
  number,
  title, 
  description, 
  image,
  amounts 
}: Omit<DonationCardProps, 'buttonText' | 'buttonLink'>) => {
  if (image) {
    return (
      <AnimatedSection className="rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#6B2D75] to-[#3B82F6] w-full max-w-[600px] mb-8 lg:mb-0">
        <div className="flex flex-col">
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[370px]">
            <Image
              src={image}
              alt={title}
              width={600}
              height={370}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-lg sm:text-xl font-bold text-white">{number}.</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
                </div>
                <p className="text-sm sm:text-base text-white/80 tracking-[-0.5px] sm:tracking-[-1px] leading-relaxed mb-3 sm:mb-4">
                  {description}
                </p>
                {amounts && (
                  <div className="space-y-1.5 sm:space-y-2">
                    {amounts.map((item, index) => (
                      <p key={index} className="text-xs sm:text-sm text-white tracking-[-0.5px] sm:tracking-[-1px]">
                        <span className="font-semibold">{item.amount}</span> – {item.description}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <DonateButton
                  variant="white"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    )
  }

  return (
    <AnimatedSection className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#6B2D75] to-[#3B82F6] p-4 sm:p-6 max-w-[600px] mb-8 lg:mb-0">
      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
        <span className="text-lg sm:text-xl font-bold text-white">{number}.</span>
        <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-sm sm:text-base text-white/80 tracking-[-0.5px] sm:tracking-[-1px] leading-relaxed mb-3 sm:mb-4">
        {description}
      </p>
      <div>
        <DonateButton
          variant="white"
          className="w-full sm:w-auto"
        />
      </div>
    </AnimatedSection>
  )
} 