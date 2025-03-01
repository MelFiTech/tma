'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface TickerProps {
  items: {
    image: string
    alt: string
  }[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export const Ticker = ({ items, speed = 0.5, direction = 'left', className = '' }: TickerProps) => {
  const tickerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    const content = contentRef.current
    if (!ticker || !content) return

    const totalWidth = content.offsetWidth / 2 // Divide by 2 since we duplicate items
    let currentPosition = 0
    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const delta = timestamp - lastTimestamp
      
      if (direction === 'left') {
        currentPosition -= (speed * delta) / 16
        if (currentPosition <= -totalWidth) {
          currentPosition += totalWidth // Move back by one set of items
        }
      } else {
        currentPosition += (speed * delta) / 16
        if (currentPosition >= totalWidth) {
          currentPosition -= totalWidth // Move back by one set of items
        }
      }
      
      content.style.transform = `translateX(${currentPosition}px)`
      lastTimestamp = timestamp
      requestAnimationFrame(animate)
    }

    const animation = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animation)
    }
  }, [direction, speed])

  const duplicatedItems = [...items, ...items]

  return (
    <div 
      ref={tickerRef} 
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div 
        ref={contentRef}
        className="inline-block transition-transform"
      >
        {duplicatedItems.map((item, index) => (
          <div 
            key={index} 
            className="inline-block px-12"
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={100}
              height={100}
              className="h-auto w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}