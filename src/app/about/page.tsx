import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TI Academy</h1>
            <p className="text-xl text-gray-100">
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
                src="/images/students-learning.jpg"
                alt="Students learning"
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
      <section className="py-20 bg-gray-50">
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
                src="/images/teaching-method.jpg"
                alt="Our teaching method"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center text-gradient">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover-lift hover-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Tutors</h3>
              <p className="text-text-light">Experienced and qualified tutors with proven track records</p>
            </div>
            <div className="card hover-lift hover-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Facilities</h3>
              <p className="text-text-light">State-of-the-art learning environment with latest resources</p>
            </div>
            <div className="card hover-lift hover-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-text-light">Consistent track record of student success and achievement</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 