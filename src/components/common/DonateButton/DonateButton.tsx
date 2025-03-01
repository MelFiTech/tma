'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface DonateButtonProps {
  className?: string
  variant?: 'primary' | 'outline' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export const DonateButton = ({ 
  className = '',
  variant = 'primary',
  size = 'md'
}: DonateButtonProps) => {
  useEffect(() => {
    // Remove the fixed arrow element if it exists
    const removeFixedArrow = () => {
      const fixedArrow = document.querySelector('.fixed-bottom-arrow')
      if (fixedArrow) {
        fixedArrow.remove()
      }
    }

    // Initial cleanup
    removeFixedArrow()

    // Set up observer to remove arrow when it appears
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        removeFixedArrow()
      })
    })

    // Start observing the body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const sizes = {
    sm: 'px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base',
    md: 'px-4 py-2 text-base md:px-6 md:py-3 md:text-lg',
    lg: 'px-5 py-2.5 text-lg md:px-8 md:py-4 md:text-xl'
  }

  const getVariantClasses = () => {
    if (variant === 'primary') {
      return cn(
        'bg-[#84368C]',
        'text-white',
        'hover:bg-[#6B2D75]',
        'active:bg-[#5A2662]' // Added touch feedback
      )
    }
    if (variant === 'outline') {
      return cn(
        'border-2 border-current', // Increased border width for better visibility
        'text-[#84368C]',
        'hover:bg-[#84368C]/10',
        'active:bg-[#84368C]/20' // Added touch feedback
      )
    }
    if (variant === 'white') {
      return cn(
        'bg-white',
        'text-[#84368C]',
        'hover:bg-gray-100',
        'active:bg-gray-200' // Added touch feedback
      )
    }
    return ''
  }

  return (
    <>
      <Script id="donorbox-popup-button-installer" src="https://donorbox.org/install-popup-button.js" />
      <a 
        href="https://donorbox.org/sponsor-a-child-142?"
        className={cn(
          'dbox-donation-button inline-flex items-center justify-center gap-2 transition-all duration-200 rounded-full hover:shadow-lg tracking-[-0.5px] touch-manipulation', // Added touch-manipulation and center alignment
          'min-w-[120px] w-full md:w-auto', // Min width and responsive width
          'font-medium', // Better readability on mobile
          getVariantClasses(),
          sizes[size],
          className
        )}
      >
        <div className="relative w-5 h-5 flex-shrink-0"> {/* Added flex-shrink-0 to prevent icon squishing */}
          <Image 
            src="https://donorbox.org/images/white_logo.svg" 
            alt="Donorbox"
            fill
            className={cn(
              "object-contain",
              variant === 'white' && "filter brightness-0 saturate-100 invert-[0.5] sepia-[0.4] saturate-[7000%] hue-rotate-[280deg]"
            )}
          />
        </div>
        <span>Donate</span> {/* Wrapped text in span for better control */}
      </a>
    </>
  )
}