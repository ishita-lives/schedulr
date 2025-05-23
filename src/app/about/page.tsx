export default function About() {
  return (
    <main className="min-h-screen pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">About TI Academy</h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At TI Academy, we are dedicated to empowering students from Years 3-12 to achieve academic excellence through personalised tutoring and comprehensive exam preparation.
              </p>
              <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
              <p className="text-gray-700 mb-6">
                We specialise in English, Mathematics, and Thinking Skills, offering targeted preparation for key examinations including OC, Selective, NAPLAN, HAST, and HSC. Our methodology combines proven teaching techniques with individualised attention to ensure each student reaches their full potential.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Experienced and qualified tutors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Personalised learning plans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Comprehensive exam preparation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Track record of student success</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Modern teaching methods and resources</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 