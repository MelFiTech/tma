import { DonateButton } from '@/components/common/DonateButton'

export const CTA = () => {
  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      
      <div className="w-[358px] mx-auto sm:w-auto bg-white rounded-[32px] p-6 sm:p-8 md:p-12 shadow-xl relative">
        <div 
          className="absolute inset-0 rounded-[32px]"
          style={{
            backgroundImage: 'url(/images/cta-bg.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-[#5a2662] uppercase tracking-[-1px] font-semibold text-sm sm:text-base">
            {"Transform a Child's Future – Join Our Mission"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 tracking-[-2px] text-gray-900">
            Support & Donations
          </h2>
          <p className="text-sm sm:text-base text-gray-700 tracking-[-1px] mb-8">
            At The Magnet Academy, we are committed to providing orphans and underprivileged children with a world-class education, a safe home, and a path to a brighter future. Your support can make a life-changing impact by ensuring that these children receive the education, care, and opportunities they deserve
          </p>
          <DonateButton variant="primary" size="lg" className="w-full sm:w-auto" />
        </div>
      </div>
    </div>
  )
}