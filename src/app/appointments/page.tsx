'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CALENDLY_URL = 'https://calendly.com/datasolace/initial-consultation';

export default function Appointments() {
  const [showModal, setShowModal] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showModal) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [showModal]);

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="appointments" />

      <div className="relative z-10 px-6 py-12 pt-40">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="max-w-2xl mb-14">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
              Book an intro call.
            </h1>
            <p className="text-xl leading-relaxed text-[var(--brand-white)]/85">
              Thirty minutes on the process that&apos;s slowing your team down,
              with the people who&apos;d actually build the fix. No sales layer,
              no scripted pitch.
            </p>
          </div>

          {/* What to expect */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 sm:p-10 mb-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-xl font-bold text-[#9BE1D0] mb-4">
                  What we&apos;ll cover
                </h2>
                <ul className="space-y-3 text-[var(--brand-white)]/90 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]" />
                    Where the work stalls — the handoffs, chasing, and retyping
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]" />
                    The tools you already use, and what they aren&apos;t doing for you
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]" />
                    What&apos;s worth automating first — and what isn&apos;t
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]" />
                    A straight answer on likely effort and cost
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#9BE1D0] mb-4">
                  What happens after
                </h2>
                <ul className="space-y-3 text-[var(--brand-white)]/90 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]" />
                    A short written summary of what we heard
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]" />
                    If there&apos;s a fit, a proposal that starts with mapping your process
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]" />
                    If there isn&apos;t, we&apos;ll say so — no obligation either way
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking card */}
          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-[var(--brand-blue)] mb-3">
              Pick a time
            </h2>
            <p className="text-[#374151] mb-8 max-w-md mx-auto leading-relaxed">
              The calendar opens right here — choose a slot that suits you and
              we&apos;ll take it from there.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
            >
              Open the booking calendar
            </button>
          </div>

          {/* Alternative contact */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Prefer to start in writing?
            </h2>
            <p className="text-[var(--brand-white)]/90 mb-6 leading-relaxed max-w-xl mx-auto">
              Not ready to book, or have a question first? Describe the process
              that&apos;s bothering you and we&apos;ll reply personally.
            </p>
            <Link
              href="/#contact"
              className="inline-block text-white border border-white/35 hover:border-white/70 hover:bg-white/5 px-8 py-4 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Send us a message
            </Link>
          </div>
        </div>
      </div>
      <Footer />

      {/* Calendly Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Booking calendar"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          <button
            ref={closeButtonRef}
            onClick={() => setShowModal(false)}
            aria-label="Close booking calendar"
            className="absolute top-6 right-6 z-10 text-white hover:text-gray-300 text-3xl font-bold w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors backdrop-blur-sm focus-visible:outline-white"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="relative w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src={CALENDLY_URL}
              className="w-full h-full"
              title="Schedule an intro call"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
