import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ExperienceItem {
  job_title: string;
  company: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  responsibilities?: string[];
}

export interface EducationItem {
  institution: string;
  degree?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  note?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface CandidateInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  birth_place?: string;
  summary?: string;
  skills?: string[];
  interests?: string[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
  languages?: LanguageItem[];
  additional_info?: string;
  job_description: string;
  include_simple_version?: boolean;
  want_pdf?: boolean;
}

export interface GenerateResumeResponse {
  cv_text: string;
  cover_letter_text: string;
  unterlagen_info: string;
  cv_simple?: string;
  cover_letter_simple?: string;
  pdf_base64?: string;
  docx_base64?: string;
  generated_at: string;
}

export interface CompatibilityResponse {
  match_score: number;
  requirements: string[];
  strengths: string[];
  gaps: string[];
  recommended_documents: string[];
  generated_at: string;
}

export interface JDRequirementsResponse {
  job_title: string;
  key_requirements: string[];
  must_have_skills: string[];
  optional_skills: string[];
  keywords: string[];
  suggested_resume_sections: string[];
  generated_at: string;
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function generateResume(data: CandidateInput): Promise<GenerateResumeResponse> {
  const response = await apiClient.post<GenerateResumeResponse>('/generate-resume', data);
  return response.data;
}

export async function analyzeCompatibility(payload: {
  resume_text: string;
  job_description: string;
}): Promise<CompatibilityResponse> {
  const response = await apiClient.post<CompatibilityResponse>('/analyze-compatibility', payload);
  return response.data;
}

export async function extractJDRequirements(payload: {
  job_description: string;
}): Promise<JDRequirementsResponse> {
  const response = await apiClient.post<JDRequirementsResponse>('/extract-jd-requirements', payload);
  return response.data;
}

export default apiClient;
