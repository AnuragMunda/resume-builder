import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { useResumeStore } from "@/hooks/store";
import InputSheet from "./eduInputSheet";
import EducationCard from "./educationCard";

const Education = () => {
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
      </FieldGroup>
    </div>
  );
};

export default Education;
