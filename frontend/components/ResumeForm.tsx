import { useRef, ChangeEvent } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResumeStore } from '@/store/resumeStore';
import { generateResume } from '@/services/api';
import type { LanguageItem } from '@/services/api';

interface Props {
  onSuccess: () => void;
}

export default function ResumeForm({ onSuccess }: Props) {
  const store = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---- Helpers ----------------------------------------------------------------

  const handleTextChange =
    (field: Parameters<typeof store.setField>[0]) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      store.setField(field, e.target.value);

  const parseLanguages = (raw: string): LanguageItem[] =>
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => ({ language: s, level: 'B2' }));

  const parseSkills = (raw: string): string[] =>
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

  // ---- Submit -----------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store.name || !store.email) {
      toast.error('Name and email are required.');
      return;
    }
    if (!store.jobDescription) {
      toast.error('Please paste a job description.');
      return;
    }

    store.setLoading(true);
    store.setOutput(null);

    try {
      const result = await generateResume({
        name: store.name,
        email: store.email,
        phone: store.phone,
        address: store.address,
        summary: store.summary,
        experience: store.experience,
        education: store.education,
        skills: parseSkills(store.skillsInput),
        languages: parseLanguages(store.languagesInput),
        job_description: store.jobDescription,
        parsed_resume_text: store.parsedResumeText,
        output_language: store.outputLanguage,
        include_simple_version: true,
        want_pdf: store.wantPdf,
      });
      store.setOutput(result);
      toast.success('Documents generated successfully!');
      onSuccess();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Generation failed. Check your backend.';
      toast.error(msg);
    } finally {
      store.setLoading(false);
    }
  };

  // ---- File upload ------------------------------------------------------------

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      store.setField('parsedResumeText', (ev.target?.result as string) ?? '');
      toast.success(`"${file.name}" loaded for context.`);
    };
    reader.readAsText(file);
  };

  // ---- Render -----------------------------------------------------------------

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* ── Personal Information ─────────────────────────────────────────── */}
      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="section-label">Full Name *</label>
            <input
              className="input-field"
              placeholder="Maria Müller"
              value={store.name}
              onChange={handleTextChange('name')}
              required
            />
          </div>
          <div>
            <label className="section-label">Email *</label>
            <input
              type="email"
              className="input-field"
              placeholder="maria@example.com"
              value={store.email}
              onChange={handleTextChange('email')}
              required
            />
          </div>
          <div>
            <label className="section-label">Phone</label>
            <input
              className="input-field"
              placeholder="+49 123 456 789"
              value={store.phone}
              onChange={handleTextChange('phone')}
            />
          </div>
          <div>
            <label className="section-label">Address</label>
            <input
              className="input-field"
              placeholder="Berlin, Germany"
              value={store.address}
              onChange={handleTextChange('address')}
            />
          </div>
        </div>

        <div>
          <label className="section-label">Professional Summary</label>
          <textarea
            className="input-field"
            rows={3}
            placeholder="Brief professional summary..."
            value={store.summary}
            onChange={handleTextChange('summary')}
          />
        </div>
      </section>

      {/* ── Work Experience ──────────────────────────────────────────────── */}
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">
            Work Experience
          </h2>
          <button
            type="button"
            onClick={store.addExperience}
            className="flex items-center gap-1 btn-secondary text-sm py-1.5 px-3"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        {store.experience.length === 0 && (
          <p className="text-slate-500 text-sm">
            No experience added yet. Click &ldquo;Add&rdquo; to begin.
          </p>
        )}

        {store.experience.map((exp, i) => (
          <div
            key={i}
            className="border border-slate-700 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">
                Experience #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => store.removeExperience(i)}
                className="text-red-400 hover:text-red-300 transition-colors"
                aria-label="Remove experience"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="section-label">Job Title</label>
                <input
                  className="input-field"
                  placeholder="Software Engineer"
                  value={exp.job_title}
                  onChange={(e) =>
                    store.updateExperience(i, { job_title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">Company</label>
                <input
                  className="input-field"
                  placeholder="Acme GmbH"
                  value={exp.company}
                  onChange={(e) =>
                    store.updateExperience(i, { company: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">Start Date</label>
                <input
                  className="input-field"
                  placeholder="01/2022"
                  value={exp.start_date ?? ''}
                  onChange={(e) =>
                    store.updateExperience(i, { start_date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">End Date</label>
                <input
                  className="input-field"
                  placeholder="Present"
                  value={exp.end_date ?? ''}
                  onChange={(e) =>
                    store.updateExperience(i, { end_date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">Location</label>
                <input
                  className="input-field"
                  placeholder="Berlin, DE"
                  value={exp.location ?? ''}
                  onChange={(e) =>
                    store.updateExperience(i, { location: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="section-label">
                Responsibilities (comma-separated)
              </label>
              <textarea
                className="input-field"
                rows={3}
                placeholder="Led development of..., Collaborated with..."
                value={(exp.responsibilities ?? []).join(', ')}
                onChange={(e) =>
                  store.updateExperience(i, {
                    responsibilities: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>
        ))}
      </section>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Education</h2>
          <button
            type="button"
            onClick={store.addEducation}
            className="flex items-center gap-1 btn-secondary text-sm py-1.5 px-3"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        {store.education.length === 0 && (
          <p className="text-slate-500 text-sm">
            No education added yet. Click &ldquo;Add&rdquo; to begin.
          </p>
        )}

        {store.education.map((edu, i) => (
          <div
            key={i}
            className="border border-slate-700 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium text-sm">
                Education #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => store.removeEducation(i)}
                className="text-red-400 hover:text-red-300 transition-colors"
                aria-label="Remove education"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="section-label">Institution</label>
                <input
                  className="input-field"
                  placeholder="TU Berlin"
                  value={edu.institution}
                  onChange={(e) =>
                    store.updateEducation(i, { institution: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">Degree</label>
                <input
                  className="input-field"
                  placeholder="M.Sc. Computer Science"
                  value={edu.degree ?? ''}
                  onChange={(e) =>
                    store.updateEducation(i, { degree: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">Start Date</label>
                <input
                  className="input-field"
                  placeholder="10/2018"
                  value={edu.start_date ?? ''}
                  onChange={(e) =>
                    store.updateEducation(i, { start_date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">End Date</label>
                <input
                  className="input-field"
                  placeholder="09/2020"
                  value={edu.end_date ?? ''}
                  onChange={(e) =>
                    store.updateEducation(i, { end_date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="section-label">Location</label>
                <input
                  className="input-field"
                  placeholder="Berlin, DE"
                  value={edu.location ?? ''}
                  onChange={(e) =>
                    store.updateEducation(i, { location: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="section-label">Note</label>
              <textarea
                className="input-field"
                rows={2}
                placeholder="Grade, honors, thesis topic..."
                value={edu.note ?? ''}
                onChange={(e) =>
                  store.updateEducation(i, { note: e.target.value })
                }
              />
            </div>
          </div>
        ))}
      </section>

      {/* ── Skills & Languages ───────────────────────────────────────────── */}
      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Skills &amp; Languages
        </h2>

        <div>
          <label className="section-label">
            Skills{' '}
            <span className="text-slate-500 font-normal">(comma-separated)</span>
          </label>
          <input
            className="input-field"
            placeholder="Python, TypeScript, Docker, Kubernetes"
            value={store.skillsInput}
            onChange={handleTextChange('skillsInput')}
          />
        </div>

        <div>
          <label className="section-label">
            Languages{' '}
            <span className="text-slate-500 font-normal">(comma-separated)</span>
          </label>
          <input
            className="input-field"
            placeholder="German, English, French"
            value={store.languagesInput}
            onChange={handleTextChange('languagesInput')}
          />
        </div>
      </section>

      {/* ── Job Description ──────────────────────────────────────────────── */}
      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Job Description *
        </h2>
        <textarea
          className="input-field"
          rows={8}
          placeholder="Paste the full job advertisement here..."
          value={store.jobDescription}
          onChange={handleTextChange('jobDescription')}
          required
        />
      </section>

      {/* ── Resume Upload ────────────────────────────────────────────────── */}
      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Upload Existing Resume{' '}
          <span className="text-slate-500 font-normal text-sm">(optional)</span>
        </h2>
        <p className="text-slate-400 text-sm">
          Upload a PDF, DOCX, or TXT file to provide additional context to the AI.
        </p>

        <div
          className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center
                     cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />
          <p className="text-slate-400 text-sm">
            {store.parsedResumeText
              ? '✓ File loaded — click to replace'
              : 'Click to upload PDF, DOCX, or TXT'}
          </p>
        </div>
      </section>

      {/* ── Options ──────────────────────────────────────────────────────── */}
      <section className="card space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">Options</h2>

        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label className="section-label">Output Language</label>
            <select
              className="input-field w-auto"
              value={store.outputLanguage}
              onChange={(e) =>
                store.setField(
                  'outputLanguage',
                  e.target.value as 'de' | 'en',
                )
              }
            >
              <option value="de">German (Deutsch)</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <input
              id="wantPdf"
              type="checkbox"
              className="w-4 h-4 rounded accent-blue-500"
              checked={store.wantPdf}
              onChange={(e) => store.setField('wantPdf', e.target.checked)}
            />
            <label
              htmlFor="wantPdf"
              className="text-slate-300 text-sm cursor-pointer"
            >
              Generate downloadable PDF &amp; DOCX
            </label>
          </div>
        </div>
      </section>

      {/* ── Submit ───────────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={store.isLoading}
          className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
        >
          {store.isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating…
            </>
          ) : (
            'Generate CV & Cover Letter'
          )}
        </button>

        <button
          type="button"
          onClick={store.reset}
          className="btn-secondary py-3 px-5"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
