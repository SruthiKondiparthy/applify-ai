import Link from 'next/link';
import { Zap, Github } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-pink-200 bg-white py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-pink-600">
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

        <p className="text-pink-400 text-sm">
          © {new Date().getFullYear()} Genr8CV. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-pink-500 hover:text-orange-500 text-sm transition-colors font-medium">
            Home
          </Link>
          <Link href="/generator" className="text-pink-500 hover:text-orange-500 text-sm transition-colors font-medium">
            Generator
          </Link>
          <a
            href="https://github.com/SruthiKondiparthy/applify-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-orange-500 transition-colors"
            aria-label="GitHub"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.872.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.372.813 1.104.813 2.225 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
