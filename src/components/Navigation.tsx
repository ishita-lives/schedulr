'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/tutors', label: 'Our Tutors' },
    { href: '/join', label: 'Join Our Team' },
  ]

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary hover:scale-110 transition-transform duration-300">
            TI Academy
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${
                  isActive(href)
                    ? 'text-primary font-semibold scale-105'
                    : 'text-gray-600 hover:text-primary'
                } relative px-2 py-1 transition-all duration-300 hover:scale-105 group`}
              >
                {label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
            <Link
              href="/contact"
              className={`${
                isActive('/contact')
                  ? 'bg-primary-dark scale-105'
                  : 'bg-primary hover:bg-primary-dark'
              } text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20`}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${
                    isActive(href)
                      ? 'text-primary font-semibold bg-primary/5'
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  } transition-all duration-300 px-4 py-2 rounded-lg relative group`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
              <Link
                href="/contact"
                className={`${
                  isActive('/contact')
                    ? 'bg-primary-dark'
                    : 'bg-primary hover:bg-primary-dark'
                } text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 