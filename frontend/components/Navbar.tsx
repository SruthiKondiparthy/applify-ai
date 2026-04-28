import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-fuchsia-400/30 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-pink-300 transition-colors">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-900">
            <Image
              src="/genr8cv_logo.svg"
              alt="Genr8CV Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          Genr8CV
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-slate-200 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/generator" className="text-slate-200 hover:text-white transition-colors">
            Generator
          </Link>
          <Link
            href="/generator"
            className="bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all text-sm"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-fuchsia-400/30 bg-slate-900 px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-slate-200 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/generator" className="text-slate-200 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
            Generator
          </Link>
          <Link
            href="/generator"
            className="bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
