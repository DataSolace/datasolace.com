'use client';

/*
 * HERO DIRECTION CONTRACT
 * THESIS: Proof is the paperwork. The hero shows DataSolace's actual deliverable —
 * a maintained process sheet — refusing the category's abstract workflow diagram.
 * OWN-WORLD: Deep blue ground (#1D2D46), white paper artifact at 4px corners,
 * Montserrat document typography, one Kalam handwritten annotation, teal (#029979)
 * concentrated in a single timeline rule. Depth from offset shadow, never gloss.
 * STORY: An owner recognises their own scattered notes beneath a calm, owned,
 * revision-marked process — and believes this firm writes work down and keeps it.
 * FIRST VIEWPORT: Two columns. Left: kicker, H1, support, two CTAs, trust chips.
 * Right: two muted scraps under the process sheet; revision line is the focal beat.
 * FORM: Maintained process sheet — ranked #1 of 4 derived structures; local
 * extension inside the established world, no concept seed.
 */

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
            "name": "DataSolace - Business & Home Automation Solutions",
            "description": "Transform your business and home with cutting-edge automation solutions. From enterprise infrastructure to luxury smart homes, we deliver bespoke automation that scales with your needs.",
            "url": "https://datasolace.com",
            "mainEntity": {
              "@type": "Organization",
              "name": "DataSolace Ltd",
              "url": "https://datasolace.com",
              "logo": "https://datasolace.com/logo.webp",
              "description": "Transform your business and home with cutting-edge automation solutions.",
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
        {/* Hero Section */}
        <section className="relative px-6 pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center min-h-[62vh]">
            {/* Copy column */}
            <div className="max-w-xl">
              <p className="text-sm font-medium tracking-wide text-[#9BE1D0] mb-5">
                Small business process automation
              </p>
              <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-[3.5rem] font-bold text-white mb-6 text-balance">
                Automation shaped around your business.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--brand-white)]/85 mb-9 max-w-[46ch]">
                Direct, owner-led help with the admin and handoffs slowing your team down.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/#contact"
                  className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-7 py-3.5 rounded-lg text-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Start a conversation
                </Link>
                <Link
                  href="/services"
                  className="text-white border border-white/35 hover:border-white/70 hover:bg-white/5 px-7 py-3.5 rounded-lg text-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  See what we automate
                </Link>
              </div>

              <ul aria-label="How we work" className="flex flex-wrap gap-x-7 gap-y-3">
                {['Owner-led', 'Plain language', 'Built to maintain'].map((chip) => (
                  <li key={chip} className="flex items-center gap-2 text-sm font-medium text-[var(--brand-white)]/80">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]" />
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual column: the maintained process sheet */}
            <div
              role="img"
              aria-label="Scattered handwritten notes sitting behind a clear, maintained process sheet listing five owned steps from enquiry to invoice."
              className="relative mx-auto w-full max-w-md lg:max-w-none select-none"
            >
              <div aria-hidden="true" className="relative pt-10 pb-16 lg:pt-12">
                {/* Scrap: torn note (the old way) */}
                <div className="hidden sm:block absolute top-0 -left-2 lg:-left-6 w-44 p-4 pb-6 bg-[#E9ECEC] text-[#3D4A63] -rotate-6 shadow-[0_8px_20px_-6px_rgba(7,17,31,0.5)] [clip-path:polygon(0_0,100%_0,100%_88%,92%_100%,74%_91%,55%_100%,34%_92%,15%_100%,0_90%)]">
                  <p className="[font-family:var(--font-hand)] text-[1.05rem] leading-snug">
                    ring them back Tues??
                    <br />
                    <span className="line-through decoration-[1.5px]">invoice sent?</span> still not!!
                  </p>
                </div>

                {/* Scrap: sticky note (the old way) */}
                <div className="absolute top-2 right-0 lg:right-2 w-36 p-3.5 bg-[#E8E0B4] text-[#4A4630] rotate-3 shadow-[0_6px_16px_-5px_rgba(7,17,31,0.45)]">
                  <p className="[font-family:var(--font-hand)] text-[1.05rem] leading-snug">
                    who&apos;s chasing this?
                  </p>
                </div>

                {/* The maintained process sheet */}
                <div className="relative mt-6 mx-auto sm:ml-10 lg:ml-14 max-w-sm lg:max-w-[26rem] bg-white rounded-[4px] shadow-[0_18px_44px_-12px_rgba(7,17,31,0.55),0_2px_6px_rgba(7,17,31,0.25)] p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <p className="text-[0.6875rem] font-semibold tracking-wide uppercase text-[#5D6B80]">
                      Process sheet
                    </p>
                    <p className="text-[0.6875rem] font-semibold tracking-wide uppercase text-[#5D6B80]">
                      Maintained
                    </p>
                  </div>
                  <h2 className="text-xl font-bold text-[var(--brand-blue)] mb-1">
                    Enquiry to invoice
                  </h2>
                  <p className="text-[0.8125rem] text-[#4B5563] mb-5">
                    Mapped with the people who run the work
                  </p>

                  <ol className="relative space-y-3.5 mb-5">
                    {/* The one teal thread: the document's own timeline rule */}
                    <span className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[var(--brand-teal)]/70" />
                    {[
                      { step: 'Enquiry arrives — email, call, or form — logged in one place', owner: 'System' },
                      { step: 'Quote drafted from the job notes, sent for a quick check', owner: 'Office' },
                      { step: 'Booking confirmed; customer reminded the day before', owner: 'System' },
                      { step: 'Job completed; notes captured on site', owner: 'Team' },
                      { step: 'Invoice raised the same day; chasing happens by itself', owner: 'System' },
                    ].map((row, i) => (
                      <li key={i} className="relative flex items-start gap-3 pl-0">
                        <span className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[var(--brand-teal)] text-[var(--brand-blue)] text-[0.6875rem] font-bold grid place-items-center">
                          {i + 1}
                        </span>
                        <span className="text-[0.8125rem] leading-snug text-[#374151] pt-0.5 flex-1">
                          {row.step}
                        </span>
                        <span
                          className={`flex-shrink-0 text-[0.625rem] font-semibold px-1.5 py-0.5 rounded-[3px] mt-0.5 ${
                            row.owner === 'System'
                              ? 'bg-[#D8F5EF] text-[#00564A]'
                              : 'bg-[#EEF1F1] text-[#42506B]'
                          }`}
                        >
                          {row.owner}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="bg-[var(--brand-white)] rounded-[3px] px-3.5 py-2.5 mb-5">
                    <p className="text-[0.75rem] leading-snug text-[#374151]">
                      <span className="font-semibold text-[var(--brand-blue)]">Exceptions:</span>{' '}
                      urgent jobs jump straight to booking — flagged, never lost.
                    </p>
                  </div>

                  {/* Focal beat: the revision line */}
                  <div className="flex items-center gap-2 pt-3.5 border-t border-[#E5E7EB]">
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-[var(--brand-teal)]">
                      <path d="M2 6.5L4.7 9L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[0.8125rem] font-semibold text-[var(--brand-blue)]">
                      Revision 3 — reviewed with the team
                    </p>
                  </div>

                  {/* Handwritten margin annotation */}
                  <div className="absolute -bottom-14 right-1 lg:-right-6 w-40 -rotate-2 text-[#B7C6E4]">
                    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" aria-hidden="true" className="ml-2 mb-0.5">
                      <path d="M4 22C7 12 13 5 26 3M26 3l-6.5 1M26 3l-1.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="[font-family:var(--font-hand)] text-[1rem] leading-tight">
                      this used to live in three inboxes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Let&apos;s Build 🔧<br />
              <span className="inline-block mt-2">🚀 Brilliant Things</span>
            </h2>
            <p className="text-xl text-gray-700 mb-16 max-w-4xl mx-auto">
              We are a trusted partner for Business and Home automation, bringing over a decade of systems design and engineering to those who want to focus on what matters most.
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Business Features */}
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Business Solutions</h3>
                  <ul className="space-y-4 mb-8 max-w-sm mx-auto md:mx-0 flex-grow">
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
                    <Link href="/appointments" className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block">
                      🚀 Automate My Business
                    </Link>
                  </div>
                </div>

                {/* Home Features */}
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Home Solutions</h3>
                  <ul className="space-y-4 mb-8 max-w-sm mx-auto md:mx-0 flex-grow">
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
                    <Link href="/appointments" className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block">
                      🚀 Automate My Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[var(--brand-blue)] py-20 px-8 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Side - Text Content */}
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-[var(--brand-teal)] mb-6">
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
                  <div className="mb-6 p-4 bg-[var(--brand-teal)]/20 border border-[var(--brand-teal)] rounded-lg">
                    <p className="text-[var(--brand-teal)] font-semibold">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-400 rounded-lg">
                    <p className="text-red-400 font-semibold">Sorry, there was an error sending your message. Please try again.</p>
                  </div>
                )}

                {submitStatus === 'rate-limited' && (
                  <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-400 rounded-lg">
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
                      <label className="block text-white text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[var(--brand-teal)]"
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
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[var(--brand-teal)]"
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
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[var(--brand-teal)]"
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
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[var(--brand-teal)]"
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
                      className="w-4 h-4 text-[var(--brand-teal)] bg-white/20 border-white/30 rounded focus:ring-[var(--brand-teal)]"
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
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[var(--brand-teal)] resize-none"
                      placeholder="Tell us about your automation needs..."
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
                      className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                        isSubmitting
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-[var(--brand-teal)] hover:bg-[var(--brand-green)]'
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
      <Footer />
    </div>
  );
}
