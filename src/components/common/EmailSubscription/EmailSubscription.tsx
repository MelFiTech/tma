'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface EmailSubscriptionProps {
  className?: string
  buttonClassName?: string
  inputClassName?: string
  darkMode?: boolean
}

export const EmailSubscription = ({ 
  className = '',
  buttonClassName = '',
  inputClassName = '',
  darkMode = false 
}: EmailSubscriptionProps) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    if (!email) {
      setStatus('error')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      return
    }

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
      console.error('Subscription error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="flex gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setStatus('idle')
          }}
          placeholder="Enter your email"
          className={`flex-1 rounded-full px-6 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
            darkMode 
              ? 'bg-white/20 text-white placeholder-white/60 focus:ring-white/30' 
              : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-purple-300'
          } ${inputClassName}`}
        />
        <button 
          type="submit"
          className={`px-8 py-3 rounded-full font-semibold tracking-[-1px] transition-colors ${
            darkMode
              ? 'bg-white text-[#8F4996] hover:bg-gray-100'
              : 'bg-[#8F4996] text-white hover:bg-[#7a3f80]'
          } ${buttonClassName}`}
        >
          Submit
        </button>
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute -bottom-6 left-0 text-sm ${darkMode ? 'text-red-300' : 'text-red-500'}`}
        >
          Something went wrong. Please try again later.
        </motion.p>
      )}

      {/* Success Message */}
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute -bottom-6 left-0 text-sm ${darkMode ? 'text-green-300' : 'text-green-500'}`}
        >
          Thank you for subscribing!
        </motion.p>
      )}
    </form>
  )
} 