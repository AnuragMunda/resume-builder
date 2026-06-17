"use client";

import { useRouter } from "next/navigation";
import TemplateCard from "@/components/templateCard";
import { useResumeStore } from "@/hooks/store";
import { RESUME_TEMPLATES } from "@/utils/templates";

export default function Home() {
  const router = useRouter();
  const createNewResume = useResumeStore((state) => state.createNewResume);

  const handleSelectTemplate = (templateId: string) => {
    const resumeId = createNewResume(templateId);
    router.push(`/${resumeId}/edit`);
  };

  return (
    <main className="flex flex-col items-center px-4 py-12">
      <div className="mb-10 max-w-lg text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Build Your Resume
        </h1>
        <p className="mt-3 text-muted-foreground">
          Choose a template to get started. You can customize everything later.
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {RESUME_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => handleSelectTemplate(template.id)}
          />
        ))}
      </div>
    </main>
  );
}
