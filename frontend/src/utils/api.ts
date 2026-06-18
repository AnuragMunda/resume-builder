import type {
  CritiqueResponse,
  EducationHistory,
  PersonalDetails,
  Skill,
  WorkExperience,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ResumeData {
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}

function serializeDate(date: Date | null): string | null {
  if (!date) return null;
  if (typeof date === "string") return date;
  try {
    return date.toISOString().split("T")[0];
  } catch {
    return String(date);
  }
}

function serializeResumeData(data: ResumeData) {
  return {
    personalDetails: data.personalDetails,
    summary: data.summary,
    workExperience: data.workExperience.map((exp) => ({
      ...exp,
      startDate: serializeDate(exp.startDate),
      endDate: serializeDate(exp.endDate),
    })),
    educationHistory: data.educationHistory.map((edu) => ({
      ...edu,
      startDate: serializeDate(edu.startDate),
      endDate: serializeDate(edu.endDate),
      isStudying: false,
    })),
    skills: data.skills,
  };
}

export async function fetchCritique(data: ResumeData): Promise<CritiqueResponse> {
  const body = serializeResumeData(data);

  const res = await fetch(`${API_BASE}/api/ai/critique/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = "Failed to get AI critique";
    try {
      const err = await res.json();
      message = err.error || err.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}
