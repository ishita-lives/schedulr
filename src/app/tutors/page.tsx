'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Tutors() {
  const tutors = [
    {
      name: "Mukesh Gupta",
      subjects: "Mathematics and Thinking Skills",
      qualifications: "B.Tech, MBA, International Math Olympiad Gold Medalist",
      description: "Expert in advanced mathematics and building foundations for primary school exams preparation."
    },
    {
      name: "Ishita Gupta",
      subjects: "English and Thinking Skills",
      qualifications: "98 ATAR, High Band 6 in HSC English Advanced",
      description: "Specialises in OC, selective school test preparation, creative writing and essays."
    },
    {
      name: "Chelsea Onlingchuan",
      subjects: "English",
      qualifications: "High School Dux, 98 ATAR and High Band 6 in English Advanced",
      description: "Specialises in HSC English preparation"
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
             Our Expert Tutors
            </h1>
            <p className="text-xl text-primary-light max-w-2xl mx-auto mb-4">
              Learn from experienced educators dedicated to your academic success
            </p>
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-purple-200"
              >
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src="/images/teacher_placeholder.png"
                    alt={tutor.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 border-t border-purple-100">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">{tutor.name}</h3>
                  <p className="text-primary font-medium mb-4 group-hover:text-purple-700 transition-colors">{tutor.subjects}</p>
                  
                  <div className="space-y-2 text-gray-700">
                    <p className="group-hover:text-gray-900 transition-colors">
                      <span className="font-medium text-purple-700">Qualifications:</span> {tutor.qualifications}
                    </p>
                    <p className="mt-4 group-hover:text-gray-900 transition-colors">{tutor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Join Our Team</h2>
            <p className="text-gray-700 mb-6">
              We're always looking for passionate and qualified tutors to join our team.
              If you're interested in making a difference in students' lives, we'd love to hear from you.
            </p>
            <Link 
              href="/join"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg"
            >
              Apply to Teach
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 