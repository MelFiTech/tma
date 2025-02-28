import { Metadata } from 'next'
import { Footer } from '@/components/landing/Footer'
import { DonationCard } from '@/components/donations/DonationCard'
import { SupportHero } from '@/components/support/Hero'

export const metadata: Metadata = {
  title: 'Support & Donations - TMA',
  description: 'Support The Magnet Academy through donations and partnerships',
}

export default function Support() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <SupportHero />

        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            <div className="w-full lg:w-1/2">
              <DonationCard
                number="1"
                title="Make a Donation"
                description="Every contribution helps us provide tuition-free education, housing, meals, and essential resources to our students."
                image="/images/donations/volunteers.jpg"
                buttonText="Donate Now"
                buttonLink="/donate"
                amounts={[
                  { amount: "$50", description: "Provides school supplies for a student for one year." },
                  { amount: "$100", description: "Covers meals for a student for six months." },
                  { amount: "$500", description: "Supports a student's full education and housing for a year." },
                  { amount: "$1,000+", description: "Helps fund campus development and expansion" }
                ]}
              />
            </div>

            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              <DonationCard
                number="2"
                title="Sponsor a Child"
                description="Transform a child's life by becoming a long-term sponsor. Your sponsorship covers education, meals, housing, and mentorship"
                buttonText="Become a Sponsor"
                buttonLink="/sponsor"
              />

              <DonationCard
                number="3"
                title="Partner with Us"
                description="We welcome partnerships with organizations, businesses, and philanthropists who share our vision. Let's work together to expand educational opportunities for underserved children"
                buttonText="Partner With Us"
                buttonLink="/partner"
              />

              <DonationCard
                number="4"
                title="Volunteer & Get Involved"
                description="Your time and skills can make a difference. Join us in mentorship programs, fundraising initiatives, or skill-based training for our students"
                buttonText="Become a Volunteer"
                buttonLink="/volunteer"
              />
            </div>
          </div>
        </div>

        <div className="h-[100px] sm:h-[120px] md:h-[160px]" />

        <Footer />
      </main>
    </>
  )
}