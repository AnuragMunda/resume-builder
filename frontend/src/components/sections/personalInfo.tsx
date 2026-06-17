import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "../ui/input";

import { useResumeStore } from "@/hooks/store";
import { camelToNormal, debounce } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";
import { PersonalDetails } from "@/utils/types";

const PersonalInfo = () => {
  const { personalDetails, setPersonalDetails } = useResumeStore();
  const [localDetails, setLocalDetails] =
    useState<PersonalDetails>(personalDetails);

  const debouncedSetDetails = useCallback(
    debounce((newDetails: any) => {
      setPersonalDetails(newDetails);
    }, 600),
    [],
  );

  useEffect(() => {
    setLocalDetails(personalDetails);
  }, [personalDetails]);

  return (
    <div className="w-full text-left">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="md:data-[variant=legend]:text-2xl">
            Personal Details
          </FieldLegend>

          <FieldDescription className="md:mb-4">
            Users who added phone number and email received 64% more positive
            feedback from recruiters.
          </FieldDescription>
          <FieldGroup className="grid md:grid-cols-2 md:gap-10">
            {(Object.keys(localDetails) as Array<keyof PersonalDetails>).map(
              (key) => (
                <Field
                  key={key}
                  className={key === "jobTarget" ? "md:col-span-2" : ""}
                >
                  <FieldLabel htmlFor={key}>
                    {camelToNormal(key)}
                  </FieldLabel>
                  <Input
                    id={key}
                    className="text-md md:text-base"
                    value={localDetails[key]}
                    placeholder={
                      key === "jobTarget"
                        ? "The role you want"
                        : key === "linkedin"
                          ? "linkedin.com/in/your-profile"
                          : ""
                    }
                    onChange={(e) => {
                      const updated = {
                        ...localDetails,
                        [key]: e.target.value,
                      };

                      setLocalDetails(updated);
                      debouncedSetDetails(updated);
                    }}
                  />
                </Field>
              ),
            )}
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
};

export default PersonalInfo;
