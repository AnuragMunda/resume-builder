import { ResumeTemplate } from "./types";

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description:
      "A clean and traditional layout that works for any industry.",
    styles: {
      primaryColor: "#1a1a1a",
      accentColor: "#1a1a1a",
      headingFont: "var(--font-heading)",
      bodyFont: "var(--font-sans)",
      layout: "single-column",
    },
  },
  {
    id: "modern",
    name: "Modern",
    description:
      "A sleek sidebar layout with a professional blue accent.",
    styles: {
      primaryColor: "#0f172a",
      accentColor: "#3b82f6",
      headingFont: "var(--font-sans)",
      bodyFont: "var(--font-sans)",
      layout: "sidebar",
    },
  },
  {
    id: "attractive",
    name: "Attractive",
    description:
      "A bold gradient header that makes a lasting impression.",
    styles: {
      primaryColor: "#7c3aed",
      accentColor: "#ec4899",
      headingFont: "var(--font-heading)",
      bodyFont: "var(--font-sans)",
      layout: "banner",
      gradient: "linear-gradient(135deg, #7c3aed, #ec4899)",
    },
  },
];
