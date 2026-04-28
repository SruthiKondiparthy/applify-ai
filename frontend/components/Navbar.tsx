import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-pink-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-pink-600 hover:text-orange-500 transition-colors">
          <span className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9800"/>
                  <stop offset="1" stopColor="#EC4899"/>
                </linearGradient>
                <linearGradient id="bolt" x1="16" y1="18" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFD600"/>
                  <stop offset="1" stopColor="#FF9800"/>
                </linearGradient>
              </defs>
              <rect width="48" height="48" rx="12" fill="url(#bg)"/>
              <g>
                <rect x="10" y="10" width="28" height="28" rx="6" fill="white"/>
                <polygon points="24,14 28,22 22,22 28,34 24,26 30,26" fill="url(#bolt)"/>
              </g>
            </svg>
          </span>
          Genr8CV
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-pink-500 hover:text-orange-500 transition-colors font-medium">
            Home
          </Link>
          <Link href="/generator" className="text-pink-500 hover:text-orange-500 transition-colors font-medium">
            Generator
          </Link>
          <Link
            href="/generator"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform text-sm shadow"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-700 bg-slate-900 px-4 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="text-slate-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/generator"
            className="text-slate-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Generator
          </Link>
          <Link
            href="/generator"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
