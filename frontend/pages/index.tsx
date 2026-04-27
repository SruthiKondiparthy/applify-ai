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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            <span className="text-white">Job Applications</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Generate professional CVs and cover letters tailored to your dream job in seconds.
            Stand out from the crowd with AI-crafted, ATS-optimized documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Start Generating <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/SruthiKondiparthy/applify-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 px-8 py-3 rounded-lg font-semibold hover:border-slate-400 hover:text-white transition-all"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Everything You Need to Land Your Dream Job
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-500 transition-all animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-slate-700 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>          
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Generate My Application <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
