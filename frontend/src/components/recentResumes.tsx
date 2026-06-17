"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useResumeStore } from "@/hooks/store";
import {
  getRecentResumes,
  RecentResume,
} from "@/utils/recentResumes";
import { RESUME_TEMPLATES } from "@/utils/templates";
import {
  EducationHistory,
  PersonalDetails,
  ResumeTemplate,
  Skill,
  WorkExperience,
} from "@/utils/types";
import { Pencil, Trash2 } from "lucide-react";

// ─── Mini Preview Components ─────────────────────────────────────────────────

const MiniSingleColumnPreview = ({
  styles,
  personalDetails,
  workExperience,
  educationHistory,
  skills,
}: {
  styles: ResumeTemplate["styles"];
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}) => {
  const hasName =
    personalDetails.firstName || personalDetails.lastName || personalDetails.jobTarget;

  return (
    <div
      className="mx-auto h-60 w-40 overflow-hidden rounded-md border bg-white p-3 shadow-sm"
      style={{ fontFamily: styles.bodyFont }}
    >
      {hasName && (
        <div className="mb-2">
          <div
            className="text-[7px] font-bold uppercase tracking-wide"
            style={{
              color: styles.primaryColor,
              fontFamily: styles.headingFont,
            }}
          >
            {personalDetails.firstName} {personalDetails.lastName}
          </div>
          <div className="mt-0.5 text-[4.5px] text-gray-500">
            {personalDetails.email}
            {personalDetails.city && ` | ${personalDetails.city}`}
          </div>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-2">
          <div
            className="mb-0.5 text-[5.5px] font-bold uppercase tracking-wide"
            style={{
              color: styles.primaryColor,
              fontFamily: styles.headingFont,
            }}
          >
            Experience
          </div>
          <div
            className="mb-1 h-[1.5px] w-full"
            style={{ backgroundColor: styles.primaryColor }}
          />
          <div className="space-y-1">
            {workExperience.slice(0, 2).map((work) => (
              <div key={work.id}>
                <div className="text-[5px] font-semibold text-gray-800">
                  {work.jobTitle}
                </div>
                <div className="text-[4px] text-gray-500">{work.employer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {educationHistory.length > 0 && (
        <div className="mb-2">
          <div
            className="mb-0.5 text-[5.5px] font-bold uppercase tracking-wide"
            style={{
              color: styles.primaryColor,
              fontFamily: styles.headingFont,
            }}
          >
            Education
          </div>
          <div
            className="mb-1 h-[1.5px] w-full"
            style={{ backgroundColor: styles.primaryColor }}
          />
          {educationHistory.slice(0, 1).map((edu) => (
            <div key={edu.id}>
              <div className="text-[5px] font-semibold text-gray-800">
                {edu.degree}
              </div>
              <div className="text-[4px] text-gray-500">{edu.school}</div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <div
            className="mb-0.5 text-[5.5px] font-bold uppercase tracking-wide"
            style={{
              color: styles.primaryColor,
              fontFamily: styles.headingFont,
            }}
          >
            Skills
          </div>
          <div
            className="mb-1 h-[1.5px] w-full"
            style={{ backgroundColor: styles.primaryColor }}
          />
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 4).map((skill) => (
              <span
                key={skill.id}
                className="rounded px-1 py-px text-[3.5px] text-gray-600"
                style={{ border: `0.5px solid ${styles.primaryColor}` }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MiniSidebarPreview = ({
  styles,
  personalDetails,
  workExperience,
  educationHistory,
  skills,
}: {
  styles: ResumeTemplate["styles"];
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}) => {
  return (
    <div
      className="mx-auto flex h-60 w-40 overflow-hidden rounded-md border bg-white shadow-sm"
      style={{ fontFamily: styles.bodyFont }}
    >
      <div
        className="flex w-[35%] flex-col items-center px-1.5 py-3"
        style={{ backgroundColor: styles.primaryColor }}
      >
        <div className="mb-3 text-center">
          <div
            className="text-[6px] font-bold text-white"
            style={{ fontFamily: styles.headingFont }}
          >
            {personalDetails.firstName}
          </div>
          <div
            className="text-[6px] font-bold text-white"
            style={{ fontFamily: styles.headingFont }}
          >
            {personalDetails.lastName}
          </div>
          <div className="mt-1 space-y-0.5 text-[3px] text-gray-300">
            <div>{personalDetails.email}</div>
            {personalDetails.city && <div>{personalDetails.city}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="w-full">
            <div
              className="mb-1 text-center text-[4.5px] font-bold uppercase tracking-wide text-white"
              style={{ fontFamily: styles.headingFont }}
            >
              Skills
            </div>
            <div className="space-y-0.5">
              {skills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="text-[3.5px] text-gray-200">
                  ● {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-2.5">
        {workExperience.length > 0 && (
          <div className="mb-2.5">
            <div
              className="mb-0.5 text-[5px] font-bold uppercase tracking-wide"
              style={{
                color: styles.accentColor,
                fontFamily: styles.headingFont,
              }}
            >
              Experience
            </div>
            <div
              className="mb-1 h-[1px] w-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            {workExperience.slice(0, 1).map((work) => (
              <div key={work.id}>
                <div className="text-[4.5px] font-semibold text-gray-800">
                  {work.jobTitle}
                </div>
                <div className="text-[3.5px] text-gray-500">{work.employer}</div>
              </div>
            ))}
          </div>
        )}

        {educationHistory.length > 0 && (
          <div>
            <div
              className="mb-0.5 text-[5px] font-bold uppercase tracking-wide"
              style={{
                color: styles.accentColor,
                fontFamily: styles.headingFont,
              }}
            >
              Education
            </div>
            <div
              className="mb-1 h-[1px] w-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            {educationHistory.slice(0, 1).map((edu) => (
              <div key={edu.id}>
                <div className="text-[4.5px] font-semibold text-gray-800">
                  {edu.degree}
                </div>
                <div className="text-[3.5px] text-gray-500">{edu.school}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MiniBannerPreview = ({
  styles,
  personalDetails,
  workExperience,
  educationHistory,
  skills,
}: {
  styles: ResumeTemplate["styles"];
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}) => {
  return (
    <div
      className="mx-auto h-60 w-40 overflow-hidden rounded-md border bg-white shadow-sm"
      style={{ fontFamily: styles.bodyFont }}
    >
      <div
        className="px-3 py-3 text-center"
        style={{ background: styles.gradient }}
      >
        <div
          className="text-[7px] font-bold text-white"
          style={{ fontFamily: styles.headingFont }}
        >
          {personalDetails.firstName} {personalDetails.lastName}
        </div>
        <div className="mt-0.5 text-[4px] text-white/80">
          {personalDetails.email}
          {personalDetails.city && ` | ${personalDetails.city}`}
        </div>
      </div>

      <div className="p-2.5">
        {workExperience.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-1">
              <div
                className="h-[12px] w-[2px] rounded-full"
                style={{ backgroundColor: styles.primaryColor }}
              />
              <div
                className="text-[5px] font-bold uppercase tracking-wide"
                style={{
                  color: styles.primaryColor,
                  fontFamily: styles.headingFont,
                }}
              >
                Experience
              </div>
            </div>
            <div className="ml-1.5 mt-0.5">
              {workExperience.slice(0, 1).map((work) => (
                <div key={work.id}>
                  <div className="text-[4.5px] font-semibold text-gray-800">
                    {work.jobTitle}
                  </div>
                  <div className="text-[3.5px] text-gray-500">{work.employer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {educationHistory.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-1">
              <div
                className="h-[12px] w-[2px] rounded-full"
                style={{ backgroundColor: styles.accentColor }}
              />
              <div
                className="text-[5px] font-bold uppercase tracking-wide"
                style={{
                  color: styles.accentColor,
                  fontFamily: styles.headingFont,
                }}
              >
                Education
              </div>
            </div>
            <div className="ml-1.5 mt-0.5">
              {educationHistory.slice(0, 1).map((edu) => (
                <div key={edu.id}>
                  <div className="text-[4.5px] font-semibold text-gray-800">
                    {edu.degree}
                  </div>
                  <div className="text-[3.5px] text-gray-500">{edu.school}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <div className="flex items-center gap-1">
              <div
                className="h-[12px] w-[2px] rounded-full"
                style={{ backgroundColor: styles.primaryColor }}
              />
              <div
                className="text-[5px] font-bold uppercase tracking-wide"
                style={{
                  color: styles.primaryColor,
                  fontFamily: styles.headingFont,
                }}
              >
                Skills
              </div>
            </div>
            <div className="ml-1.5 mt-0.5 flex flex-wrap gap-0.5">
              {skills.slice(0, 4).map((skill) => (
                <span
                  key={skill.id}
                  className="rounded px-1 py-px text-[3px] text-gray-600"
                  style={{ border: `0.5px solid ${styles.primaryColor}` }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MiniPreview = ({
  resume,
}: {
  resume: RecentResume;
}) => {
  const template = RESUME_TEMPLATES.find((t) => t.id === resume.templateId);
  if (!template) return null;

  const props = {
    styles: template.styles,
    personalDetails: resume.personalDetails,
    workExperience: resume.workExperience,
    educationHistory: resume.educationHistory,
    skills: resume.skills,
  };

  switch (template.styles.layout) {
    case "sidebar":
      return <MiniSidebarPreview {...props} />;
    case "banner":
      return <MiniBannerPreview {...props} />;
    case "single-column":
    default:
      return <MiniSingleColumnPreview {...props} />;
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────

const RecentResumes = () => {
  const router = useRouter();
  const deleteResume = useResumeStore((state) => state.deleteResume);
  const [resumes, setResumes] = useState<RecentResume[]>(() => getRecentResumes());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (resumeId: string) => {
    router.push(`/${resumeId}/edit`);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteResume(deleteId);
    setResumes((prev) => prev.filter((r) => r.resumeId !== deleteId));
    setDeleteId(null);
  };

  if (resumes.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No recent work yet. Pick a template above to get started.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume) => (
        <Card
          key={resume.resumeId}
          className="transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-center bg-gray-50 py-6">
            <MiniPreview resume={resume} />
          </div>
          <CardContent className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">
                {resume.displayName}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {resume.templateName}
              </div>
            </div>
            <div className="ml-2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleEdit(resume.resumeId)}
                className="cursor-pointer"
              >
                <Pencil className="size-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="cursor-pointer text-destructive hover:text-destructive"
                    onClick={() => setDeleteId(resume.resumeId)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete resume?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete &quot;{resume.displayName}&quot;
                      and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteId(null)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentResumes;
