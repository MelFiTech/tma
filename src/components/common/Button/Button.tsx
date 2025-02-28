import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  bgColor?: string // Background color class
  textColor?: string // Text color class
  hoverBgColor?: string // Hover background color class
  hoverTextColor?: string // Hover text color class
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  bgColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
  ...props
}: ButtonProps) => {
  const sizes = {
    sm: 'px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm',
    md: 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base',
    lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg'
  }

  const getVariantClasses = () => {
    if (variant === 'primary') {
      return cn(
        bgColor || 'bg-transparent',
        textColor || 'text-white',
        hoverBgColor || 'hover:bg-opacity-90',
        hoverTextColor
      )
    }
    if (variant === 'outline') {
      return cn(
        'border border-current',
        textColor || 'text-white',
        hoverBgColor || 'hover:bg-opacity-10',
        hoverTextColor
      )
    }
    return ''
  }

  return (
    <button
      className={cn(
        'transition-all duration-200 rounded-full hover:shadow-lg tracking-[-0.5px] sm:tracking-[-1px] w-auto',
        getVariantClasses(),
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button