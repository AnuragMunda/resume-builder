import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { Textarea } from "../ui/textarea";
import { useResumeStore } from "@/hooks/store";
import { debounce } from "@/utils/helper";
import { useCallback, useEffect, useState } from "react";

const Summary = () => {
  const { summary, setSummary } = useResumeStore();
  const [localSummary, setLocalSummary] = useState<string>(summary);

  const debouncedSetDetails = useCallback(
    debounce((text: any) => {
      setSummary(text);
    }, 600),
    [],
  );

  useEffect(() => {
    setLocalSummary(summary);
  }, [summary]);

  return (
    <div className="w-full text-left">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="md:data-[variant=legend]:text-2xl">
            Professional Summary
          </FieldLegend>
          <FieldDescription className="md:mb-4">
            Write 2-4 short, energetic sentences about how great you are.
            Mention the role and what you did. What were the big achievements?
            Describe your motivation and list your skills.
          </FieldDescription>
          <FieldGroup>
            <Field>
              <Textarea
                value={localSummary}
                className="min-h-80 md:text-base text-md"
                placeholder="Type your message here."
                onChange={(e) => {
                  setLocalSummary(e.target.value);
                  debouncedSetDetails(e.target.value);
                }}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
};

export default Summary;
