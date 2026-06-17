import ResumePreview from "@/components/resumePreview";
import { useResumeStore } from "@/hooks/store";

const Preview = () => {
  const templateId = useResumeStore((state) => state.templateId);

  if (!templateId) return null;

  return (
    <div className="flex-1 overflow-auto p-5">
      <ResumePreview templateId={templateId} />
    </div>
  );
};

export default Preview;
