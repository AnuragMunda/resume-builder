"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useResumeStore } from "@/hooks/store";
import { RESUME_TEMPLATES } from "@/utils/templates";
import {
  ResumeTemplate,
  PersonalDetails,
  WorkExperience,
  EducationHistory,
  Skill,
} from "@/utils/types";
import { dateFormatter } from "@/utils/helper";

interface ResumePreviewProps {
  templateId: string;
}

const SectionHeading = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles: ResumeTemplate["styles"];
}) => (
  <div
    className="mb-1 text-lg font-bold uppercase tracking-widest"
    style={{ color: styles.primaryColor, fontFamily: styles.headingFont }}
  >
    {children}
  </div>
);

const SectionDivider = ({ color }: { color: string }) => (
  <div className="mb-2 h-0.5 w-full" style={{ backgroundColor: color }} />
);

// ─── Single Column Layout ─────────────────────────────────────────────────────

const SingleColumnLayout = ({
  styles,
  personalDetails,
  summary,
  workExperience,
  educationHistory,
  skills,
}: {
  styles: ResumeTemplate["styles"];
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}) => {
  const hasName = personalDetails.firstName || personalDetails.lastName || personalDetails.jobTarget;
  const contactParts = [
    personalDetails.email,
    [personalDetails.city, personalDetails.state, personalDetails.country]
      .filter(Boolean)
      .join(", "),
    personalDetails.linkedin,
  ].filter(Boolean);

  return (
    <div className="space-y-4 p-6" style={{ fontFamily: styles.bodyFont }}>
      {/* Header */}
      {hasName && (
        <div>
          <div
            className="text-3xl font-bold"
            style={{
              fontFamily: styles.headingFont,
              color: styles.primaryColor,
            }}
          >
            {personalDetails.firstName}{" "}
            {personalDetails.lastName}
          </div>
          {personalDetails.jobTarget && (
            <div className="mt-0.5 text-lg text-gray-500">
              {personalDetails.jobTarget}
            </div>
          )}
          {contactParts.length > 0 && (
            <div className="mt-1 text-md text-gray-500">
              {contactParts.join(" | ")}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div>
          <SectionHeading styles={styles}>Summary</SectionHeading>
          <SectionDivider color={styles.primaryColor} />
          <p className="text-base leading-relaxed text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div>
          <SectionHeading styles={styles}>Experience</SectionHeading>
          <SectionDivider color={styles.primaryColor} />
          <div className="space-y-3">
            {workExperience.map((work) => (
              <div key={work.id}>
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-base font-semibold"
                    style={{
                      color: styles.primaryColor,
                      fontFamily: styles.headingFont,
                    }}
                  >
                    {work.jobTitle}
                    {work.employer && (
                      <span className="font-normal text-gray-600">
                        {" "}
                        at {work.employer}
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-md text-gray-500">
                  {work.startDate && dateFormatter.format(work.startDate)}
                  {work.startDate &&
                    (work.endDate || work.isWorking) &&
                    " - "}
                  {work.isWorking
                    ? "Present"
                    : work.endDate
                      ? dateFormatter.format(work.endDate)
                      : ""}
                  {work.location && ` | ${work.location}`}
                </div>
                {work.description && (
                  <p className="mt-2 text-base leading-relaxed text-gray-700">
                    {work.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {educationHistory.length > 0 && (
        <div>
          <SectionHeading styles={styles}>Education</SectionHeading>
          <SectionDivider color={styles.primaryColor} />
          <div className="space-y-3">
            {educationHistory.map((edu) => (
              <div key={edu.id}>
                <div
                  className="text-base font-semibold"
                  style={{
                    color: styles.primaryColor,
                    fontFamily: styles.headingFont,
                  }}
                >
                  {edu.degree}
                  {edu.school && (
                    <span className="font-normal text-gray-600">
                      {" "}
                      at {edu.school}
                    </span>
                  )}
                </div>
                <div className="text-md text-gray-500">
                  {edu.startDate && dateFormatter.format(edu.startDate)}
                  {edu.startDate && edu.endDate && " - "}
                  {edu.endDate && dateFormatter.format(edu.endDate)}
                  {edu.location && ` | ${edu.location}`}
                </div>
                {edu.description && (
                  <p className="mt-2 text-base text-gray-700">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <SectionHeading styles={styles}>Skills</SectionHeading>
          <SectionDivider color={styles.primaryColor} />
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded border px-2 py-0.5 text-base text-gray-700"
                style={{ borderColor: styles.primaryColor }}
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

// ─── Sidebar Layout ───────────────────────────────────────────────────────────

const SidebarLayout = ({
  styles,
  personalDetails,
  summary,
  workExperience,
  educationHistory,
  skills,
}: {
  styles: ResumeTemplate["styles"];
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}) => {
  const hasName = personalDetails.firstName || personalDetails.lastName || personalDetails.jobTarget;

  return (
    <div className={`flex min-h-full`} style={{ fontFamily: styles.bodyFont }}>
      {/* Sidebar - background always visible */}
      <div
        className="flex min-h-full min-w-[30%] flex-col p-4 text-white"
        style={{ backgroundColor: styles.primaryColor }}
      >
        {/* Name - only when entered */}
        {hasName && (
          <div className="mb-4">
            <div
              className="text-3xl font-bold"
              style={{ fontFamily: styles.headingFont }}
            >
              {personalDetails.firstName}
            </div>
            <div
              className="text-3xl font-bold"
              style={{ fontFamily: styles.headingFont }}
            >
              {personalDetails.lastName}
            </div>
            {personalDetails.jobTarget && (
              <div className="mt-1 text-lg text-gray-300">
                {personalDetails.jobTarget}
              </div>
            )}
          </div>
        )}

        {/* Contact - only when entered */}
        {(personalDetails.email ||
          personalDetails.city ||
          personalDetails.state ||
          personalDetails.country ||
          personalDetails.linkedin) && (
          <div className="mb-4 space-y-1 text-md text-gray-300">
            {personalDetails.email && <div>{personalDetails.email}</div>}
            {[
              personalDetails.city,
              personalDetails.state,
              personalDetails.country,
            ]
              .filter(Boolean)
              .join(", ") && (
              <div>
                {[
                  personalDetails.city,
                  personalDetails.state,
                  personalDetails.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            )}
            {personalDetails.linkedin && (
              <div>{personalDetails.linkedin}</div>
            )}
          </div>
        )}

        {/* Skills - only when entries exist */}
        {skills.length > 0 && (
          <div>
            <div
              className="mb-1 text-lg font-bold uppercase tracking-widest"
              style={{ fontFamily: styles.headingFont }}
            >
              Skills
            </div>
            <div className="h-0.5 w-full bg-white/30" />
            <div className="mt-2 space-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="text-md text-gray-200">
                  ● {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-7 space-y-4 p-4">
        {summary && (
          <div>
            <SectionHeading
              styles={{ ...styles, primaryColor: styles.accentColor }}
            >
              Summary
            </SectionHeading>
            <SectionDivider color={styles.accentColor} />
            <p className="text-md leading-relaxed text-gray-700">{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div>
            <SectionHeading
              styles={{ ...styles, primaryColor: styles.accentColor }}
            >
              Experience
            </SectionHeading>
            <SectionDivider color={styles.accentColor} />
            <div className="space-y-4">
              {workExperience.map((work) => (
                <div key={work.id}>
                  <div
                    className="text-base font-semibold"
                    style={{
                      color: styles.accentColor,
                      fontFamily: styles.headingFont,
                    }}
                  >
                    {work.jobTitle}
                    {work.employer && (
                      <span className="font-normal text-gray-600">
                        {" "}
                        at {work.employer}
                      </span>
                    )}
                  </div>
                  <div className="text-md text-gray-500">
                    {work.startDate && dateFormatter.format(work.startDate)}
                    {work.startDate &&
                      (work.endDate || work.isWorking) &&
                      " - "}
                    {work.isWorking
                      ? "Present"
                      : work.endDate
                        ? dateFormatter.format(work.endDate)
                        : ""}
                    {work.location && ` | ${work.location}`}
                  </div>
                  {work.description && (
                    <p className="mt-2 text-md leading-relaxed text-gray-700">
                      {work.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {educationHistory.length > 0 && (
          <div>
            <SectionHeading
              styles={{ ...styles, primaryColor: styles.accentColor }}
            >
              Education
            </SectionHeading>
            <SectionDivider color={styles.accentColor} />
            <div className="space-y-3">
              {educationHistory.map((edu) => (
                <div key={edu.id}>
                  <div
                    className="text-base font-semibold"
                    style={{
                      color: styles.accentColor,
                      fontFamily: styles.headingFont,
                    }}
                  >
                    {edu.degree}
                    {edu.school && (
                      <span className="font-normal text-gray-600">
                        {" "}
                        at {edu.school}
                      </span>
                    )}
                  </div>
                  <div className="text-md text-gray-500">
                    {edu.startDate && dateFormatter.format(edu.startDate)}
                    {edu.startDate && edu.endDate && " - "}
                    {edu.endDate && dateFormatter.format(edu.endDate)}
                    {edu.location && ` | ${edu.location}`}
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-md text-gray-700">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Banner Layout ────────────────────────────────────────────────────────────

const BannerLayout = ({
  styles,
  personalDetails,
  summary,
  workExperience,
  educationHistory,
  skills,
}: {
  styles: ResumeTemplate["styles"];
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  educationHistory: EducationHistory[];
  skills: Skill[];
}) => {
  const hasName = personalDetails.firstName || personalDetails.lastName;
  const hasContact =
    personalDetails.email ||
    personalDetails.city ||
    personalDetails.state ||
    personalDetails.country;

  return (
    <div style={{ fontFamily: styles.bodyFont }}>
      {/* Gradient Header - background always visible */}
      <div
        className="px-6 py-5 text-center text-white"
        style={{ background: styles.gradient }}
      >
        {hasName && (
          <div
            className="text-2xl font-bold"
            style={{ fontFamily: styles.headingFont }}
          >
            {personalDetails.firstName}{" "}
            {personalDetails.lastName}
          </div>
        )}
        {personalDetails.jobTarget && (
          <div className="mt-0.5 text-lg text-white/80">
            {personalDetails.jobTarget}
          </div>
        )}
        {hasContact && (
          <div className="mt-1 text-md text-white/70">
            {[
              personalDetails.email,
              personalDetails.linkedin,
              [
                personalDetails.city,
                personalDetails.state,
                personalDetails.country,
              ]
                .filter(Boolean)
                .join(", "),
            ]
              .filter(Boolean)
              .join(" | ")}
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        {/* Summary */}
        {summary && (
          <div className="flex gap-2">
            <div
              className="w-0.75 shrink-0 rounded-full"
              style={{ backgroundColor: styles.primaryColor }}
            />
            <div className="flex-1">
              <SectionHeading styles={styles}>Summary</SectionHeading>
              <p className="text-base leading-relaxed text-gray-700">
                {summary}
              </p>
            </div>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="flex gap-2">
            <div
              className="w-0.75 shrink-0 rounded-full"
              style={{ backgroundColor: styles.primaryColor }}
            />
            <div className="flex-1">
              <SectionHeading styles={styles}>Experience</SectionHeading>
              <div className="space-y-3">
                {workExperience.map((work) => (
                  <div key={work.id}>
                    <div
                      className="text-base font-semibold"
                      style={{
                        color: styles.primaryColor,
                        fontFamily: styles.headingFont,
                      }}
                    >
                      {work.jobTitle}
                      {work.employer && (
                        <span className="font-normal text-gray-600">
                          {" "}
                          at {work.employer}
                        </span>
                      )}
                    </div>
                    <div className="text-md text-gray-500">
                      {work.startDate &&
                        dateFormatter.format(work.startDate)}
                      {work.startDate &&
                        (work.endDate || work.isWorking) &&
                        " - "}
                      {work.isWorking
                        ? "Present"
                        : work.endDate
                          ? dateFormatter.format(work.endDate)
                          : ""}
                      {work.location && ` | ${work.location}`}
                    </div>
                    {work.description && (
                      <p className="mt-2 text-base leading-relaxed text-gray-700">
                        {work.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {educationHistory.length > 0 && (
          <div className="flex gap-2">
            <div
              className="w-0.75 shrink-0 rounded-full"
              style={{ backgroundColor: styles.accentColor }}
            />
            <div className="flex-1">
              <SectionHeading
                styles={{ ...styles, primaryColor: styles.accentColor }}
              >
                Education
              </SectionHeading>
              <div className="space-y-3">
                {educationHistory.map((edu) => (
                  <div key={edu.id}>
                    <div
                      className="text-base font-semibold"
                      style={{
                        color: styles.accentColor,
                        fontFamily: styles.headingFont,
                      }}
                    >
                      {edu.degree}
                      {edu.school && (
                        <span className="font-normal text-gray-600">
                          {" "}
                          at {edu.school}
                        </span>
                      )}
                    </div>
                    <div className="text-md text-gray-500">
                      {edu.startDate &&
                        dateFormatter.format(edu.startDate)}
                      {edu.startDate && edu.endDate && " - "}
                      {edu.endDate && dateFormatter.format(edu.endDate)}
                      {edu.location && ` | ${edu.location}`}
                    </div>
                    {edu.description && (
                      <p className="mt-2 text-base text-gray-700">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex gap-2">
            <div
              className="w-0.75 shrink-0 rounded-full"
              style={{ backgroundColor: styles.primaryColor }}
            />
            <div className="flex-1">
              <SectionHeading styles={styles}>Skills</SectionHeading>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded border px-2 py-0.5 text-base text-gray-700"
                    style={{ borderColor: styles.primaryColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const PREVIEW_WIDTH_MM = 210;
const PREVIEW_HEIGHT_MM = 297;

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ templateId }, ref) => {
    const template = RESUME_TEMPLATES.find((t) => t.id === templateId);
    const personalDetails = useResumeStore((s) => s.personalDetails);
    const summary = useResumeStore((s) => s.summary);
    const workExperience = useResumeStore((s) => s.workExperience);
    const educationHistory = useResumeStore((s) => s.educationHistory);
    const skills = useResumeStore((s) => s.skills);
    const containerRef = useRef<HTMLDivElement>(null);
    const exportRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useImperativeHandle(ref, () => containerRef.current!);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const updateScale = () => {
        const containerWidth = el.clientWidth;
        const previewWidthPx = (PREVIEW_WIDTH_MM / 25.4) * 96;
        const newScale = Math.min(1, containerWidth / previewWidthPx);
        setScale(newScale);
      };

      updateScale();

      const observer = new ResizeObserver(updateScale);
      observer.observe(el);

      return () => observer.disconnect();
    }, []);

    if (!template) return null;

    const props = {
      styles: template.styles,
      personalDetails,
      summary,
      workExperience,
      educationHistory,
      skills,
    };

    const previewHeightPx = (PREVIEW_HEIGHT_MM / 25.4) * 96;

    return (
      <div
        ref={containerRef}
        className="mx-auto w-full overflow-hidden border border-black"
        style={{ height: previewHeightPx * scale }}
      >
        <div
          className="origin-top-left"
          style={{
            width: `${PREVIEW_WIDTH_MM}mm`,
            height: `${PREVIEW_HEIGHT_MM}mm`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div ref={exportRef} className="h-full w-full rounded-md border bg-white shadow-md">
            <div className="h-full">
              {template.styles.layout === "sidebar" ? (
                <SidebarLayout {...props} />
              ) : template.styles.layout === "banner" ? (
                <BannerLayout {...props} />
              ) : (
                <SingleColumnLayout {...props} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
