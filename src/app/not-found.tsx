import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--brand-blue)] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center px-6 pt-28">
        <div className="max-w-2xl mx-auto text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            This page isn&apos;t on the process sheet.
          </h1>
          <p className="text-xl leading-relaxed text-[var(--brand-white)]/85 mb-10">
            The address may have changed, or the link was mistyped. Everything
            we do is reachable from the pages below.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-3.5 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Back to the homepage
            </Link>
            <Link
              href="/services"
              className="text-white border border-white/35 hover:border-white/70 hover:bg-white/5 px-6 py-3.5 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              What we automate
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
