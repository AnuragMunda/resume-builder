import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { useResumeStore } from "@/hooks/store";
import InputSheet from "./inputSheet";
import WorkCard from "./workCard";

const Experience = () => {
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
      </FieldGroup>
    </div>
  );
};

export default Experience;
