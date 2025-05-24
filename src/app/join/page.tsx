'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  qualifications: string;
  experience: string;
  availability: string;
  resume: File | null;
  coverLetter: string;
}

export default function JoinTeam() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subjects: [],
    qualifications: '',
    experience: '',
    availability: '',
    resume: null,
    coverLetter: ''
  });

  const subjectOptions = [
    'English',
    'Mathematics',
    'Advanced Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Business Studies',
    'NAPLAN Preparation',
    'OC Preparation',
    'Selective Test Preparation',
    'HSC Preparation',
    'Other'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
    alert('Thank you for your application! We will review it and get back to you soon.');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Join Our Teaching Team
            </h1>
            <p className="text-xl text-primary-light max-w-2xl mx-auto mb-4">
              Share your expertise and help shape the next generation of achievers. 
              We're looking for passionate educators who want to make a difference.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Requirements Card */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-6">What We're Looking For</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Qualified Educators</h3>
                      <p className="text-gray-600">Degree qualified with demonstrated teaching experience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Subject Matter Experts</h3>
                      <p className="text-gray-600">Deep knowledge in English, Mathematics, or Sciences</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Passionate Teachers</h3>
                      <p className="text-gray-600">Committed to student success and growth</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Exam Preparation</h3>
                      <p className="text-gray-600">Experience in OC, Selective, NAPLAN, or HSC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-primary-dark mb-8">Application Form</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Teaching Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Teaching Information</h3>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Subjects You Can Teach
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border border-gray-300 rounded-lg p-6">
                      {subjectOptions.map(subject => (
                        <label key={subject} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={() => handleSubjectChange(subject)}
                            className="rounded text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="qualifications">
                      Qualifications
                    </label>
                    <textarea
                      id="qualifications"
                      name="qualifications"
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      placeholder="List your relevant degrees, certifications, and achievements"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="experience">
                      Teaching Experience
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Describe your teaching experience, including years of experience and types of students you've taught"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="availability">
                      Availability
                    </label>
                    <textarea
                      id="availability"
                      name="availability"
                      required
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.availability}
                      onChange={handleInputChange}
                      placeholder="What days and times are you available to teach?"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Additional Information</h3>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="resume">
                      Resume/CV
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Accepted formats: PDF, DOC, DOCX
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="coverLetter">
                      Why do you want to join TI Academy?
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Tell us why you'd be a great addition to our team"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 