import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ExperienceItem,
  EducationItem,
  LanguageItem,
  GenerateResumeResponse,
} from '@/services/api';

// ---- State shape ------------------------------------------------------------

interface ResumeState {
  // Personal info
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;

  // Dynamic lists
  experience: ExperienceItem[];
  education: EducationItem[];

  // Flat inputs (comma-separated → arrays on submit)
  skillsInput: string;
  languagesInput: string;

  // Job description
  jobDescription: string;

  // Resume text parsed from uploaded file
  parsedResumeText: string;

  // Output language
  outputLanguage: 'de' | 'en';

  // Options
  wantPdf: boolean;

  // Loading flag
  isLoading: boolean;

  // API output
  output: GenerateResumeResponse | null;
}

// ---- Actions ----------------------------------------------------------------

interface ResumeActions {
  setField: (field: keyof ResumeState, value: unknown) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (index: number, data: Partial<ExperienceItem>) => void;
  removeExperience: (index: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (index: number, data: Partial<EducationItem>) => void;
  removeEducation: (index: number) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (index: number, data: Partial<LanguageItem>) => void;
  removeLanguage: (index: number) => void;

  // Misc
  setOutput: (output: GenerateResumeResponse | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

// ---- Initial state ----------------------------------------------------------

const initialState: ResumeState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experience: [],
  education: [],
  skillsInput: '',
  languagesInput: '',
  jobDescription: '',
  parsedResumeText: '',
  outputLanguage: 'de',
  wantPdf: false,
  isLoading: false,
  output: null,
};

// ---- Store ------------------------------------------------------------------

export const useResumeStore = create<ResumeState & ResumeActions>()(
  persist(
    (set) => ({
      ...initialState,

      setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),

      // Experience
      addExperience: () =>
        set((state) => ({
          experience: [
            ...state.experience,
            {
              job_title: '',
              company: '',
              start_date: '',
              end_date: '',
              location: '',
              responsibilities: [],
            },
          ],
        })),
      updateExperience: (index, data) =>
        set((state) => {
          const updated = [...state.experience];
          updated[index] = { ...updated[index], ...data };
          return { experience: updated };
        }),
      removeExperience: (index) =>
        set((state) => ({
          experience: state.experience.filter((_, i) => i !== index),
        })),

      // Education
      addEducation: () =>
        set((state) => ({
          education: [
            ...state.education,
            {
              institution: '',
              degree: '',
              start_date: '',
              end_date: '',
              location: '',
              note: '',
            },
          ],
        })),
      updateEducation: (index, data) =>
        set((state) => {
          const updated = [...state.education];
          updated[index] = { ...updated[index], ...data };
          return { education: updated };
        }),
      removeEducation: (index) =>
        set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),

      // Languages (stored inline as LanguageItem[] in languagesInput placeholder;
      // for simplicity, languagesInput is a comma-separated string)
      addLanguage: () => {},
      updateLanguage: () => {},
      removeLanguage: () => {},

      // Output / loading
      setOutput: (output) => set({ output }),
      setLoading: (isLoading) => set({ isLoading }),

      // Reset
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'applify-resume-store',
      // Only persist form data, not loading state or output
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        phone: state.phone,
        address: state.address,
        summary: state.summary,
        experience: state.experience,
        education: state.education,
        skillsInput: state.skillsInput,
        languagesInput: state.languagesInput,
        jobDescription: state.jobDescription,
        outputLanguage: state.outputLanguage,
        wantPdf: state.wantPdf,
      }),
    },
  ),
);
