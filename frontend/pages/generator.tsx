
import { useState } from 'react';
import { Copy, Check, FileText, Mail, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { useResumeStore } from '../store/resumeStore';
import { extractRequirements } from '../services/api';
import ResumeForm from '../components/ResumeForm';

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

function Generator() {
  const { result } = useResumeStore();
  const [useCase, setUseCase] = useState<'match' | 'create' | null>(null);
  const [jdText, setJdText] = useState('');
  const [step, setStep] = useState(1);
  const [requirements, setRequirements] = useState<any>(null);

  const handleExtractRequirements = async () => {
    try {
      const result = await extractRequirements(jdText);
      setRequirements(result);
      setStep(2);
    } catch (err) {
      toast.error('Failed to extract requirements from job description.');
    }
  };

  return (
    <>
      <Head>
        <title>Genr8CV - Generator</title>
        <meta name="description" content="Generate your CV and cover letter with AI" />
      </Head>

      <main className="min-h-screen bg-[#F9FAFB] font-sans">
        <header className="bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600 text-white p-10 rounded-b-3xl shadow-lg mb-12 animate-fadeIn">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 font-sans">CV & Cover Letter Generator</h1>
              <p className="text-lg md:text-xl font-medium mb-4">Fill in your details and your dream job and let AI generate a tailored application for you.</p>
            </div>
            <button
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform mr-4"
              onClick={() => setUseCase('match')}
            >
              Match job with resume
            </button>
            <button
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
              onClick={() => setUseCase('create')}
            >
              Create resume from job description
            </button>
          </div>
        </header>

                          {/* Usecase 1: Match job with resume (existing flow) */}
                          {useCase === 'match' && (
                            <div className="flex flex-col lg:flex-row gap-8">
                              <div className="lg:w-1/2 xl:w-2/5">
                                <ResumeForm />
                              </div>
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
                          )}

                          {/* Usecase 2: Create resume from job description */}
                          {useCase === 'create' && step === 1 && (
                            <div className="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                              <h2 className="text-xl font-semibold text-white mb-4">Paste Job Description</h2>
                              <textarea
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-base mb-4"
                                rows={8}
                                placeholder="Paste the full job description here..."
                                value={jdText}
                                onChange={e => setJdText(e.target.value)}
                              />
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg"
                                onClick={handleExtractRequirements}
                                disabled={!jdText.trim()}
                              >
                                Extract Requirements
                              </button>
                            </div>
                          )}

                          {/* Step 2: Show extracted requirements and ask for personal info (to be implemented) */}
                          {/* Step 2: Show extracted requirements and ask for personal info (to be implemented) */}
                          {useCase === 'create' && step === 2 && requirements && (
                            <div className="p-8 text-white text-center bg-slate-800/50 border border-slate-700 rounded-xl">
                              <h2 className="text-xl font-semibold mb-4">Requirements extracted!</h2>
                              <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed mb-4">{JSON.stringify(requirements, null, 2)}</pre>
                              <button className="bg-slate-600 text-white px-4 py-2 rounded-lg" onClick={() => setStep(1)}>Back</button>
                            </div>
                          )}
                      </main>
                    </>
                  );
}

export default Generator;
