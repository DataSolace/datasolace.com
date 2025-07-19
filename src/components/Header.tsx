import Link from 'next/link';

interface HeaderProps {
  currentPage?: 'home' | 'services' | 'portfolio' | 'blog' | 'appointments';
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-2xl font-bold hover:text-green-400 transition-colors">
          DataSolace
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/services" 
            className={`transition-colors ${
              currentPage === 'services' 
                ? 'text-green-400 font-semibold' 
                : 'text-white hover:text-green-400'
            }`}
          >
            Services
          </Link>
          <Link 
            href="/portfolio" 
            className={`transition-colors ${
              currentPage === 'portfolio' 
                ? 'text-green-400 font-semibold' 
                : 'text-white hover:text-green-400'
            }`}
          >
            Portfolio
          </Link>
          <Link 
            href="/blog" 
            className={`transition-colors ${
              currentPage === 'blog' 
                ? 'text-green-400 font-semibold' 
                : 'text-white hover:text-green-400'
            }`}
          >
            Blog
          </Link>
          <Link 
            href="/appointments" 
            className={`transition-colors ${
              currentPage === 'appointments' 
                ? 'text-green-400 font-semibold' 
                : 'text-white hover:text-green-400'
            }`}
          >
            Appointments
          </Link>
        </nav>
        <Link href="/#contact" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
          Contact Us
        </Link>
      </div>
    </header>
  );
} 