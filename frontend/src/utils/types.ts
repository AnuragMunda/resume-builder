export type LevelType = "info" | "summary" | "work" | "education" | "skills";

export interface LevelStore {
  currentLevel: LevelType;
  setCurrentLevel: (level: LevelType) => void;
}

export interface ResumeStore {
  currentResumeId: string | null;
  templateId: string | null;
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  skills: Skill[];
  educationHistory: EducationHistory[];
  openSheet: boolean;
  selectedExp: WorkExperience | null;
  selectedEdu: EducationHistory | null;
  createNewResume: (templateId: string) => string;
  loadResume: (resumeId: string) => void;
  deleteResume: (resumeId: string) => void;
  setTemplate: (templateId: string) => void;
  setPersonalDetails: (details: PersonalDetails) => void;
  setSummary: (summary: string) => void;
  setWorkExperience: (exp: WorkExperience[]) => void;
  setSkills: (skills: Skill[]) => void;
  setEducationHistory: (edu: EducationHistory[]) => void;
  setOpenSheet: (isOpen: boolean) => void;
  setSelectedExp: (exp: WorkExperience | null) => void;
  setSelectedEdu: (exp: EducationHistory | null) => void;
}

export interface PersonalDetails {
  jobTarget: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  employer: string;
  startDate: Date | null;
  endDate: Date | null;
  isWorking: boolean;
  location?: string;
  description?: string;
}

export interface EducationHistory {
  id: string;
  school: string;
  degree: string;
  startDate: Date | null;
  endDate: Date | null;
  location: string;
  description: string;
}

export interface WorkCardProp {
  work: WorkExperience;
  openSheet: boolean;
  setOpenSheet: (isOpen: boolean) => void;
}

export interface EducationCardProp {
  edu: EducationHistory;
  openSheet: boolean;
  setOpenSheet: (isOpen: boolean) => void;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SectionCritique {
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface OverallCritique {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface ResumeCritique {
  overall: OverallCritique;
  sections: {
    personalDetails: SectionCritique;
    summary: SectionCritique;
    workExperience: SectionCritique;
    educationHistory: SectionCritique;
    skills: SectionCritique;
  };
}

export interface CritiqueResponse {
  critique: ResumeCritique;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  styles: {
    primaryColor: string;
    accentColor: string;
    headingFont: string;
    bodyFont: string;
    layout: "single-column" | "sidebar" | "banner";
    gradient?: string;
  };
}
