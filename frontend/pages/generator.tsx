import Head from 'next/head';
import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import ResumeForm from '@/components/ResumeForm';
import { useResumeStore } from '@/store/resumeStore';

export default function GeneratorPage() {
  const output = useResumeStore((s) => s.output);
  const [activeTab, setActiveTab] = useState<'cv' | 'cover'>('cv');
  const [copied, setCopied] = useState(false);

  const activeText =
    activeTab === 'cv' ? output?.cv_text ?? '' : output?.cover_letter_text ?? '';

  const handleCopy = async () => {
    if (!activeText) return;
    await navigator.clipboard.writeText(activeText);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    if (!output?.pdf_base64) return;
    const bytes = atob(output.pdf_base64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applify_output.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDocx = () => {
    if (!output?.docx_base64) return;
    const bytes = atob(output.docx_base64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'applify_output.docx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Generator — Applify</title>
        <meta
          name="description"
          content="Generate your AI-crafted CV and cover letter for any job."
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100">
            CV &amp; Cover Letter Generator
          </h1>
          <p className="text-slate-400 mt-1">
            Fill in your details below and click &ldquo;Generate&rdquo; to create
            your documents.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Form */}
          <div>
            <ResumeForm onSuccess={() => setActiveTab('cv')} />
          </div>

          {/* Right — Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="card space-y-4 min-h-[600px]">
              {/* Tab bar */}
              <div className="flex gap-2 border-b border-slate-700 pb-3">
                {(['cv', 'cover'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'cv' ? 'CV' : 'Cover Letter'}
                  </button>
                ))}

                {output && (
                  <div className="ml-auto flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>

                    {output.pdf_base64 && (
                      <button
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </button>
                    )}

                    {output.docx_base64 && (
                      <button
                        onClick={handleDownloadDocx}
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm"
                        title="Download DOCX"
                      >
                        <Download className="h-4 w-4" />
                        DOCX
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              {output ? (
                <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans overflow-y-auto max-h-[70vh] animate-fadeIn">
                  {activeText || (
                    <span className="text-slate-500 italic">
                      No content for this tab.
                    </span>
                  )}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <p className="text-4xl mb-4">📄</p>
                  <p className="text-sm">
                    Your generated documents will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
