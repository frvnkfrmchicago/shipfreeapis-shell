'use client';

import Link from 'next/link';
import { LinkedinLogo, Heart } from '@phosphor-icons/react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-card-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-plum to-cyan-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">{'<>'}</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              ShipFreeAPIs
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted">
            <Link href="/#unlock" className="hover:text-foreground transition-colors">APIs</Link>
            <Link href="/glossary" className="hover:text-foreground transition-colors">Glossary</Link>
          </nav>

          {/* Credit with LinkedIn */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-plum" weight="fill" />
            <span>by</span>
            <a 
              href="https://www.linkedin.com/in/frankdlawrencejr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-plum-light transition-colors font-medium"
            >
              <span>Frank D. Lawrence Jr.</span>
              <LinkedinLogo className="w-4 h-4" weight="fill" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-card-border text-center text-xs text-muted/60">
          <p>&copy; {new Date().getFullYear()} ShipFreeAPIs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
