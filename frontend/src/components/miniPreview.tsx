"use client";

import { ResumeTemplate } from "@/utils/types";

export const SingleColumnPreview = ({
  styles,
}: {
  styles: ResumeTemplate["styles"];
}) => {
  return (
    <div
      className="mx-auto h-60 w-40 overflow-hidden rounded-md border bg-white p-3 shadow-sm"
      style={{ fontFamily: styles.bodyFont }}
    >
      <div className="mb-2">
        <div
          className="text-[7px] font-bold uppercase tracking-wide"
          style={{
            color: styles.primaryColor,
            fontFamily: styles.headingFont,
          }}
        >
          John Doe
        </div>
        <div className="mt-0.5 text-[4.5px] text-gray-500">
          john@email.com | New York
        </div>
      </div>

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
          <div className="text-[5px] font-semibold text-gray-800">
            Software Engineer
          </div>
          <div className="text-[4px] text-gray-500">Acme Corp</div>
          <div className="space-y-0.5">
            <div className="h-[1px] w-[90%] bg-gray-200" />
            <div className="h-[1px] w-[75%] bg-gray-200" />
            <div className="h-[1px] w-[60%] bg-gray-200" />
          </div>
        </div>
      </div>

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
        <div className="text-[5px] font-semibold text-gray-800">
          B.S. Computer Science
        </div>
        <div className="text-[4px] text-gray-500">State University</div>
      </div>

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
          {["React", "TypeScript", "Node.js", "Python"].map((skill) => (
            <span
              key={skill}
              className="rounded px-1 py-px text-[3.5px] text-gray-600"
              style={{ border: `0.5px solid ${styles.primaryColor}` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SidebarPreview = ({
  styles,
}: {
  styles: ResumeTemplate["styles"];
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
            John
          </div>
          <div
            className="text-[6px] font-bold text-white"
            style={{ fontFamily: styles.headingFont }}
          >
            Doe
          </div>
          <div className="mt-1 space-y-0.5 text-[3px] text-gray-300">
            <div>john@email.com</div>
            <div>New York</div>
            <div>linkedin/in/john</div>
          </div>
        </div>

        <div className="w-full">
          <div
            className="mb-1 text-center text-[4.5px] font-bold uppercase tracking-wide text-white"
            style={{ fontFamily: styles.headingFont }}
          >
            Skills
          </div>
          <div className="space-y-0.5">
            {["React", "TypeScript", "Node.js", "Python"].map((skill) => (
              <div key={skill} className="text-[3.5px] text-gray-200">
                ● {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-2.5">
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
          <div className="text-[4.5px] font-semibold text-gray-800">
            Software Engineer
          </div>
          <div className="text-[3.5px] text-gray-500">Acme Corp</div>
          <div className="mt-0.5 space-y-0.5">
            <div className="h-[0.5px] w-[90%] bg-gray-200" />
            <div className="h-[0.5px] w-[70%] bg-gray-200" />
          </div>
        </div>

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
          <div className="text-[4.5px] font-semibold text-gray-800">
            B.S. Computer Science
          </div>
          <div className="text-[3.5px] text-gray-500">State University</div>
        </div>
      </div>
    </div>
  );
};

export const BannerPreview = ({
  styles,
}: {
  styles: ResumeTemplate["styles"];
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
          John Doe
        </div>
        <div className="mt-0.5 text-[4px] text-white/80">
          john@email.com | New York
        </div>
      </div>

      <div className="p-2.5">
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
            <div className="text-[4.5px] font-semibold text-gray-800">
              Software Engineer
            </div>
            <div className="text-[3.5px] text-gray-500">Acme Corp</div>
            <div className="mt-0.5 space-y-0.5">
              <div className="h-[0.5px] w-[90%] bg-gray-200" />
              <div className="h-[0.5px] w-[70%] bg-gray-200" />
            </div>
          </div>
        </div>

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
            <div className="text-[4.5px] font-semibold text-gray-800">
              B.S. Computer Science
            </div>
            <div className="text-[3.5px] text-gray-500">State University</div>
          </div>
        </div>

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
            {["React", "TypeScript", "Node.js", "Python"].map((skill) => (
              <span
                key={skill}
                className="rounded px-1 py-px text-[3px] text-gray-600"
                style={{ border: `0.5px solid ${styles.primaryColor}` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TemplatePreview = ({
  styles,
}: {
  styles: ResumeTemplate["styles"];
}) => {
  switch (styles.layout) {
    case "sidebar":
      return <SidebarPreview styles={styles} />;
    case "banner":
      return <BannerPreview styles={styles} />;
    case "single-column":
    default:
      return <SingleColumnPreview styles={styles} />;
  }
};
