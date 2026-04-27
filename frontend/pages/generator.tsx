import Head from 'next/head';
import { useState } from 'react';
import { Copy, Check, FileText, Mail, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import ResumeForm from '../components/ResumeForm';
import { useResumeStore } from '../store/resumeStore';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-slate-400 hover:text-white transition-colors p-1 rounded"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function ResultSection({
  title,
  icon,
  content,
}: {
  title: string;
  icon: React.ReactNode;
  content: string;
}) {
  if (!content) return null;
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          {icon} {title}
        </h3>
        <CopyButton text={content} />
      </div>
      <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">{content}</pre>
    </div>
  );
}

export default function Generator() {
  const { result } = useResumeStore();

  return (
    <>
      <Head>
        <title>Generator - Applify AI</title>
        <meta name="description" content="Generate your CV and cover letter with AI" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CV & Cover Letter Generator</h1>
          <p className="text-slate-400">
            Fill in your details and your dream job and let AI generate a tailored application for you.
          </p>          
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Column */}
          <div className="lg:w-1/2 xl:w-2/5">
            <ResumeForm />
          </div>

          {/* Results Column */}
          <div className="lg:w-1/2 xl:w-3/5">
            {result ? (
              <div className="animate-fadeIn">
                <h2 className="text-xl font-semibold text-white mb-4">Generated Documents</h2>
                <ResultSection
                  title="Curriculum Vitae"
                  icon={<FileText className="w-4 h-4 text-blue-400" />}
                  content={result.cv_text}
                />
                <ResultSection
                  title="Cover Letter"
                  icon={<Mail className="w-4 h-4 text-purple-400" />}
                  content={result.cover_letter_text}
                />
                <ResultSection
                  title="Application Info"
                  icon={<Info className="w-4 h-4 text-cyan-400" />}
                  content={result.unterlagen_info}
                />
                {result.cv_simple && (
                  <ResultSection
                    title="CV (Simple Version)"
                    icon={<FileText className="w-4 h-4 text-slate-400" />}
                    content={result.cv_simple}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-700 rounded-xl text-center p-8">
                <FileText className="w-12 h-12 text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-400 mb-2">No documents yet</h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Fill in the form on the left and click &quot;Generate Documents&quot; to create your
                  personalized CV and cover letter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
