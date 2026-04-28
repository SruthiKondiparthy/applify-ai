import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CandidateInput, ExperienceItem, EducationItem, LanguageItem } from '../services/api';

interface ResumeState {
  formData: CandidateInput;
  result: {
    cv_text: string;
    cover_letter_text: string;
    unterlagen_info: string;
    cv_simple?: string;
    cover_letter_simple?: string;
  } | null;
  isLoading: boolean;
  error: string | null;

  setFormData: (data: Partial<CandidateInput>) => void;
  addExperience: (item: ExperienceItem) => void;
  removeExperience: (index: number) => void;
  updateExperience: (index: number, item: ExperienceItem) => void;
  addEducation: (item: EducationItem) => void;
  removeEducation: (index: number) => void;
  updateEducation: (index: number, item: EducationItem) => void;
  addLanguage: (item: LanguageItem) => void;
  removeLanguage: (index: number) => void;
  updateLanguage: (index: number, item: LanguageItem) => void;
  setResult: (result: ResumeState['result']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultFormData: CandidateInput = {
  name: '',
  email: '',
  phone: '',
  address: '',
  birth_date: '',
  birth_place: '',
  summary: '',
  skills: [],
  interests: [],
  experience: [],
  education: [],
  languages: [],
  language: '',
  additional_info: '',
  job_description: '',
  include_simple_version: false,
  want_pdf: false,
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      formData: defaultFormData,
      result: null,
      isLoading: false,
      error: null,

      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      addExperience: (item) =>
        set((state) => ({
          formData: {
            ...state.formData,
            experience: [...(state.formData.experience || []), item],
          },
        })),

      removeExperience: (index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            experience: state.formData.experience?.filter((_, i) => i !== index),
          },
        })),

      updateExperience: (index, item) =>
        set((state) => ({
          formData: {
            ...state.formData,
            experience: state.formData.experience?.map((e, i) => (i === index ? item : e)),
          },
        })),

      addEducation: (item) =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: [...(state.formData.education || []), item],
          },
        })),

      removeEducation: (index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: state.formData.education?.filter((_, i) => i !== index),
          },
        })),

      updateEducation: (index, item) =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: state.formData.education?.map((e, i) => (i === index ? item : e)),
          },
        })),

      addLanguage: (item) =>
        set((state) => ({
          formData: {
            ...state.formData,
            languages: [...(state.formData.languages || []), item],
          },
        })),

      removeLanguage: (index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            languages: state.formData.languages?.filter((_, i) => i !== index),
          },
        })),

      updateLanguage: (index, item) =>
        set((state) => ({
          formData: {
            ...state.formData,
            languages: state.formData.languages?.map((l, i) => (i === index ? item : l)),
          },
        })),

      setResult: (result) => set({ result }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({ formData: defaultFormData, result: null, error: null }),
    }),
    {
      name: 'applify-resume-store',
    }
  )
);
