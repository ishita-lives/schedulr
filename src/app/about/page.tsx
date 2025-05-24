import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              About TI Academy
            </h1>
            <p className="text-xl text-primary-light max-w-2xl mx-auto mb-4">
              Building strong foundations for academic excellence since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about1.png"
                alt="Students learning at TI Academy"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-6 text-gradient">Our Mission</h2>
              <p className="text-text-light mb-6 text-lg">
                At TI Academy, we are dedicated to empowering students from Years 3-12 to achieve academic excellence through personalised tutoring and comprehensive exam preparation.
              </p>
              <p className="text-text-light mb-6 text-lg">
                We believe every student has the potential to excel, and our mission is to unlock that potential through expert guidance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold mb-6 text-gradient">Our Approach</h2>
              <p className="text-text-light mb-6 text-lg">
                We specialise in English, Mathematics, and Thinking Skills, offering targeted preparation for key examinations including OC, Selective, NAPLAN, HAST, and HSC.
              </p>
              <p className="text-text-light mb-6 text-lg">
                Our methodology combines proven teaching techniques with individualised attention to ensure each student reaches their full potential.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-lg shadow-sm hover-lift">
                  <h3 className="font-semibold text-primary mb-2">Personalised Learning</h3>
                  <p className="text-text-light">Tailored programs for each student's needs</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm hover-lift">
                  <h3 className="font-semibold text-primary mb-2">Small Groups</h3>
                  <p className="text-text-light">Focused attention and interaction</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <Image
                src="/images/about2.png"
                alt="TI Academy teaching approach"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center text-gradient">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-purple-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">Expert Tutors</h3>
                <p className="text-text-light group-hover:text-gray-900 transition-colors">Experienced and qualified tutors with proven track records</p>
              </div>
            </div>

            <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-purple-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">Modern Facilities</h3>
                <p className="text-text-light group-hover:text-gray-900 transition-colors">State-of-the-art learning environment with latest resources</p>
              </div>
            </div>

            <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-purple-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">Personalised Attention</h3>
                <p className="text-text-light group-hover:text-gray-900 transition-colors">Tailored teaching with strict maximum of 4 students per class for optimal learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 