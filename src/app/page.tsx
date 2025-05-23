import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply z-10"></div>
        <Image
          src="/images/hero-bg.jpg"
          alt="Students studying"
          fill
          className="object-cover"
          priority
        />
        <div className="container mx-auto px-4 z-20 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
              Expert Tutoring for Years 3-12
            </h1>
            <p className="text-xl text-white mb-8 animate-fade-in-delay">
              Specialized instruction in English, Mathematics, and Thinking Skills. Professional preparation for OC, Selective, NAPLAN, HAST, and HSC examinations.
            </p>
            <div className="flex gap-4 animate-fade-in-delay-2">
              <Link 
                href="/contact" 
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:scale-105"
              >
                Book a Consultation
              </Link>
              <Link 
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TI Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Programs</h3>
              <p className="text-text-light">Expert instruction in English, Mathematics, and Thinking Skills, tailored for Years 3-12.</p>
            </div>
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Exam Preparation</h3>
              <p className="text-text-light">Specialized preparation for OC, Selective, NAPLAN, HAST, and HSC examinations.</p>
            </div>
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-text-light">Track record of success in helping students achieve their academic goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join TI Academy today and let us help you achieve excellence in your academic journey, from primary school through to HSC.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:scale-105"
          >
            Schedule a Free Assessment
          </Link>
        </div>
      </section>
    </main>
  )
}