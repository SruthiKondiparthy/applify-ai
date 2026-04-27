import Link from 'next/link';
import { Zap, Github } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
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

        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Applify AI. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            Home
          </Link>
          <Link href="/generator" className="text-slate-400 hover:text-white text-sm transition-colors">
            Generator
          </Link>
          <a
            href="https://github.com/SruthiKondiparthy/applify-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
