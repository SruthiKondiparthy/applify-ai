import Link from 'next/link';
import { FileText, Github } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <FileText className="h-5 w-5 text-blue-400" />
              Applify
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered German CV &amp; cover letter generator. Stand out in
              every application.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/generator', label: 'Generator' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/SruthiKondiparthy/applify-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {year} Applify. Built with Next.js &amp; FastAPI.
        </div>
      </div>
    </footer>
  );
}
