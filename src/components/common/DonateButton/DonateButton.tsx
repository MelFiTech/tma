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
    sm: 'px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm',
    md: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base', 
    lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg'
  }

  const getVariantClasses = () => {
    if (variant === 'primary') {
      return cn(
        'bg-[#84368C]',
        'text-white',
        'hover:bg-[#6B2D75]'
      )
    }
    if (variant === 'outline') {
      return cn(
        'border border-current',
        'text-[#84368C]',
        'hover:bg-opacity-10'
      )
    }
    if (variant === 'white') {
      return cn(
        'bg-white',
        'text-[#84368C]',
        'hover:bg-gray-100'
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
          'dbox-donation-button inline-flex items-center gap-2 transition-all duration-200 rounded-full hover:shadow-lg tracking-[-0.5px] sm:tracking-[-1px] w-auto',
          getVariantClasses(),
          sizes[size],
          className
        )}
      >
        <div className="relative w-5 h-5">
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
        Donate
      </a>
    </>
  )
}