'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface HeaderProps {
  currentPage?: 'home' | 'services' | 'portfolio' | 'blog' | 'appointments';
}

export default function Header({ currentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-2 sm:py-4 md:py-6 bg-[var(--brand-blue)]/85 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo.webp"
            alt="DataSolace"
            width={96}
            height={96}
            className="h-8 w-auto sm:h-10 md:h-12 lg:h-16 xl:h-20 mr-2 sm:mr-3"
          />
          <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold hover:text-[var(--brand-teal)] transition-colors">
            DataSolace
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Contact Button - Hidden on mobile when menu is open */}
        <Link
          href="/#contact"
          className={`bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-2 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${isMenuOpen ? 'hidden' : 'block'}`}
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-[var(--brand-blue)]/95 backdrop-blur-sm border-b border-white/10 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="px-4 py-4 space-y-4 text-center">
          <Link
            href="/services"
            onClick={closeMenu}
            className={`block py-2 transition-colors ${
              currentPage === 'services'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            onClick={closeMenu}
            className={`block py-2 transition-colors ${
              currentPage === 'portfolio'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            onClick={closeMenu}
            className={`block py-2 transition-colors ${
              currentPage === 'blog'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/appointments"
            onClick={closeMenu}
            className={`block py-2 transition-colors ${
              currentPage === 'appointments'
                ? 'text-[var(--brand-teal)] font-semibold'
                : 'text-white hover:text-[var(--brand-teal)]'
            }`}
          >
            Appointments
          </Link>
          <Link
            href="/#contact"
            onClick={closeMenu}
            className="block py-2 text-white hover:text-[var(--brand-teal)] transition-colors"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}