import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 120_000,
});

// ---- TypeScript types -------------------------------------------------------

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

export interface GenerateResumeRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  summary?: string;
  experience?: ExperienceItem[];
  education?: EducationItem[];
  skills?: string[];
  languages?: LanguageItem[];
  job_description: string;
  parsed_resume_text?: string;
  output_language?: string;
  include_simple_version?: boolean;
  want_pdf?: boolean;
  parse_only?: boolean;
}

export interface GenerateResumeResponse {
  cv_text: string;
  cover_letter_text: string;
  unterlagen_info?: string;
  cv_simple?: string;
  cover_letter_simple?: string;
  pdf_base64?: string;
  docx_base64?: string;
  pdf_error?: string;
  generated_at: string;
}

// ---- API calls --------------------------------------------------------------

export async function generateResume(
  payload: GenerateResumeRequest,
): Promise<GenerateResumeResponse> {
  const { data } = await apiClient.post<GenerateResumeResponse>(
    '/generate-resume',
    payload,
  );
  return data;
}
