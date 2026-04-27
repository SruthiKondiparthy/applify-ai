import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-blue-400 transition-colors">
        <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-900">
          <Image
            src="/applify_logo.png"
            alt="Applify Logo"
            width={32}
            height={32}
            className="object-cover scale-110"
          />
        </div>          
          Applify AI
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/generator" className="text-slate-300 hover:text-white transition-colors">
            Generator
          </Link>
          <Link
            href="/generator"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all text-sm"
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
