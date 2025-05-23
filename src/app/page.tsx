import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        
        {/* Animated Blocks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating blocks */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-primary-light/20 rounded-xl animate-float">
            <div className="absolute inset-2 bg-primary-light/20 rounded-lg"></div>
          </div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-primary-light/20 rounded-xl animate-float-delay-1">
            <div className="absolute inset-2 bg-primary-light/20 rounded-lg"></div>
          </div>
          
          {/* Small rotating squares */}
          <div className="absolute top-40 left-[20%] w-16 h-16 border-4 border-primary-light/20 rounded-lg animate-rotate"></div>
          <div className="absolute bottom-32 right-[20%] w-12 h-12 border-4 border-primary-light/20 rounded-lg animate-rotate"></div>
          
          {/* Floating dots */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary-light/30 rounded-full animate-float-delay-2"></div>
          <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-primary-light/30 rounded-full animate-float"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in gradient-text">
                Building Foundations
              </h1>
              {/* Small building blocks near the title */}
              <div className="absolute -right-16 top-0 w-12 h-12 bg-primary-light/20 rounded-lg animate-float-delay-1"></div>
              <div className="absolute -left-16 bottom-0 w-8 h-8 bg-primary-light/20 rounded-lg animate-float-delay-2"></div>
            </div>
            <p className="text-2xl md:text-3xl mb-6 text-primary-light font-medium animate-fade-in-delay">
              Shaping High-Achieving Students
            </p>
            <p className="text-xl text-gray-100 mb-8 animate-fade-in-delay">
              Expert tutoring in English, Mathematics, and Thinking Skills. 
              Professional preparation for OC, Selective, NAPLAN, HAST, and HSC examinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Link 
                href="/contact" 
                className="bg-white text-primary hover:bg-gray-100 hover:text-primary-dark px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 text-center group"
              >
                <span className="relative z-10">Book a Consultation</span>
              </Link>
              <Link 
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all text-center"
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Why Choose TI Academy?</h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              We provide comprehensive educational support tailored to each student's needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover-lift hover-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-dark">Comprehensive Programs</h3>
              <p className="text-text-light">Expert instruction in English, Mathematics, and Thinking Skills, tailored for Years 3-12.</p>
            </div>
            <div className="card hover-lift hover-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-dark">Exam Preparation</h3>
              <p className="text-text-light">Specialized preparation for OC, Selective, NAPLAN, HAST, and HSC examinations.</p>
            </div>
            <div className="card hover-lift hover-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-dark">Proven Results</h3>
              <p className="text-text-light">Track record of success in helping students achieve their academic goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="hover-lift bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-text-light">Students Taught</p>
            </div>
            <div className="hover-lift bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
              <p className="text-text-light">Success Rate</p>
            </div>
            <div className="hover-lift bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">10+</h3>
              <p className="text-text-light">Years Experience</p>
            </div>
            <div className="hover-lift bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
              <p className="text-text-light">Satisfaction</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Join TI Academy today and let us help you achieve excellence in your academic journey.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </main>
  )
}