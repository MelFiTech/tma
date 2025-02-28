import { Button } from '@/components/common/Button';
import { WelcomeCard } from '../WelcomeCard/WelcomeCard';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const Hero = () => {
  return (
    <AnimatedSection className="relative w-full min-h-screen bg-[url('/images/hero-bg.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="container px-4 md:px-6 mx-auto relative h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center min-h-screen pt-20 md:pt-40">
          <div className="text-white mt-10 md:mt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-[-1px]">
              Transforming Lives Through Education
            </h1>
            <p className="text-base sm:text-lg mb-6 md:mb-8 tracking-[-1px]">
              Dedicated to empowering the next generation by providing exceptional education. 
              Focused on character development and leadership skills for a brighter future.
            </p>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Donate Now
            </Button>
          </div>
          <div className="flex justify-center lg:justify-end mt-8 md:mt-20">
            <WelcomeCard />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}