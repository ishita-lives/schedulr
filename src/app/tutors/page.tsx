export default function Tutors() {
  const tutors = [
    {
      name: "Sarah Johnson",
      subjects: "English & Literature",
      experience: "10+ years",
      qualifications: "M.Ed, B.A. English Literature",
      description: "Specializes in HSC English preparation and creative writing."
    },
    {
      name: "Dr. Michael Chen",
      subjects: "Mathematics",
      experience: "15+ years",
      qualifications: "Ph.D. Mathematics, B.Sc (Hons)",
      description: "Expert in advanced mathematics and selective school preparation."
    },
    {
      name: "Emma Williams",
      subjects: "Thinking Skills & English",
      experience: "8+ years",
      qualifications: "B.Ed, Gifted Education Certification",
      description: "Specializes in OC and selective school test preparation."
    },
    // Add more tutors as needed
  ];

  return (
    <main className="min-h-screen pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Expert Tutors</h1>
          <p className="text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Our tutors are highly qualified professionals with extensive experience in their respective fields. 
            They are passionate about education and committed to helping students achieve their academic goals.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
                  <p className="text-primary font-medium mb-4">{tutor.subjects}</p>
                  
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-medium">Experience:</span> {tutor.experience}
                    </p>
                    <p>
                      <span className="font-medium">Qualifications:</span> {tutor.qualifications}
                    </p>
                    <p className="mt-4">{tutor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
            <p className="text-gray-700 mb-6">
              We're always looking for passionate and qualified tutors to join our team.
              If you're interested in making a difference in students' lives, we'd love to hear from you.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Apply to Teach
            </button>
          </div>
        </div>
      </section>
    </main>
  )
} 