import Link from 'next/link';

interface HeaderProps {
  currentPage?: 'home' | 'services' | 'portfolio' | 'blog' | 'appointments';
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="relative z-10 px-6 py-4 bg-[var(--brand-blue)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold hover:text-[var(--brand-teal)] transition-colors">
          DataSolace
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/services"
            className={`transition-colors ${
              currentPage === 'services'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className={`transition-colors ${
              currentPage === 'portfolio'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            className={`transition-colors ${
              currentPage === 'blog'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/appointments"
            className={`transition-colors ${
              currentPage === 'appointments'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Appointments
          </Link>
        </nav>
        <Link href="/#contact" className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-2 rounded-lg transition-colors">
          Contact Us
        </Link>
      </div>
    </header>
  );
}