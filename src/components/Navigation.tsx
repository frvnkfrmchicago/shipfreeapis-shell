'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { List, X, Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

const navItems = [
  { label: 'APIs', href: '#unlock' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Pricing', href: '/pricing' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-card-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#0d1321] border border-blue-900/50 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-900/10 transition-all">
              <span className="text-white font-bold text-sm">{`<>`}</span>
            </div>
            <span className="text-xl font-bold navy-shimmer">
              ShipFreeAPIs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                className="text-muted hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl bg-card/70 hover:bg-card/90 border border-card-border transition-all text-muted hover:text-foreground"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
              </button>
            )}
            <Link 
              href="#unlock"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-plum-dark to-plum text-white font-medium shadow-lg shadow-plum/40 hover:shadow-plum/60 transition-all hover:scale-105"
            >
              Get Access
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-card-border">
          <nav className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-muted hover:text-foreground transition-colors font-medium py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="#unlock"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-plum-dark to-plum text-white font-medium shadow-lg shadow-plum/40"
            >
              Get Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
