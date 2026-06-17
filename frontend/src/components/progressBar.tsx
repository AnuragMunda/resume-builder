"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { useResumeStore } from "@/hooks/store";

const ProgressBar = () => {
  const personalDetails = useResumeStore((s) => s.personalDetails);
  const summary = useResumeStore((s) => s.summary);
  const workExperience = useResumeStore((s) => s.workExperience);
  const skills = useResumeStore((s) => s.skills);
  const educationHistory = useResumeStore((s) => s.educationHistory);

  let completed = 0;

  if (personalDetails.firstName || personalDetails.lastName || personalDetails.email) completed++;
  if (summary.trim()) completed++;
  if (workExperience.length > 0) completed++;
  if (skills.some((s) => s.name.trim())) completed++;
  if (educationHistory.length > 0) completed++;

  const percent = Math.round((completed / 5) * 100);

  return (
    <Field className="w-full mb-2">
      <FieldLabel htmlFor="progress-upload">
        <span className="ml-auto">{percent}%</span>
      </FieldLabel>
      <Progress value={percent} id="progress-upload" />
    </Field>
  );
};

export default ProgressBar;
