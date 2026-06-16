import ProgressBar from "../progressBar";
import Education from "../sections/education/education";
import Experience from "../sections/experience/experience";
import PersonalInfo from "../sections/personalInfo";
import Skills from "../sections/skills";
import Summary from "../sections/summary";
import { useLevelStore } from "@/hooks/store";

const EditorForm = () => {
  const currentLevel = useLevelStore((state) => state.currentLevel);

  return (
    <section className="flex-1 flex flex-col gap-3 md:px-10 md:py-5">
      <ProgressBar />
      {currentLevel === "info" && <PersonalInfo />}
      {currentLevel === "summary" && <Summary />}
      {currentLevel === "work" && <Experience />}
      {currentLevel === "skills" && <Skills />}
      {currentLevel === "education" && <Education />}
    </section>
  );
};

export default EditorForm;
