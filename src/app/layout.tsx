import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TI Academy | Expert Tutoring Year 3-12',
  description: 'Specialized tutoring in English, Mathematics and Thinking Skills. Expert preparation for OC, NAPLAN, Selective, HAST and HSC examinations. Transform your academic journey with our experienced educators.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}