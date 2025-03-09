import { AnimatedSection } from '@/components/common/AnimatedSection'

export const WelcomeCard = () => {
  return (
    <AnimatedSection className="bg-white/20 backdrop-blur-[19px] rounded-3xl p-4 md:p-8 max-w-[500px] w-full">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 md:mb-4 tracking-[-1px]">Welcome to The <br className="hidden md:block" /> Magnet Academy</h2>
      <p className="text-white text-base md:text-lg mb-4 md:mb-6 tracking-[-1px]">
        To create a world where every child, regardless of their background, has access to quality education and the opportunity to reach their full potential
      </p>
      <div className="flex items-center">
        <button className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 bg-white text-gray-800 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center md:justify-start">
          Learn More
          <span className="ml-2">→</span>
        </button>
      </div>
    </AnimatedSection>
  )
}