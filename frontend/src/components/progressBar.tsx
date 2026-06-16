import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

const ProgressBar = () => {
  return (
    <Field className="w-full mb-2">
      <FieldLabel htmlFor="progress-upload">
        <span className="ml-auto">66%</span>
      </FieldLabel>
      <Progress value={66} id="progress-upload" />
    </Field>
  );
};

export default ProgressBar;
