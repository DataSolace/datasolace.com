'use client';

/*
 * The hero (scroll-driven sticky-note → automation transformation) lives in
 * src/components/ScrubHero.tsx, which carries its direction contract.
 */

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrubHero from '../components/ScrubHero';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newsletter: false,
    message: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');
  const [rateLimitInfo, setRateLimitInfo] = useState<{ retryAfter?: number; resetTime?: number }>({});

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
          message: '',
          website: ''
        });
      } else if (response.status === 429) {
        const errorData = await response.json() as { retryAfter?: number; resetTime?: number };
        setSubmitStatus('rate-limited');
        setRateLimitInfo({
          retryAfter: errorData.retryAfter,
          resetTime: errorData.resetTime
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
    <div className="min-h-screen">
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "DataSolace - Small Business Process Automation",
            "description": "Owner-led process automation for UK small businesses. We map how your work actually runs, connect the tools you already use, build what's missing, and keep it all running.",
            "url": "https://datasolace.com",
            "mainEntity": {
              "@type": "Organization",
              "name": "DataSolace Ltd",
              "url": "https://datasolace.com",
              "logo": "https://datasolace.com/logo.webp",
              "description": "Owner-led process automation partner for UK small businesses.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/datasolace",
                "https://twitter.com/datasolace",
                "https://www.instagram.com/datasolace"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://datasolace.com"
                }
              ]
            }
          })
        }}
      />
      <Header currentPage="home" />

      <div className="bg-[var(--brand-blue)]">
        {/* Hero: scroll-driven transformation — direction contract lives in src/components/ScrubHero.tsx */}
        <ScrubHero />

        {/* Capabilities Section */}
        <section className="bg-white py-20 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-[var(--brand-blue)] mb-6 text-balance">
                We map the work before we build the system.
              </h2>
              <p className="text-xl leading-relaxed text-[#374151]">
                DataSolace covers the whole span — understanding how the work
                actually happens, connecting the tools you already use, building
                what&apos;s missing, and keeping it all running. The people who design
                your system are the people who answer when it needs changing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-3">Process mapping &amp; documentation</h3>
                <p className="text-lg leading-relaxed text-[#374151] max-w-[52ch]">
                  We sit with the people who run the work and write down how it
                  really moves — who touches it, where it stalls, what lives only
                  in someone&apos;s head — so the process stops depending on memory.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-3">Systems integration</h3>
                <p className="text-lg leading-relaxed text-[#374151] max-w-[52ch]">
                  Your inbox, forms, spreadsheets, and job records already hold
                  the information. We connect them so it moves between systems
                  without retyping, chasing, or copy-paste.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-3">Custom internal tools</h3>
                <p className="text-lg leading-relaxed text-[#374151] max-w-[52ch]">
                  When nothing off the shelf fits how you work, we build the
                  form, dashboard, or portal your workflow actually needs —
                  shaped around your process, not the other way round.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-3">Hosting &amp; infrastructure</h3>
                <p className="text-lg leading-relaxed text-[#374151] max-w-[52ch]">
                  We run what we build — hosting, backups, monitoring, and
                  support — so the system keeps working long after it ships,
                  maintained by the people who made it.
                </p>
              </div>
            </div>

            <Link
              href="/appointments"
              className="inline-block bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
            >
              Book an intro call
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[var(--brand-blue)] py-20 px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Side - Text Content */}
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-[var(--brand-teal)] mb-6 text-balance">
                  Tell us where the work gets stuck.
                </h2>
                <div className="text-white text-xl leading-relaxed space-y-4">
                  <p>
                    The chasing, the retyping, the job that keeps landing back
                    on your desk — describe it the way you&apos;d describe it to a
                    colleague.
                  </p>
                  <p>
                    You&apos;ll be talking directly to the people who&apos;d build the
                    system: plain answers about what&apos;s worth automating, and
                    what isn&apos;t.
                  </p>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                {submitStatus === 'success' && (
                  <div role="status" className="mb-6 p-4 bg-[var(--brand-teal)]/20 border border-[var(--brand-teal)] rounded-lg">
                    <p className="text-[#9BE1D0] font-semibold">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div role="alert" className="mb-6 p-4 bg-red-500/20 border border-red-400 rounded-lg">
                    <p className="text-red-400 font-semibold">Sorry, there was an error sending your message. Please try again.</p>
                  </div>
                )}

                {submitStatus === 'rate-limited' && (
                  <div role="alert" className="mb-6 p-4 bg-yellow-500/20 border border-yellow-400 rounded-lg">
                    <p className="text-yellow-400 font-semibold">
                      Too many requests. Please wait a moment before trying again.
                      {rateLimitInfo.retryAfter && (
                        <span className="block text-sm mt-1">
                          You can try again in {Math.ceil(rateLimitInfo.retryAfter / 60)} minutes.
                        </span>
                      )}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-white text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/75 focus:border-[var(--brand-teal)] focus-visible:outline-white"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-white text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/75 focus:border-[var(--brand-teal)] focus-visible:outline-white"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email (required)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/75 focus:border-[var(--brand-teal)] focus-visible:outline-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/75 focus:border-[var(--brand-teal)] focus-visible:outline-white"
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
                      className="w-5 h-5 text-[var(--brand-teal)] bg-white/20 border-white/30 rounded focus-visible:outline-white"
                    />
                    <label htmlFor="newsletter" className="ml-3 py-2 text-white text-sm">
                      Sign up for news and updates
                    </label>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Message (required)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/75 focus:border-[var(--brand-teal)] focus-visible:outline-white resize-none"
                      placeholder="What's the process that's slowing you down?"
                    ></textarea>
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-lg text-xl font-bold transition-colors focus-visible:outline-white ${
                        isSubmitting
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-[var(--brand-teal)] hover:bg-[var(--brand-green)]'
                      } text-white`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
