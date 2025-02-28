'use client'

import { motion } from 'framer-motion'

export const BlogHero = () => {
  return (
    <section className="w-full bg-black py-32">
      <div className="container mx-auto px-4 flex items-end h-[400px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px]"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-white/80">
            Stay updated with our latest insights and news.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 