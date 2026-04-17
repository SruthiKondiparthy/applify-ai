import Head from 'next/head';
import Link from 'next/link';
import { FileText, Zap, Globe, Download, Shield, Cpu } from 'lucide-react';

const FEATURES = [
  {
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    title: 'AI-Powered Generation',
    desc: 'DeepSeek AI crafts professional CVs and cover letters tailored to each job.',
  },
  {
    icon: <Globe className="h-6 w-6 text-purple-400" />,
    title: 'German & English',
    desc: 'Generate documents in German (Deutsch) or English to match the job requirements.',
  },
  {
    icon: <FileText className="h-6 w-6 text-green-400" />,
    title: 'Full CV Builder',
    desc: 'Add experience, education, skills, and languages with an intuitive form.',
  },
  {
    icon: <Download className="h-6 w-6 text-yellow-400" />,
    title: 'PDF & DOCX Export',
    desc: 'Download your generated documents as PDF or DOCX files instantly.',
  },
  {
    icon: <Shield className="h-6 w-6 text-red-400" />,
    title: 'Privacy First',
    desc: 'Your data is processed locally and not stored permanently on any server.',
  },
  {
    icon: <Cpu className="h-6 w-6 text-cyan-400" />,
    title: 'FastAPI Backend',
    desc: 'Lightning-fast Python backend powered by FastAPI and modern AI models.',
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Applify — AI German CV &amp; Cover Letter Generator</title>
        <meta
          name="description"
          content="Generate professional German CVs and cover letters with AI. Tailored to each job description."
        />
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="animate-slideUp">
            <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-widest mb-6">
              <FileText className="h-4 w-4" />
              AI-Powered Applications
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="gradient-text">Applify</span>
              <br />
              <span className="text-slate-100">German CV &amp; Cover Letter</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Generate professional, AI-crafted CVs and cover letters in German
              or English — tailored to every job description in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generator" className="btn-primary py-3 px-8 text-base">
                Start Generating Free
              </Link>
              <a
                href="https://github.com/SruthiKondiparthy/applify-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-3 px-8 text-base"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">
            Everything you need to get hired
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A complete toolkit for crafting stand-out application documents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="card hover:border-slate-600 transition-colors animate-fadeIn"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-slate-100 font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">
            Ready to land your next role?
          </h2>
          <p className="text-slate-400 mb-8">
            Fill in your details and let the AI craft the perfect application.
          </p>
          <Link href="/generator" className="btn-primary py-3 px-10 text-base">
            Open Generator →
          </Link>
        </div>
      </section>
    </>
  );
}
