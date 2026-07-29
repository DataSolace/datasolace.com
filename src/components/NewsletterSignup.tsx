'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  newsletterId?: string;
}

export default function NewsletterSignup({ newsletterId = 'datasolace' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newsletterId, website }),
      });
      const body = (await response.json().catch(() => null)) as { success?: boolean } | null;

      if (response.ok && body?.success) {
        setEmail('');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-[var(--brand-blue)] mb-2">
        Get new posts by email
      </h2>
      <p className="text-gray-600 mb-6">
        Occasional notes on process automation for small businesses. No spam,
        unsubscribe any time.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]"
        />

        <div className="hidden" aria-hidden="true">
          <label htmlFor="newsletter-website">Website</label>
          <input
            id="newsletter-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] disabled:opacity-60 text-white px-6 py-3 rounded-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
        >
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      <p role="status" aria-live="polite" className="mt-3 text-sm min-h-5">
        {status === 'success' && (
          <span className="text-[var(--brand-teal-text)]">
            Thanks — you&apos;re subscribed.
          </span>
        )}
        {status === 'error' && (
          <span className="text-red-600">
            Something went wrong. Please try again.
          </span>
        )}
      </p>
    </div>
  );
}
