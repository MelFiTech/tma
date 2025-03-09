import { Ticker } from '@/components/common/Ticker'

export const Partners = () => {
  const partners = [
    {
      image: "/images/partners/sdg.png",
      alt: "Partner Logo 1"
    },
    {
      image: "/images/partners/ksg.png", 
      alt: "Partner Logo 2"
    },
    {
      image: "/images/partners/lg.png",
      alt: "Partner Logo 3"
    },
    {
      image: "/images/partners/iur.png",
      alt: "Partner Logo 4"
    },
    {
      image: "/images/partners/fme.png",
      alt: "Partner Logo 5"
    }
  ]

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-4px] text-gray-900 text-center mb-8 sm:mb-12 md:mb-16">
          Our Partners
        </h2>
        
        <Ticker 
          items={partners}
          speed={0.5}
          className="py-4 sm:py-6 md:py-8"
        />
      </div>
    </section>
  )
}