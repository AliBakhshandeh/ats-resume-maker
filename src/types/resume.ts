export type ResumeLanguage = "en" | "fa";

export interface ResumeLink {
  label: string;
  href: string;
  displayValue?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ResumeHighlight {
  text: string;
  enabled?: boolean;
}

export interface Experience {
  company: string;
  companyUrl?: string;
  location?: string;
  employmentType?: string;
  title: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  technologies?: string[];
  compact?: boolean;
  shortDescription?: string;
  highlights: ResumeHighlight[];
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
  highlights?: ResumeHighlight[];
  enabled?: boolean;
}

export interface Education {
  institution: string;
  degree?: string;
  field?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    headline: string;
    location?: string;
    email: string;
    phone?: string;
    links: ResumeLink[];
  };
  summary: string;
  skills: SkillGroup[];
  experience: Experience[];
  projects?: Project[];
  education?: Education[];
  languages?: Language[];
}

export interface ResumeSettings {
  showSummary: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showEducation: boolean;
  showLanguages: boolean;
  compactOlderExperience: boolean;
}

export interface PrintSettings {
  pageSize: "A4";
  bodyFontSize: number;
  contentPaddingMm: number;
}
