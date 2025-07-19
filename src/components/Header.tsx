import Link from 'next/link';

interface HeaderProps {
  currentPage?: 'home' | 'services' | 'portfolio' | 'blog' | 'appointments';
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[var(--brand-blue)]/85 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img
            src="/logo.webp"
            alt="DataSolace"
            className="h-24 w-auto mr-3"
          />
          <span className="text-white text-2xl font-bold hover:text-[var(--brand-teal)] transition-colors">
            DataSolace
          </span>
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