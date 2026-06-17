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
import InputSheet from "./eduInputSheet";
import EducationCard from "./educationCard";

const Experience = () => {
  const setCurrentLevel = useLevelStore((state) => state.setCurrentLevel);
  const { educationHistory, setOpenSheet, openSheet } = useResumeStore();

  return (
    <div className="w-full text-left">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="md:data-[variant=legend]:text-2xl">
            Education History{" "}
          </FieldLegend>
          <FieldDescription className="md:mb-4">
            A varied education on your resume sums up the value that your
            learnings and background will bring to job.
          </FieldDescription>
          <FieldGroup>
            {educationHistory.length > 0 &&
              educationHistory.map((edu) => (
                <EducationCard
                  key={edu.id}
                  edu={edu}
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
            className="md:text-base md:px-5 md:py-5 md:cursor-pointer"
            variant="outline"
            onClick={() => setCurrentLevel("skills")}
          >
            Back
          </Button>
          {/* <Button
            type="button"
            className="md:text-base md:px-4 md:py-5 md:cursor-pointer"
            size="lg"
            // onClick={() => setCurrentLevel("skills")}
          >
            Done
          </Button> */}
        </Field>
      </FieldGroup>
    </div>
  );
};

export default Experience;
