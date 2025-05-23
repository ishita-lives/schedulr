'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          experience,
          qualifications,
          resume,
          coverLetter,
        }),
      });
      
      if (response.ok) {
        // Show success message
      } else {
        // Show error message
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        
        {/* Educational Symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none text-white/30">
          {/* Outer Ring - Math Symbols */}
          <div className="symbol text-7xl animate-float-slow" style={{ top: '5%', left: '5%', animationDelay: '0s' }}>∑</div>
          <div className="symbol text-8xl animate-float-slow" style={{ top: '10%', right: '8%', animationDelay: '0.7s' }}>π</div>
          <div className="symbol text-7xl animate-float-slow" style={{ bottom: '8%', left: '7%', animationDelay: '1.4s' }}>∫</div>
          <div className="symbol text-8xl animate-float-slow" style={{ bottom: '12%', right: '6%', animationDelay: '2.1s' }}>√</div>
          
          {/* Middle Ring - English/Language */}
          <div className="symbol text-5xl animate-float-medium" style={{ top: '25%', left: '12%', animationDelay: '0.3s' }}>"</div>
          <div className="symbol text-6xl animate-float-medium" style={{ top: '20%', right: '15%', animationDelay: '1s' }}>A+</div>
          <div className="symbol text-5xl animate-float-medium" style={{ bottom: '28%', left: '18%', animationDelay: '1.7s' }}>α</div>
          <div className="symbol text-6xl animate-float-medium" style={{ bottom: '22%', right: '16%', animationDelay: '2.4s' }}>ω</div>

          {/* Inner Ring - Operations */}
          <div className="symbol text-4xl animate-float-fast" style={{ top: '40%', left: '8%', animationDelay: '0.5s' }}>+</div>
          <div className="symbol text-5xl animate-float-fast" style={{ top: '35%', right: '10%', animationDelay: '1.2s' }}>÷</div>
          <div className="symbol text-4xl animate-float-fast" style={{ bottom: '38%', left: '9%', animationDelay: '1.9s' }}>×</div>
          <div className="symbol text-5xl animate-spin-slow" style={{ bottom: '42%', right: '12%', animationDelay: '2.6s' }}>∞</div>

          {/* Additional Symbols */}
          <div className="symbol text-6xl animate-bounce-gentle" style={{ top: '15%', left: '30%', animationDelay: '0.2s' }}>θ</div>
          <div className="symbol text-5xl animate-spin-reverse" style={{ top: '25%', right: '28%', animationDelay: '0.9s' }}>∂</div>
          <div className="symbol text-6xl animate-float-medium" style={{ bottom: '20%', left: '32%', animationDelay: '1.6s' }}>λ</div>
          <div className="symbol text-5xl animate-float-fast" style={{ bottom: '30%', right: '35%', animationDelay: '2.3s' }}>μ</div>
          <div className="symbol text-7xl animate-float-slow" style={{ top: '45%', left: '4%', animationDelay: '0.4s' }}>Σ</div>
          <div className="symbol text-6xl animate-bounce-gentle" style={{ top: '38%', right: '6%', animationDelay: '1.1s' }}>Δ</div>
          <div className="symbol text-5xl animate-spin-reverse" style={{ bottom: '35%', left: '5%', animationDelay: '1.8s' }}>Ω</div>
          <div className="symbol text-7xl animate-float-medium" style={{ bottom: '48%', right: '4%', animationDelay: '2.5s' }}>∇</div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center bg-primary/20 backdrop-blur-sm p-10 rounded-2xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in text-white drop-shadow-lg transform hover:scale-105 transition-all duration-500">
              Building Foundations
            </h1>
            <p className="text-3xl md:text-4xl mb-8 text-primary-light font-medium animate-fade-in-delay drop-shadow-lg transform hover:scale-105 transition-all duration-500">
              Shaping High-Achieving Students
            </p>
            <p className="text-xl md:text-2xl text-gray-100 mb-10 animate-fade-in-delay leading-relaxed max-w-3xl mx-auto">
              Expert tutoring in English, Mathematics, and Thinking Skills. 
              Professional preparation for OC, Selective, NAPLAN, HAST, and HSC examinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-2">
              <Link 
                href="/contact" 
                className="bg-white text-primary hover:bg-gray-100 hover:text-primary-dark px-10 py-4 rounded-lg font-semibold transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-white/20 text-center text-lg"
              >
                Book a Consultation
              </Link>
              <Link 
                href="/about"
                className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-500 hover:scale-110 text-center text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Why Choose TI Academy?</h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              We provide comprehensive educational support tailored to each student's needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-purple-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">Comprehensive Programs</h3>
                <p className="text-text-light group-hover:text-gray-900 transition-colors">Expert instruction in English, Mathematics, and Thinking Skills, tailored for Years 3-12.</p>
              </div>
            </div>

            <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-purple-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">Exam Preparation</h3>
                <p className="text-text-light group-hover:text-gray-900 transition-colors">Specialized preparation for OC, Selective, NAPLAN, HAST, and HSC examinations.</p>
              </div>
            </div>

            <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-purple-200">
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">Proven Results</h3>
                <p className="text-text-light group-hover:text-gray-900 transition-colors">Track record of success in helping students achieve their academic goals.</p>
              </div>
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