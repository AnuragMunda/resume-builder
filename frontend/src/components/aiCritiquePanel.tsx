"use client";

import type { ResumeCritique } from "@/utils/types";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  ThumbsUp,
  AlertTriangle,
  ListChecks,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const scoreColor = (score: number) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const scoreTextColor = (score: number) => {
  if (score >= 70) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const ScoreBadge = ({ score }: { score: number }) => (
  <span
    className={cn(
      "inline-flex items-center justify-center size-9 shrink-0 rounded-full font-bold text-sm",
      score >= 70 && "bg-green-100 text-green-700",
      score >= 50 && score < 70 && "bg-yellow-100 text-yellow-700",
      score < 50 && "bg-red-100 text-red-700",
    )}
  >
    {score}
  </span>
);

const SectionRow = ({
  label,
  score,
  feedback,
  suggestions,
}: {
  label: string;
  score: number;
  feedback: string;
  suggestions: string[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium"
      >
        <ScoreBadge score={score} />
        <span className="flex-1">{label}</span>
        <Progress
          value={score}
          className="h-2 w-20"
          indicatorClassName={scoreColor(score)}
        />
        {open ? (
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="space-y-2 border-t px-4 py-3 text-sm text-muted-foreground">
          <p>{feedback}</p>
          {suggestions.length > 0 && (
            <ul className="space-y-1 pl-4">
              {suggestions.map((s, i) => (
                <li key={i} className="list-disc">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

interface AiCritiquePanelProps {
  critique: ResumeCritique;
}

const AiCritiquePanel = ({ critique }: AiCritiquePanelProps) => {
  const { overall, sections } = critique;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <div
          className={cn(
            "mx-auto mb-2 flex size-20 items-center justify-center rounded-full text-3xl font-bold",
            overall.score >= 70 && "bg-green-100 text-green-700",
            overall.score >= 50 && overall.score < 70 && "bg-yellow-100 text-yellow-700",
            overall.score < 50 && "bg-red-100 text-red-700",
          )}
        >
          {overall.score}
        </div>
        <p
          className={cn(
            "text-lg font-semibold",
            scoreTextColor(overall.score),
          )}
        >
          {overall.score >= 70
            ? "Looking good!"
            : overall.score >= 50
              ? "Room for improvement"
              : "Needs significant work"}
        </p>
      </div>

      <div className="space-y-4">
        {overall.strengths.length > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-700">
              <ThumbsUp className="size-4" />
              Strengths
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {overall.strengths.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-green-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {overall.weaknesses.length > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700">
              <AlertTriangle className="size-4" />
              Weaknesses
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {overall.weaknesses.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-red-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {overall.recommendations.length > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
              <ListChecks className="size-4" />
              Recommendations
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {overall.recommendations.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 shrink-0 text-blue-500">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Lightbulb className="size-4" />
          Section Breakdown
        </h4>
        <div className="space-y-2">
          <SectionRow
            label="Personal Details"
            score={sections.personalDetails.score}
            feedback={sections.personalDetails.feedback}
            suggestions={sections.personalDetails.suggestions}
          />
          <SectionRow
            label="Summary"
            score={sections.summary.score}
            feedback={sections.summary.feedback}
            suggestions={sections.summary.suggestions}
          />
          <SectionRow
            label="Work Experience"
            score={sections.workExperience.score}
            feedback={sections.workExperience.feedback}
            suggestions={sections.workExperience.suggestions}
          />
          <SectionRow
            label="Education"
            score={sections.educationHistory.score}
            feedback={sections.educationHistory.feedback}
            suggestions={sections.educationHistory.suggestions}
          />
          <SectionRow
            label="Skills"
            score={sections.skills.score}
            feedback={sections.skills.feedback}
            suggestions={sections.skills.suggestions}
          />
        </div>
      </div>
    </div>
  );
};

export default AiCritiquePanel;
