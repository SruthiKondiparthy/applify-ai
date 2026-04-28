// Extract requirements from job description
export async function extractRequirements(jobDescription: string, language: string = 'en'): Promise<any> {
  const response = await axios.post(`${API_URL}/extract-requirements`, {
    job_description: jobDescription,
    language,
  });
  return response.data;
}
// Get match percentage between resume and job description
export async function matchPercentage(resumeText: string, jobText: string): Promise<{ match_percentage: number }> {
  const response = await axios.post(`${API_URL}/match-percentage`, {
    resume_text: resumeText,
    job_text: jobText,
  });
  return response.data;
}
// Upload resume file and get parsed text
export async function uploadResume(file: File): Promise<{ text: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/upload-resume`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}
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
  language?: string;
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

export default apiClient;
