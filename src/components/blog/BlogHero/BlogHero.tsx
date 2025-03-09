'use client'

import { motion } from 'framer-motion'

export const BlogHero = () => {
  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[550px] px-4 sm:px-6 lg:px-20 bg-black">
      <div className="container mx-auto relative h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-left h-full pt-48 sm:pt-56 md:pt-64"
        >
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-2px] sm:tracking-[-3px] md:tracking-[-4px] mb-4 sm:mb-6">
              Our Blog
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 tracking-[-0.5px] sm:tracking-[-1px]">
              Stay updated with our latest insights and news.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 