export default function Contact() {
  return (
    <main className="min-h-screen pt-16">
      {/* Contact Information Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">Contact TI Academy</h1>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-lg font-semibold">Phone</p>
                <a href="tel:0450551978" className="hover:underline">0450 551 978</a>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-semibold">Email</p>
                <a href="mailto:mukesh@ticonsultants.com.au" className="hover:underline">
                  mukesh@ticonsultants.com.au
                </a>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg font-semibold">Address</p>
                <address className="not-italic">
                  72 Waterfall Blvd,<br />The Ponds NSW 2769
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Book Your Free Trial</h2>
            <p className="text-gray-700 mb-8 text-center">
              Take the first step towards academic excellence. Schedule your free trial session with TI Academy today.
            </p>
            
            <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Parent's Name
                </label>
                <input
                  type="text"
                  id="parentName"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Student's Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="yearLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Year Level
                </label>
                <select
                  id="yearLevel"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select Year Level</option>
                  {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((year) => (
                    <option key={year} value={year}>Year {year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects Interested In
                </label>
                <select
                  id="subjects"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="english">English</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="thinking">Thinking Skills</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Schedule Free Trial
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
} 