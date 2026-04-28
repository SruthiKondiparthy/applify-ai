import Head from 'next/head';
import Link from 'next/link';
import { FileText, Zap, Shield, Globe, Star, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-6 h-6 text-blue-400" />,
    title: 'AI-Powered CVs',
    description: 'Generate professional CVs tailored to your target job using advanced AI.',
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    title: 'Instant Results',
    description: 'Get your complete application package in seconds, not hours.',
  },
  {
    icon: <Shield className="w-6 h-6 text-green-400" />,
    title: 'Secure & Private',
    description: 'Your data is processed securely and never stored permanently.',
  },
  {
    icon: <Globe className="w-6 h-6 text-cyan-400" />,
    title: 'Multi-Language',
    description: 'Generate documents in German, English, and other languages.',
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    title: 'ATS Optimized',
    description: 'Documents optimized to pass Applicant Tracking Systems.',
  },
  {
    icon: <ArrowRight className="w-6 h-6 text-rose-400" />,
    title: 'Export to PDF',
    description: 'Download your CV and cover letter as professional PDF documents.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Applify AI - Smart Job Application Generator</title>
        <meta
          name="description"
          content="Generate professional CVs and cover letters with AI. Tailored to your target job in seconds."
        />
      </Head>

        return (
          <>
            <Head>
              <title>Genr8CV - Energize Your Job Search</title>
              <meta name="description" content="Energize your job search. Instantly create resumes from job ads." />
            </Head>

            <main className="min-h-screen bg-[#F9FAFB] font-sans">
              <header className="bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600 text-white p-10 rounded-b-3xl shadow-lg mb-12 animate-fadeIn">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-2 font-sans">Genr8CV</h1>
                    <p className="text-xl font-medium mb-4">Energize your job search.<br className="hidden md:inline" /> Instantly create resumes from job ads.</p>
                    <Link href="/generator">
                      <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform text-lg">Get Started</span>
                    </Link>
                  </div>
                  <svg width="120" height="120" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40 rounded-2xl shadow-2xl border-4 border-white">
                    <defs>
                      <linearGradient id="bg" x1="0" y1="0" x2="180" y2="48" gradientUnits="userSpaceOnUse">
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
                </div>
              </header>

              <section className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Why Genr8CV?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {features.map((feature, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow p-6 flex items-center gap-4 animate-slideUp">
                      <div>{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1E293B] mb-1">{feature.title}</h3>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </>
        );
      }
  );
}
