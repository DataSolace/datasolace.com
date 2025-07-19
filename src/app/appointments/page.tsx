'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Appointments() {
  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="appointments" />

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              📅 Book Your Consultation
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Ready to transform your business or home with automation? Schedule a personalized consultation 
              to discuss your needs and explore how we can help you automate your world.
            </p>
          </div>

          {/* Consultation Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What to Expect</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[var(--brand-teal)] mb-4">📞 Initial Consultation</h3>
                <ul className="space-y-2 text-white/90 text-left inline-block">
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>30-minute discovery call</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>Understand your goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>Discuss current challenges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>Explore potential solutions</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-[var(--brand-teal)] mb-4">🎯 Custom Solution Design</h3>
                <ul className="space-y-2 text-white/90 text-left inline-block">
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>Tailored automation strategy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>Technology recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>Implementation timeline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--brand-teal)] mr-2">•</span>
                    <span>Investment overview</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calendly Placeholder */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[var(--brand-teal)] p-4">
              <h3 className="text-xl font-bold text-white text-center">Schedule Your Consultation</h3>
            </div>
            
            <div className="p-12 text-center">
              {/* Placeholder for Calendly widget */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 bg-gray-50">
                <div className="text-gray-400 text-6xl mb-4">📅</div>
                <h4 className="text-2xl font-semibold text-gray-600 mb-4">Calendly Integration Placeholder</h4>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  The Calendly booking widget will be embedded here to allow visitors to schedule appointments directly.
                </p>
                <div className="bg-[var(--brand-teal)]/10 border border-[var(--brand-teal)]/30 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-[var(--brand-teal)] text-sm">
                    <strong>Next Step:</strong> Add Calendly embed code to replace this placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">Prefer to Contact Us Directly?</h3>
            <p className="text-white/90 mb-6">
              Not ready to schedule? Have questions first? We&apos;d love to hear from you.
            </p>
            <Link 
              href="/#contact" 
              className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              📧 Send Us a Message
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 