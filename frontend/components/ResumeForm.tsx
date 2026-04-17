import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResumeStore } from '../store/resumeStore';
import { generateResume } from '../services/api';
import type { ExperienceItem, EducationItem, LanguageItem } from '../services/api';

const inputClass =
  'w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm';
const labelClass = 'block text-sm font-medium text-slate-300 mb-1';
const sectionClass = 'bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6';

function SectionHeader({
  title,
  expanded,
  onToggle,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left mb-4"
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {expanded ? (
        <ChevronUp className="w-5 h-5 text-slate-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-slate-400" />
      )}
    </button>
  );
}

export default function ResumeForm() {
  const { formData, setFormData, addExperience, removeExperience, updateExperience,
    addEducation, removeEducation, updateEducation, addLanguage, removeLanguage, updateLanguage,
    setResult, setLoading, setError, isLoading } = useResumeStore();

  const [sections, setSections] = useState({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    job: true,
  });

  const toggleSection = (section: keyof typeof sections) => {
    setSections((s) => ({ ...s, [section]: !s[section] }));
  };

  const [skillsInput, setSkillsInput] = useState(formData.skills?.join(', ') || '');
  const [interestsInput, setInterestsInput] = useState(formData.interests?.join(', ') || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.job_description) {
      toast.error('Please fill in Name, Email, and Job Description.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await generateResume(formData);
      setResult({
        cv_text: response.cv_text,
        cover_letter_text: response.cover_letter_text,
        unterlagen_info: response.unterlagen_info,
        cv_simple: response.cv_simple,
        cover_letter_simple: response.cover_letter_simple,
      });
      toast.success('Documents generated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate documents.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const emptyExperience: ExperienceItem = {
    job_title: '', company: '', start_date: '', end_date: '', location: '', responsibilities: [],
  };
  const emptyEducation: EducationItem = {
    institution: '', degree: '', start_date: '', end_date: '', location: '', note: '',
  };
  const emptyLanguage: LanguageItem = { language: '', level: '' };

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Personal Information */}
      <div className={sectionClass}>
        <SectionHeader
          title="Personal Information"
          expanded={sections.personal}
          onToggle={() => toggleSection('personal')}
        />
        {sections.personal && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input
                type="email"
                className={inputClass}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                className={inputClass}
                placeholder="+49 123 456789"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ phone: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Berlin, Germany"
                value={formData.address || ''}
                onChange={(e) => setFormData({ address: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="text"
                className={inputClass}
                placeholder="01.01.1990"
                value={formData.birth_date || ''}
                onChange={(e) => setFormData({ birth_date: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Place of Birth</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Berlin"
                value={formData.birth_place || ''}
                onChange={(e) => setFormData({ birth_place: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Professional Summary</label>
              <textarea
                className={inputClass}
                rows={3}
                placeholder="Brief professional summary..."
                value={formData.summary || ''}
                onChange={(e) => setFormData({ summary: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className={sectionClass}>
        <SectionHeader
          title="Work Experience"
          expanded={sections.experience}
          onToggle={() => toggleSection('experience')}
        />
        {sections.experience && (
          <div className="space-y-4">
            {(formData.experience || []).map((exp, index) => (
              <div key={index} className="border border-slate-600 rounded-lg p-4 relative">
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Job Title</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Software Engineer"
                      value={exp.job_title}
                      onChange={(e) => updateExperience(index, { ...exp, job_title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Acme Corp"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, { ...exp, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="01/2020"
                      value={exp.start_date || ''}
                      onChange={(e) => updateExperience(index, { ...exp, start_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="12/2022 or Present"
                      value={exp.end_date || ''}
                      onChange={(e) => updateExperience(index, { ...exp, end_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Berlin, Germany"
                      value={exp.location || ''}
                      onChange={(e) => updateExperience(index, { ...exp, location: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Responsibilities (one per line)</label>
                    <textarea
                      className={inputClass}
                      rows={3}
                      placeholder="- Developed features&#10;- Led code reviews"
                      value={(exp.responsibilities || []).join('\n')}
                      onChange={(e) =>
                        updateExperience(index, {
                          ...exp,
                          responsibilities: e.target.value.split('\n').filter(Boolean),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addExperience(emptyExperience)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className={sectionClass}>
        <SectionHeader
          title="Education"
          expanded={sections.education}
          onToggle={() => toggleSection('education')}
        />
        {sections.education && (
          <div className="space-y-4">
            {(formData.education || []).map((edu, index) => (
              <div key={index} className="border border-slate-600 rounded-lg p-4 relative">
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Institution</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="TU Berlin"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, { ...edu, institution: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Degree</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Bachelor of Science"
                      value={edu.degree || ''}
                      onChange={(e) => updateEducation(index, { ...edu, degree: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="09/2016"
                      value={edu.start_date || ''}
                      onChange={(e) => updateEducation(index, { ...edu, start_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="06/2020"
                      value={edu.end_date || ''}
                      onChange={(e) => updateEducation(index, { ...edu, end_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Berlin, Germany"
                      value={edu.location || ''}
                      onChange={(e) => updateEducation(index, { ...edu, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Note</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="GPA: 1.8, Focus: ML"
                      value={edu.note || ''}
                      onChange={(e) => updateEducation(index, { ...edu, note: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addEducation(emptyEducation)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills & Interests */}
      <div className={sectionClass}>
        <SectionHeader
          title="Skills & Interests"
          expanded={sections.skills}
          onToggle={() => toggleSection('skills')}
        />
        {sections.skills && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Skills (comma-separated)</label>
              <textarea
                className={inputClass}
                rows={3}
                placeholder="Python, React, Docker, SQL"
                value={skillsInput}
                onChange={(e) => {
                  setSkillsInput(e.target.value);
                  setFormData({ skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) });
                }}
              />
            </div>
            <div>
              <label className={labelClass}>Interests (comma-separated)</label>
              <textarea
                className={inputClass}
                rows={3}
                placeholder="Open source, Hiking, Music"
                value={interestsInput}
                onChange={(e) => {
                  setInterestsInput(e.target.value);
                  setFormData({ interests: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) });
                }}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Additional Information</label>
              <textarea
                className={inputClass}
                rows={2}
                placeholder="Driving license, publications, references..."
                value={formData.additional_info || ''}
                onChange={(e) => setFormData({ additional_info: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Languages */}
      <div className={sectionClass}>
        <SectionHeader
          title="Languages"
          expanded={sections.languages}
          onToggle={() => toggleSection('languages')}
        />
        {sections.languages && (
          <div className="space-y-3">
            {(formData.languages || []).map((lang, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="German"
                  value={lang.language}
                  onChange={(e) => updateLanguage(index, { ...lang, language: e.target.value })}
                />
                <input
                  type="text"
                  className={inputClass}
                  placeholder="C1"
                  value={lang.level}
                  onChange={(e) => updateLanguage(index, { ...lang, level: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addLanguage(emptyLanguage)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Language
            </button>
          </div>
        )}
      </div>

      {/* Job Description */}
      <div className={sectionClass}>
        <SectionHeader
          title="Job Description"
          expanded={sections.job}
          onToggle={() => toggleSection('job')}
        />
        {sections.job && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Job Description / Job Ad *</label>
              <textarea
                className={inputClass}
                rows={8}
                placeholder="Paste the full job description here..."
                value={formData.job_description}
                onChange={(e) => setFormData({ job_description: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-600 bg-slate-800 text-blue-500"
                  checked={formData.include_simple_version || false}
                  onChange={(e) => setFormData({ include_simple_version: e.target.checked })}
                />
                <span className="text-sm text-slate-300">Include simple version</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-600 bg-slate-800 text-blue-500"
                  checked={formData.want_pdf || false}
                  onChange={(e) => setFormData({ want_pdf: e.target.checked })}
                />
                <span className="text-sm text-slate-300">Generate PDF</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Generating...
          </>
        ) : (
          'Generate Documents'
        )}
      </button>
    </form>
  );
}
