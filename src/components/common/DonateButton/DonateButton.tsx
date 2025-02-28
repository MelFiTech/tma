'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import Image from 'next/image'

interface DonateButtonProps {
  className?: string
}

export const DonateButton = ({ className = '' }: DonateButtonProps) => {
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

  return (
    <>
      <Script id="donorbox-popup-button-installer" src="https://donorbox.org/install-popup-button.js" />
      <a 
        href="https://donorbox.org/sponsor-a-child-142?"
        className={`dbox-donation-button inline-flex items-center gap-2 bg-[#84368C] hover:bg-[#6B2D75] text-white font-inter text-base px-6 py-2 rounded-full transition-colors duration-200 ${className}`}
      >
        <div className="relative w-5 h-5">
          <Image 
            src="https://donorbox.org/images/white_logo.svg" 
            alt="Donorbox"
            fill
            className="object-contain"
          />
        </div>
        Donate
      </a>
    </>
  )
} 