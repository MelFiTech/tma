'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TeamCard } from '../TeamCard'
import { client, TEAM_MEMBERS_BY_LOCATION_QUERY } from '@/lib/sanity'
import { TeamMember } from '@/types/sanity'

export const Team = () => {
  const [selectedLocation, setSelectedLocation] = useState('Katsina')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  // Add all potential locations, including inactive ones
  const allLocations = ['Katsina', 'Kaduna', 'Abuja', 'Lagos']

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true)
      try {
        const members = await client.fetch(TEAM_MEMBERS_BY_LOCATION_QUERY, {
          location: selectedLocation
        })
        setTeamMembers(members)
      } catch (error) {
        console.error('Error fetching team members:', error)
        // Fallback to static data if Sanity fails
        setTeamMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [selectedLocation])

  const openModal = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const closeModal = () => {
    setSelectedMember(null)
  }

  return (
    <section className="py-12 md:py-20 bg-[#F8F9FA] px-4 sm:px-6 lg:px-20">
      <div className="container mx-auto">
        {/* Location Tabs */}
        <div className="flex justify-center mb-8 space-x-4 overflow-x-auto">
          {allLocations.map(location => (
            <button
              key={location}
              onClick={() => location === 'Katsina' && setSelectedLocation(location)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                selectedLocation === location
                  ? 'bg-[#84368C] text-white rounded-2xl'
                  : location === 'Katsina' 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={location !== 'Katsina'}
            >
              {location}
              {location !== 'Katsina' && ' (Coming Soon)'}
            </button>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-2xl md:text-4xl leading-[1.2] tracking-tighter mb-4 text-gray-900 font-bold text-center"
        >
          THE MAGNET ACADEMY AT ALHUDA {selectedLocation.toUpperCase()}
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-xl md:text-2xl leading-[1.2] tracking-tighter mb-8 md:mb-16 text-gray-700 font-semibold text-center"
        >
          STAFF PROFILE
        </motion.h3>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#EAEEF2] h-full animate-pulse">
                <div className="w-[80%] sm:w-full mx-auto aspect-square mb-3 sm:mb-4 bg-gray-200 rounded-full"></div>
                <div className="text-center">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TeamCard {...member} onClick={() => openModal(member)} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && teamMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team members found for {selectedLocation}.</p>
            <p className="text-gray-400 text-sm mt-2">Check back later or try a different location.</p>
          </div>
        )}

        {/* Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-[95%] md:w-full md:max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-start md:items-center justify-between gap-3">
                  <div className="flex items-start md:items-center gap-3 md:gap-4">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <div className="text-gray-500 text-base md:text-lg font-bold">
                          {selectedMember.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg md:text-2xl tracking-tighter text-gray-900 font-bold">
                        {selectedMember.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">{selectedMember.title}</p>
                      <p className="text-xs md:text-sm text-gray-500">{selectedMember.department} • {selectedMember.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 p-1.5 md:p-2"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 md:p-6">
                <div className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedMember.bio}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}