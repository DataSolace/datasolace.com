'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Declare Calendly global type
declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
      initPopupWidget: (options: {
        url: string;
        prefill?: Record<string, string | number | boolean>;
        utm?: Record<string, string>;
        layout?: string;
      }) => void;
    };
  }
}

export default function Appointments() {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openCalendly = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      setIsCalendlyLoaded(true);
      // Initialize badge widget
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/datasolace/initial-consultation',
          text: 'Schedule time with me',
          color: '#0069ff',
          textColor: '#ffffff',
          branding: true
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingLink = document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]');
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingLink) document.head.removeChild(existingLink);
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="appointments" />

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12 pt-40">
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

          {/* Calendly Widget */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[var(--brand-teal)] p-4">
              <h3 className="text-xl font-bold text-white text-center">Schedule Your Consultation</h3>
            </div>
            
            <div className="p-12 text-center">
              {!isCalendlyLoaded ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-teal)] mx-auto mb-4"></div>
                  <p className="text-gray-600 mb-6">Loading booking calendar...</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-6">📅</div>
                  <h4 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Schedule?</h4>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Click the button below to open our booking calendar and select a time that works for you.
                  </p>
                  <button
                    onClick={openCalendly}
                    className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block"
                  >
                    📅 Schedule Consultation
                  </button>
                </div>
              )}
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

      {/* Custom Calendly Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Close button - floating */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 text-white hover:text-gray-300 text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors backdrop-blur-sm"
          >
            ×
          </button>

          {/* Calendly iframe - direct, no wrapper */}
          <div className="relative w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src="https://calendly.com/datasolace/initial-consultation?embed_domain=localhost%3A3000"
              className="w-full h-full"
              frameBorder="0"
              title="Schedule a consultation"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}