import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TI Academy | Expert Tutoring Year 3-12',
  description: 'Specialized tutoring in English, Mathematics and Thinking Skills. Expert preparation for OC, NAPLAN, Selective, HAST and HSC examinations. Transform your academic journey with our experienced educators.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-primary">TI Academy</span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link 
                    href="/" 
                    className="inline-flex items-center px-3 py-2 text-base font-medium text-gray-900 relative group transition-all duration-300 hover:text-primary hover:-translate-y-0.5"
                  >
                    Home
                    <span className="absolute bottom-2 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center px-3 py-2 text-base font-medium text-gray-900 relative group transition-all duration-300 hover:text-primary hover:-translate-y-0.5"
                  >
                    About
                    <span className="absolute bottom-2 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </Link>
                  <Link 
                    href="/tutors" 
                    className="inline-flex items-center px-3 py-2 text-base font-medium text-gray-900 relative group transition-all duration-300 hover:text-primary hover:-translate-y-0.5"
                  >
                    Tutors
                    <span className="absolute bottom-2 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </Link>
                  <Link 
                    href="/join" 
                    className="inline-flex items-center px-3 py-2 text-base font-medium text-gray-900 relative group transition-all duration-300 hover:text-primary hover:-translate-y-0.5"
                  >
                    Join Us
                    <span className="absolute bottom-2 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                {session ? (
                  <Link 
                    href="/dashboard" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-transform"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/auth/signin" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-transform"
                    >
                      Sign in
                    </Link>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-transform"
                    >
                      Contact Us
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}