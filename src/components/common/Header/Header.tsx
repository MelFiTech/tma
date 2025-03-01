'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { DonateButton } from '@/components/common/DonateButton'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setIsScrolled(window.scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { 
      name: 'About Us', 
      href: '/about',
      dropdown: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Programs', href: '/programs' },
        { name: 'Support and Donations', href: '/support' }
      ]
    },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <header className={`fixed top-0 md:top-8 w-screen md:w-[90%] max-w-[1190px] z-50 ${isScrolled ? 'bg-black' : 'bg-white/10'} backdrop-blur-[19px] md:rounded-[50px] transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between py-2.5 sm:py-3">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="relative w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] bg-white rounded-full flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="The Magnet Academy Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="text-sm sm:text-base md:text-xl font-bold text-white tracking-[-1px] truncate">
              The Magnet Academy
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {links.map((link, index) => (
                <li key={index} className="relative group">
                  <Link 
                    href={link.href}
                    className="flex items-center gap-1 text-white/80 hover:text-white transition-colors tracking-[-0.5px]"
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <ul className="py-2">
                        {link.dropdown.map((item, idx) => (
                          <li key={idx}>
                            <Link 
                              href={item.href}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <DonateButton className="hidden md:inline-flex" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-screen bg-black/95 backdrop-blur-lg md:hidden max-h-[80vh] overflow-y-auto">
              <nav className="w-full px-4 py-4">
                <ul className="flex flex-col gap-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      {!link.dropdown ? (
                        <Link 
                          href={link.href}
                          className="block text-sm sm:text-base text-white/80 hover:text-white py-2 transition-colors tracking-[-0.5px]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <div>
                          <div className="text-sm sm:text-base text-white/80 mb-2">{link.name}</div>
                          <ul className="pl-4 border-l border-white/20">
                            {link.dropdown.map((item, idx) => (
                              <li key={idx}>
                                <Link 
                                  href={item.href}
                                  className="block text-xs sm:text-sm text-white/60 hover:text-white py-2 transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                  <li className="pt-2">
                    <DonateButton className="w-full justify-center" />
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}