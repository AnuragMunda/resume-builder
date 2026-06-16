import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

import { Button } from "../../ui/button";
import { useLevelStore, useResumeStore } from "@/hooks/store";
import InputSheet from "./inputSheet";
import WorkCard from "./workCard";

const Experience = () => {
  const setCurrentLevel = useLevelStore((state) => state.setCurrentLevel);
  const { workExperience, setOpenSheet, openSheet } = useResumeStore();

  return (
    <div className="w-full text-left">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="md:data-[variant=legend]:text-2xl">
            Work Experience
          </FieldLegend>
          <FieldDescription className="md:mb-4">
            Show your recent and relevant experience. If possible - use
            numbers/facts (Achieved X, measured by Y, by doing Z).
          </FieldDescription>
          <FieldGroup>
            {workExperience.length > 0 &&
              workExperience.map((work) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  openSheet={openSheet}
                  setOpenSheet={setOpenSheet}
                />
              ))}
          </FieldGroup>
          <FieldGroup>
            <Field className="w-[50%]">
              <InputSheet />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal" className="w-full flex justify-between">
          <Button
            size="lg"
            variant="outline"
            className="md:text-base md:px-4 md:py-5 md:cursor-pointer"
            onClick={() => setCurrentLevel("summary")}
          >
            Back
          </Button>
          <Button
            type="button"
            className="md:text-base md:px-4 md:py-5 md:cursor-pointer"
            size="lg"
            onClick={() => setCurrentLevel("skills")}
          >
            Next: Skills
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
};

export default Experience;
