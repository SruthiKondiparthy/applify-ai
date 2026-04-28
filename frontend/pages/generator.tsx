import Head from 'next/head';
import { useState } from 'react';
import { Check, Copy, FileText, Info, Mail, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import ResumeForm from '../components/ResumeForm';
import { analyzeCompatibility, extractJDRequirements } from '../services/api';
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
    <button onClick={handleCopy} className="text-slate-300 hover:text-white transition-colors p-1 rounded" title="Copy to clipboard">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function ResultSection({ title, icon, content }: { title: string; icon: React.ReactNode; content: string }) {
  if (!content) return null;
  return (
    <div className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          {icon} {title}
        </h3>
        <CopyButton text={content} />
      </div>
      <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed">{content}</pre>
    </div>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-5 mb-4">
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <ul className="list-disc pl-5 text-slate-200 text-sm space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Generator() {
  const { result, setFormData } = useResumeStore();
  const [mode, setMode] = useState<'has_resume' | 'no_resume'>('has_resume');
  const [resumeSource, setResumeSource] = useState<'upload' | 'manual'>('manual');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [compatibility, setCompatibility] = useState<any>(null);
  const [jdRequirements, setJdRequirements] = useState<any>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const loadResumeFile = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    setResumeText(text);
    toast.success('Resume text loaded from file.');
  };

  const handleCompatibilityCheck = async () => {
    if (!resumeText || !jobDescription) {
      toast.error('Add both resume text and job description first.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const data = await analyzeCompatibility({ resume_text: resumeText, job_description: jobDescription });
      setCompatibility(data);
      setFormData({ job_description: jobDescription });
      toast.success('Compatibility analysis ready.');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to analyze compatibility.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRequirementExtraction = async () => {
    if (!jobDescription) {
      toast.error('Add the job description first.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const data = await extractJDRequirements({ job_description: jobDescription });
      setJdRequirements(data);
      setFormData({ job_description: jobDescription });
      toast.success('JD requirements extracted.');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to extract requirements.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Generator - Genr8CV</title>
        <meta name="description" content="Analyze JD compatibility and generate resume + cover letter" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Genr8CV Workflow</h1>
          <p className="text-slate-200">Choose your scenario, review insights, then decide if you want full application documents.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            className={`p-4 rounded-xl border text-left ${mode === 'has_resume' ? 'border-pink-300 bg-pink-500/20' : 'border-slate-600 bg-slate-900/50'}`}
            onClick={() => setMode('has_resume')}
          >
            <h2 className="font-semibold text-white">I already have a resume</h2>
            <p className="text-sm text-slate-200 mt-1">Upload or paste resume, compare with JD, view strengths and gaps.</p>
          </button>
          <button
            className={`p-4 rounded-xl border text-left ${mode === 'no_resume' ? 'border-indigo-300 bg-indigo-500/20' : 'border-slate-600 bg-slate-900/50'}`}
            onClick={() => setMode('no_resume')}
          >
            <h2 className="font-semibold text-white">I do not have a resume</h2>
            <p className="text-sm text-slate-200 mt-1">Extract requirements from JD first, then create resume from scratch.</p>
          </button>
        </div>

        <div className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-5 mb-6">
          <label className="text-sm text-slate-200 font-medium">Job Description *</label>
          <textarea
            className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white"
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste complete JD here"
          />
        </div>

        {mode === 'has_resume' && (
          <div className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-5 mb-6">
            <div className="flex gap-4 mb-4">
              <button onClick={() => setResumeSource('manual')} className={`px-3 py-2 rounded-lg text-sm ${resumeSource === 'manual' ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-100'}`}>
                Enter Manually
              </button>
              <button onClick={() => setResumeSource('upload')} className={`px-3 py-2 rounded-lg text-sm ${resumeSource === 'upload' ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-100'}`}>
                Upload Resume
              </button>
            </div>
            {resumeSource === 'upload' ? (
              <div>
                <label className="text-sm text-slate-200 font-medium flex items-center gap-2"><Upload className="w-4 h-4" /> Upload .txt resume</label>
                <input type="file" accept=".txt" className="block mt-2 text-sm text-slate-200" onChange={(e) => loadResumeFile(e.target.files?.[0])} />
              </div>
            ) : (
              <div>
                <label className="text-sm text-slate-200 font-medium">Resume Text *</label>
                <textarea
                  className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  rows={8}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your existing resume text"
                />
              </div>
            )}
            <button
              onClick={handleCompatibilityCheck}
              disabled={isAnalyzing}
              className="mt-4 bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 px-5 py-2 rounded-lg font-semibold"
            >
              {isAnalyzing ? 'Analyzing...' : 'Check Compatibility'}
            </button>
          </div>
        )}

        {mode === 'no_resume' && (
          <div className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-5 mb-6">
            <button
              onClick={handleRequirementExtraction}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 px-5 py-2 rounded-lg font-semibold"
            >
              {isAnalyzing ? 'Extracting...' : 'Extract JD Requirements'}
            </button>
          </div>
        )}

        {compatibility && (
          <div className="mb-8">
            <div className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-5 mb-4">
              <h3 className="text-white font-semibold">Match Score: {compatibility.match_score}%</h3>
              <p className="text-slate-300 text-sm mt-1">Review the gaps, then decide whether to generate new documents.</p>
            </div>
            <ListSection title="Key Requirements" items={compatibility.requirements || []} />
            <ListSection title="Strengths" items={compatibility.strengths || []} />
            <ListSection title="Gaps" items={compatibility.gaps || []} />
            <ListSection title="Suggested Next Documents" items={compatibility.recommended_documents || []} />
            <button className="bg-indigo-500 px-4 py-2 rounded-lg" onClick={() => setShowBuilder(true)}>
              Continue to Build Application Documents
            </button>
          </div>
        )}

        {jdRequirements && (
          <div className="mb-8">
            <div className="bg-slate-900/60 border border-fuchsia-400/30 rounded-xl p-5 mb-4">
              <h3 className="text-white font-semibold">Target Role: {jdRequirements.job_title || 'Not specified'}</h3>
              <p className="text-slate-300 text-sm mt-1">These requirements are extracted from the JD. Continue when ready.</p>
            </div>
            <ListSection title="Key Requirements" items={jdRequirements.key_requirements || []} />
            <ListSection title="Must-Have Skills" items={jdRequirements.must_have_skills || []} />
            <ListSection title="Optional Skills" items={jdRequirements.optional_skills || []} />
            <ListSection title="Keywords" items={jdRequirements.keywords || []} />
            <ListSection title="Suggested Resume Sections" items={jdRequirements.suggested_resume_sections || []} />
            <button className="bg-indigo-500 px-4 py-2 rounded-lg" onClick={() => setShowBuilder(true)}>
              Yes, Continue to Create Resume
            </button>
          </div>
        )}

        {showBuilder && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 xl:w-2/5">
              <ResumeForm />
            </div>
            <div className="lg:w-1/2 xl:w-3/5">
              {result ? (
                <div className="animate-fadeIn">
                  <h2 className="text-xl font-semibold text-white mb-4">Generated Documents</h2>
                  <ResultSection title="Resume" icon={<FileText className="w-4 h-4 text-orange-300" />} content={result.cv_text} />
                  <ResultSection title="Cover Letter" icon={<Mail className="w-4 h-4 text-pink-300" />} content={result.cover_letter_text} />
                  <ResultSection title="Application Guidance" icon={<Info className="w-4 h-4 text-indigo-300" />} content={result.unterlagen_info} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-fuchsia-400/30 rounded-xl text-center p-8">
                  <FileText className="w-12 h-12 text-slate-500 mb-4" />
                  <h3 className="text-lg font-medium text-slate-300 mb-2">No documents yet</h3>
                  <p className="text-slate-400 text-sm max-w-sm">Complete personal details and generate your tailored resume and cover letter.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
