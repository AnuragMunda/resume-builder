import {
  EducationHistory,
  PersonalDetails,
  ResumeStore,
  Skill,
  WorkExperience,
} from "./../utils/types";
import { LevelType, LevelStore } from "@/utils/types";
import { create } from "zustand";

//////////////////// HELPER ////////////////////

const getLocalstorage = <T = any>(level: LevelType): T | null => {
  if (typeof window === "undefined" || !window.localStorage) return null;

  try {
    const localData = localStorage.getItem(level);
    return localData ? (JSON.parse(localData) as T) : null;
  } catch (error) {
    console.error("Failed to parse personal details", error);
    return null;
  }
};

//////////////////// STORES ////////////////////

export const useLevelStore = create<LevelStore>((set) => ({
  currentLevel: "info",
  setCurrentLevel: (level: LevelType) => set({ currentLevel: level }),
}));

export const useResumeStore = create<ResumeStore>((set) => {
  const localInfo = getLocalstorage<PersonalDetails>("info");
  const localSummary = getLocalstorage<string>("summary");
  const localWork = getLocalstorage<WorkExperience[]>("work");
  const localSkills = getLocalstorage<Skill[]>("skills");
  const localEducation = getLocalstorage<EducationHistory[]>("education");

  return {
    personalDetails: {
      jobTarget: localInfo?.jobTarget ?? "",
      firstName: localInfo?.firstName ?? "",
      lastName: localInfo?.lastName ?? "",
      email: localInfo?.email ?? "",
      linkedin: localInfo?.linkedin,
      city: localInfo?.city,
      state: localInfo?.state,
      country: localInfo?.country,
    },
    summary: localSummary ?? "",
    workExperience: localWork ?? [],
    skills: localSkills ?? [],
    educationHistory: localEducation ?? [],
    openSheet: false,
    selectedExp: null,
    selectedEdu: null,
    setPersonalDetails: (details: PersonalDetails) => {
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

      localStorage.setItem("info", JSON.stringify(details));
    },
    setSummary: (summary: string) => {
      set({ summary });
      localStorage.setItem("summary", JSON.stringify(summary));
    },
    setWorkExperience: (exp: WorkExperience[]) => {
      set({ workExperience: exp });
      localStorage.setItem("work", JSON.stringify(exp));
    },
    setSkills: (skills: Skill[]) => {
      set({ skills });
      localStorage.setItem("skills", JSON.stringify(skills));
    },
    setEducationHistory: (ed: EducationHistory[]) => {
      set({ educationHistory: ed });
      localStorage.setItem("education", JSON.stringify(ed));
    },
    setOpenSheet: (isOpen: boolean) => set({ openSheet: isOpen }),
    setSelectedExp: (exp: WorkExperience | null) => set({ selectedExp: exp }),
    setSelectedEdu: (ed: EducationHistory | null) => set({ selectedEdu: ed }),
  };
});
