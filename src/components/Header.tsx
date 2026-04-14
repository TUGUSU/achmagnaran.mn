'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';


const navLinks = [
  { label: 'Нүүр', href: '#hero' },
  { label: 'Бидний тухай', href: '#about' },
  { label: 'Бүтээгдэхүүн', href: '#products' },
  { label: 'Давуу тал', href: '#trust' },
  { label: 'Холбоо барих', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'nav-blur bg-warm-dark/90 border-b border-warm-light shadow-warm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-3 group"
            >
              <AppLogo size={40} />
              <div className="hidden sm:block">
                <span className="font-display font-700 text-base text-cream tracking-tight block leading-tight">
                  Ачмаг Наран
                </span>
                <span className="text-[10px] text-cream-muted tracking-widest uppercase">ХХК</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[13px] font-medium text-cream-muted hover:text-cream transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Social + CTA */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61557235019083"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-warm-light flex items-center justify-center text-cream-muted hover:text-cream hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                aria-label="Facebook хуудас"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/achmagnaranllc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-warm-light flex items-center justify-center text-cream-muted hover:text-cream hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                aria-label="Instagram хуудас"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* CTA Button (desktop) */}
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-orange-gradient text-white text-[13px] font-semibold rounded-sm hover:shadow-warm transition-all duration-300 hover:-translate-y-0.5"
              >
                Холбоо барих
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-sm border border-warm-light hover:border-primary/40 transition-colors"
                aria-label="Цэс нээх"
              >
                <span className={`block w-5 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-warm-dark/95 nav-blur md:hidden flex flex-col"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex-1 flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-2xl font-semibold text-cream hover:text-primary-light transition-colors duration-200"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61557235019083" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-warm-light rounded-sm text-cream-muted text-sm hover:border-primary/40 hover:text-cream transition-all">
                Facebook
              </a>
              <a href="https://www.instagram.com/achmagnaranllc" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-warm-light rounded-sm text-cream-muted text-sm hover:border-primary/40 hover:text-cream transition-all">
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}