import Image from 'next/image'
import { AnimatedSection } from '@/components/common/AnimatedSection'

export const CampusGallery = () => {
  const images = [
    {
      src: '/images/campus/masjid.jpg',
      alt: 'Masjid building', 
      className: 'col-span-1 row-span-1',
      fallbackColor: 'bg-sky-200'
    },
    {
      src: '/images/campus/playground-2.jpg',
      alt: 'Children playing',
      className: 'col-span-1 row-span-1',
      fallbackColor: 'bg-teal-200'
    },
    {
      src: '/images/campus/hostel.jpg',
      alt: 'Student hostel with bunk beds',
      className: 'col-span-2 row-span-2',
      fallbackColor: 'bg-violet-200'
    },
    {
      src: '/images/campus/courtyard.jpg',
      alt: 'School courtyard',
      className: 'col-span-1 row-span-1',
      fallbackColor: 'bg-rose-200'
    },
    {
      src: '/images/campus/washroom.jpg',
      alt: 'Washroom facilities',
      className: 'col-span-1 row-span-1',
      fallbackColor: 'bg-emerald-200'
    },
    {
      src: '/images/campus/classroom.jpg',
      alt: 'Classroom with students',
      className: 'col-span-2 row-span-2',
      fallbackColor: 'bg-indigo-200'
    },
    {
      src: '/images/campus/playground.jpg',
      alt: 'Playground area',
      className: 'col-span-1 row-span-1',
      fallbackColor: 'bg-amber-200'
    },
    {
      src: '/images/campus/masjid-2.jpg',
      alt: 'Masjid exterior',
      className: 'col-span-1 row-span-1',
      fallbackColor: 'bg-fuchsia-200'
    }
  ]

  return (
    <AnimatedSection className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative rounded-3xl overflow-hidden ${image.className} ${image.fallbackColor}`}
              style={{ height: image.className.includes('row-span-2') ? '600px' : '280px' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}