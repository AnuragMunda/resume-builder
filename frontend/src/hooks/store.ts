import {
  EducationHistory,
  PersonalDetails,
  ResumeStore,
  Skill,
  WorkExperience,
} from "./../utils/types";
import { LevelType, LevelStore } from "@/utils/types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

//////////////////// HELPER ////////////////////

const isServer = typeof window === "undefined" || !window.localStorage;

const getLocalstorage = <T = any>(key: string): T | null => {
  if (isServer) return null;

  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error(`Failed to parse localStorage key "${key}":`, error);
    return null;
  }
};

const setLocalStorage = (key: string, value: any): void => {
  if (isServer) return;
  localStorage.setItem(key, JSON.stringify(value));
};

//////////////////// STORES ////////////////////

export const useLevelStore = create<LevelStore>((set) => ({
  currentLevel: "info",
  setCurrentLevel: (level: LevelType) => set({ currentLevel: level }),
}));

export const useResumeStore = create<ResumeStore>((set, get) => ({
  currentResumeId: null,
  templateId: null,
  personalDetails: {
    jobTarget: "",
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    city: "",
    state: "",
    country: "",
  },
  summary: "",
  workExperience: [],
  skills: [],
  educationHistory: [],
  openSheet: false,
  selectedExp: null,
  selectedEdu: null,

  createNewResume: (templateId: string): string => {
    const resumeId = uuidv4();
    setLocalStorage(`${resumeId}-template`, templateId);
    set({
      currentResumeId: resumeId,
      templateId,
      personalDetails: {
        jobTarget: "",
        firstName: "",
        lastName: "",
        email: "",
        linkedin: "",
        city: "",
        state: "",
        country: "",
      },
      summary: "",
      workExperience: [],
      skills: [],
      educationHistory: [],
    });
    return resumeId;
  },

  loadResume: (resumeId: string): void => {
    const personalDetails = getLocalstorage<PersonalDetails>(
      `${resumeId}-info`,
    );
    const summary = getLocalstorage<string>(`${resumeId}-summary`);
    const workExperience = getLocalstorage<WorkExperience[]>(
      `${resumeId}-work`,
    );
    const skills = getLocalstorage<Skill[]>(`${resumeId}-skills`);
    const educationHistory = getLocalstorage<EducationHistory[]>(
      `${resumeId}-education`,
    );
    const templateId = getLocalstorage<string>(`${resumeId}-template`);

    set({
      currentResumeId: resumeId,
      templateId: templateId ?? null,
      personalDetails: personalDetails ?? {
        jobTarget: "",
        firstName: "",
        lastName: "",
        email: "",
        linkedin: "",
        city: "",
        state: "",
        country: "",
      },
      summary: summary ?? "",
      workExperience: workExperience ?? [],
      skills: skills ?? [],
      educationHistory: educationHistory ?? [],
    });
  },

  setPersonalDetails: (details: PersonalDetails) => {
    const { currentResumeId } = get();
    if (!currentResumeId) return;

    set({
      personalDetails: {
        jobTarget: details.jobTarget,
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        linkedin: details.linkedin,
        city: details.city,
        state: details.state,
        country: details.country,
      },
    });

    setLocalStorage(`${currentResumeId}-info`, details);
  },

  setSummary: (summary: string) => {
    const { currentResumeId } = get();
    if (!currentResumeId) return;

    set({ summary });
    setLocalStorage(`${currentResumeId}-summary`, summary);
  },

  setWorkExperience: (exp: WorkExperience[]) => {
    const { currentResumeId } = get();
    if (!currentResumeId) return;

    set({ workExperience: exp });
    setLocalStorage(`${currentResumeId}-work`, exp);
  },

  setSkills: (skills: Skill[]) => {
    const { currentResumeId } = get();
    if (!currentResumeId) return;

    set({ skills });
    setLocalStorage(`${currentResumeId}-skills`, skills);
  },

  setEducationHistory: (ed: EducationHistory[]) => {
    const { currentResumeId } = get();
    if (!currentResumeId) return;

    set({ educationHistory: ed });
    setLocalStorage(`${currentResumeId}-education`, ed);
  },

  setOpenSheet: (isOpen: boolean) => set({ openSheet: isOpen }),
  setSelectedExp: (exp: WorkExperience | null) => set({ selectedExp: exp }),
  setSelectedEdu: (ed: EducationHistory | null) => set({ selectedEdu: ed }),
}));
