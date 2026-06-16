import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { useLevelStore, useResumeStore } from "@/hooks/store";
import { debounce } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";
import { Skill } from "@/utils/types";
import { Trash2 } from "lucide-react";

import { v4 as uuidv4 } from "uuid";

const Skills = () => {
  const setCurrentLevel = useLevelStore((state) => state.setCurrentLevel);
  const { skills, setSkills } = useResumeStore();
  const [localSkills, setLocalSkills] = useState<Skill[]>([
    {
      id: uuidv4(),
      name: "",
    },
  ]);

  const debouncedSetDetails = useCallback(
    debounce((value: any) => {
      setSkills(value);
    }, 600),
    [],
  );

  useEffect(() => {
    if (skills.length > 0) {
      setLocalSkills(skills);
    }
  }, [skills]);

  return (
    <div className="w-full text-left">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="md:data-[variant=legend]:text-2xl">
            Skills
          </FieldLegend>
          <FieldDescription className="md:mb-4">
            Choose 6 important skills that show you fit the position. Make sure
            they match the skills mentioned in the job listing.
          </FieldDescription>
          <FieldGroup>
            {localSkills.length > 0 &&
              localSkills.map((skill, index) => (
                <Field key={skill.id}>
                  <FieldLabel htmlFor={`skill-${skill.id}`}>
                    {`Skill ${index + 1}`}{" "}
                  </FieldLabel>
                  <div className="flex items-center gap-3">
                    <Input
                      id={`skill-${skill.id}`}
                      className="md:text-base"
                      onChange={(e) => {
                        const updated = localSkills.map((s) =>
                          s.id === skill.id
                            ? { ...s, name: e.target.value }
                            : s,
                        );
                        setLocalSkills(updated);
                        debouncedSetDetails(updated);
                      }}
                    />
                    <Trash2
                      size={22}
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        const updated = localSkills.filter(
                          (s) => s.id !== skill.id,
                        );
                        setLocalSkills(updated);
                        debouncedSetDetails(updated);
                      }}
                    />
                  </div>
                </Field>
              ))}

            <Field className="border w-[50%]">
              <Button
                variant="outline"
                size="lg"
                className="border-black md:cursor-pointer md:py-5"
                onClick={() => {
                  if (localSkills.length >= 6) return;
                  setLocalSkills([...localSkills, { id: uuidv4(), name: "" }]);
                }}
              >
                + Add more skill
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal" className="w-full flex justify-between">
          <Button
            size="lg"
            variant="outline"
            className="md:text-base md:px-4 md:py-5 md:cursor-pointer"
            onClick={() => setCurrentLevel("work")}
          >
            Back
          </Button>
          <Button
            type="button"
            className="md:text-base md:px-4 md:py-5 md:cursor-pointer"
            size="lg"
            onClick={() => setCurrentLevel("education")}
          >
            Next: Education History
          </Button>
        </Field>
      </FieldGroup>
    </div>
  );
};

export default Skills;
