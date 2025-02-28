import { NewsCard } from './NewsCard'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const News = () => {
  const newsItems = [
    {
      title: "New Development in Nigeria", 
      location: "Nigeria",
      tags: ["Development", "New Hostel"],
      image: "/images/news1.png"
    },
    {
      title: "Expanding in Ghana",
      location: "Ghana", 
      tags: ["New Buildings", "New Teachers"],
      image: "/images/news2.png"
    }
  ]

  return (
    <AnimatedSection className="w-full py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-2px] sm:tracking-[-4px] text-gray-900 text-center sm:text-left">
            View Our Latest News
          </h2>
          <div className="flex gap-4">
            <button 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5a2662] text-white flex items-center justify-center hover:bg-[#4a1f52] transition-colors"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {newsItems.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <NewsCard {...item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}