import { Button } from "@/components/ui/button";
import ProgressBar from "../progressBar";
import Education from "../sections/education/education";
import Experience from "../sections/experience/experience";
import PersonalInfo from "../sections/personalInfo";
import Skills from "../sections/skills";
import Summary from "../sections/summary";
import { useLevelStore } from "@/hooks/store";
import { LevelType } from "@/utils/types";

const LEVELS: { key: LevelType; label: string }[] = [
  { key: "info", label: "Personal Details" },
  { key: "summary", label: "Summary" },
  { key: "work", label: "Work Experience" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
];

const EditorForm = () => {
  const currentLevel = useLevelStore((state) => state.currentLevel);
  const setCurrentLevel = useLevelStore((state) => state.setCurrentLevel);

  const currentIndex = LEVELS.findIndex((l) => l.key === currentLevel);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < LEVELS.length - 1;
  const nextLabel = hasNext ? LEVELS[currentIndex + 1].label : null;

  return (
    <section className="flex-1 flex flex-col gap-3 md:px-10 md:py-5">
      <ProgressBar />
      <div className="flex-1 overflow-auto pb-16">
        {currentLevel === "info" && <PersonalInfo />}
        {currentLevel === "summary" && <Summary />}
        {currentLevel === "work" && <Experience />}
        {currentLevel === "skills" && <Skills />}
        {currentLevel === "education" && <Education />}
      </div>
      <div className="sticky bottom-0 flex items-center justify-between border-t bg-background/80 backdrop-blur-sm p-4">
        {hasPrev ? (
          <Button
            size="lg"
            variant="outline"
            className="md:text-base md:px-5 md:py-5 cursor-pointer"
            onClick={() => setCurrentLevel(LEVELS[currentIndex - 1].key)}
          >
            Back
          </Button>
        ) : (
          <div />
        )}
        {hasNext && (
          <Button
            size="lg"
            className="md:text-base md:px-4 md:py-5 cursor-pointer"
            onClick={() => setCurrentLevel(LEVELS[currentIndex + 1].key)}
          >
            Next: {nextLabel}
          </Button>
        )}
      </div>
    </section>
  );
};

export default EditorForm;
