'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newsletter: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          newsletter: false,
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-900 via-slate-900 to-teal-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white text-2xl font-bold">DataSolace</div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-white hover:text-green-400 transition-colors">Services</Link>
            <Link href="/portfolio" className="text-white hover:text-green-400 transition-colors">Portfolio</Link>
            <a href="#blog" className="text-white hover:text-green-400 transition-colors">Blog</a>
            <a href="#appointments" className="text-white hover:text-green-400 transition-colors">Appointments</a>
          </nav>
          <a href="#contact" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Contact Us
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
            Automate Your...
          </h1>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Business Side */}
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                💼 Business
              </h2>
              <p className="text-xl text-white/90 max-w-md mx-auto">
                Enterprise automation solutions that let you scale your business without scaling your problems
              </p>
            </div>

            {/* Life/Home Side */}
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                🏠 Life
              </h2>
              <p className="text-xl text-white/90 max-w-md mx-auto">
                Luxury home automation solutions that bring comfort, security and efficiency to your spaces
              </p>
            </div>
          </div>

          <Link href="/services" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block">
            💡 Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Let&apos;s Build 🔧 Brilliant Things
          </h2>
          <p className="text-xl text-gray-700 mb-16 max-w-4xl mx-auto">
            We are a trusted partner for Business and Home automation, bringing over a decade of systems design and engineering to those who want to focus on what matters most.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Business Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Business Solutions</h3>
                <ul className="space-y-4 mb-8 max-w-sm mx-auto md:mx-0">
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">💼</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Infrastructure to Enable Business Growth</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">💼</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Eliminate Time Consuming Activities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">💼</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Protect Business Intellectual Property</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">💼</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Consolidate Systems and Optimise Workflows</span>
                  </li>
                </ul>
                <div className="text-center md:text-left">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors">
                    🚀 Automate My Business
                  </button>
                </div>
              </div>

              {/* Home Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Home Solutions</h3>
                <ul className="space-y-4 mb-8 max-w-sm mx-auto md:mx-0">
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">🏠</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Enhanced Home Comfort and Efficiency</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">🏠</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Premises Security and Access Management</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">🏠</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Environmental Monitoring and Protection</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3 leading-none flex-shrink-0">🏠</span>
                    <span className="text-lg text-gray-700 leading-relaxed text-left">Unified control and automated daily routines</span>
                  </li>
                </ul>
                <div className="text-center md:text-left">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors">
                    🚀 Automate My Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-slate-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-green-500 mb-6">
                Let&apos;s Work Together!
              </h2>
              <div className="text-white text-xl space-y-2">
                <p>Want to impress guests with a</p>
                <p>home that seems to run itself?</p>
                <p>We&apos;ll show you how!</p>
                <p className="font-semibold mt-4">Get in touch today.</p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400 rounded-lg">
                  <p className="text-green-400 font-semibold">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400 rounded-lg">
                  <p className="text-red-400 font-semibold">Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email (required)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                    placeholder="+44 20 7946 0958"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-500 bg-white/20 border-white/30 rounded focus:ring-green-400"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-white text-sm">
                    Sign up for news and updates
                  </label>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message (required)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400 resize-none"
                    placeholder="Tell us about your automation needs..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
