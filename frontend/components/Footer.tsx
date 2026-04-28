import Link from 'next/link';
import { Github } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-fuchsia-400/30 bg-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-900">
            <Image src="/genr8cv_logo.svg" alt="Genr8CV Logo" width={32} height={32} className="object-cover" />
          </div>
          Genr8CV
        </Link>

        <p className="text-slate-300 text-sm">© {new Date().getFullYear()} Genr8CV. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-300 hover:text-white text-sm transition-colors">
            Home
          </Link>
          <Link href="/generator" className="text-slate-300 hover:text-white text-sm transition-colors">
            Generator
          </Link>
          <a
            href="https://github.com/SruthiKondiparthy/applify-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
