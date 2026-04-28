import Head from 'next/head';
import Link from 'next/link';
import { FileText, Zap, Shield, Globe, Star, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-6 h-6 text-orange-300" />,
    title: 'Resume + Cover Letter',
    description: 'Generate tailored resumes and cover letters from one job description.',
  },
  {
    icon: <Zap className="w-6 h-6 text-pink-300" />,
    title: 'Two Smart Paths',
    description: 'Already have a resume? Check compatibility. No resume? Build one from JD requirements.',
  },
  {
    icon: <Shield className="w-6 h-6 text-green-300" />,
    title: 'Gap Visibility',
    description: 'See strengths and missing requirements before deciding to generate full documents.',
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-300" />,
    title: 'Structured Guidance',
    description: 'Get requirement extraction, keywords, and suggested resume sections instantly.',
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-300" />,
    title: 'ATS Focused',
    description: 'Content is shaped to improve screening relevance and recruiter readability.',
  },
  {
    icon: <ArrowRight className="w-6 h-6 text-rose-300" />,
    title: 'User-Controlled Flow',
    description: 'You decide when to stop at analysis or continue to create application documents.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Genr8CV - Resume & Cover Letter Generator</title>
        <meta
          name="description"
          content="Genr8CV helps you analyze job descriptions, find resume gaps, and generate resumes and cover letters."
        />
      </Head>

      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-indigo-500/20 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              Genr8CV
            </span>{' '}
            <span className="text-white">for Smart Applications</span>
          </h1>
          <p className="text-xl text-slate-200 mb-10 max-w-3xl mx-auto">
            Main goal: generate a strong resume and cover letter from a job description. If you already have a resume,
            compare and find gaps first. If you don&apos;t, extract requirements from JD and build your resume with guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Start Generating <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Everything You Need to Decide and Apply</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-6 hover:border-pink-300/70 transition-all animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
