'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import { urlFor } from '@/lib/sanity'
import { SanityImage } from '@/types/sanity'

interface TeamCardProps {
  name: string
  title: string
  image?: SanityImage
  linkedIn?: string
  onClick?: () => void
}

export const TeamCard = ({ name, title, image, linkedIn, onClick }: TeamCardProps) => {
  return (
    <AnimatedSection>
      <div 
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#EAEEF2] h-full cursor-pointer"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative w-[80%] sm:w-full mx-auto aspect-square mb-3 sm:mb-4 bg-gray-100 rounded-full overflow-hidden">
          {image ? (
            <Image
              src={urlFor(image).width(200).height(200).url()}
              alt={image.alt || name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="text-gray-500 text-xl sm:text-2xl md:text-3xl font-bold">
                {name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="font-display text-base sm:text-lg md:text-xl tracking-tighter text-gray-900 mb-1 sm:mb-2 font-bold truncate">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{title}</p>
          
          {linkedIn && (
            <Link 
              href={linkedIn}
              target="_blank"
              className="inline-flex text-gray-400 hover:text-gray-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
} 