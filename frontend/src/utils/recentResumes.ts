"use client";

import { RESUME_TEMPLATES } from "./templates";
import {
  EducationHistory,
  PersonalDetails,
  Skill,
  WorkExperience,
} from "./types";

const isServer = typeof window === "undefined" || !window.localStorage;

const getLocalstorage = <T = unknown>(key: string): T | null => {
  if (isServer) return null;

  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
};

const hydrateDates = <T extends { startDate?: unknown; endDate?: unknown }>(
  items: T[],
): T[] =>
  items.map((item) => ({
    ...item,
    startDate: item.startDate ? new Date(item.startDate as string) : null,
    endDate: item.endDate ? new Date(item.endDate as string) : null,
  }));

export interface RecentResume {
  resumeId: string;
  templateId: string;
  templateName: string;
  displayName: string;
  updatedAt: number;
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}

export function getRecentResumes(): RecentResume[] {
  if (isServer) return [];

  const keys = Object.keys(localStorage);
  const resumeIds = new Set<string>();

  for (const key of keys) {
    if (key.endsWith("-template")) {
      resumeIds.add(key.replace("-template", ""));
    }
  }

  const resumes: RecentResume[] = [];

  for (const resumeId of resumeIds) {
    const templateId = getLocalstorage<string>(`${resumeId}-template`);
    if (!templateId) continue;

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

    const hasData =
      personalDetails?.firstName?.trim() ||
      personalDetails?.lastName?.trim() ||
      personalDetails?.jobTarget?.trim() ||
      summary?.trim() ||
      (workExperience && workExperience.length > 0) ||
      (skills && skills.length > 0) ||
      (educationHistory && educationHistory.length > 0);

    if (!hasData) continue;

    const template = RESUME_TEMPLATES.find((t) => t.id === templateId);
    const displayName = [personalDetails?.firstName, personalDetails?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    resumes.push({
      resumeId,
      templateId,
      templateName: template?.name ?? templateId,
      displayName: displayName || "Untitled Resume",
      updatedAt: Date.now(),
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
      workExperience: workExperience ? hydrateDates(workExperience) : [],
      skills: skills ?? [],
      educationHistory: educationHistory ? hydrateDates(educationHistory) : [],
    });
  }

  return resumes;
}
