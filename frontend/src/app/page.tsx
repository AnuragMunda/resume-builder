"use client";

import { useRouter } from "next/navigation";
import TemplateCard from "@/components/templateCard";
import RecentResumes from "@/components/recentResumes";
import { useResumeStore } from "@/hooks/store";
import { RESUME_TEMPLATES } from "@/utils/templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <Tabs defaultValue="templates" className="w-full max-w-3xl">
        <TabsList className="w-full min-h-10 mb-8 bg-neutral-800">
          <TabsTrigger
            value="templates"
            className="flex-1 md:text-md cursor-pointer text-white md:hover:text-neutral-400"
          >
            Templates
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="flex-1 md:text-md cursor-pointer text-white md:hover:text-neutral-400"
          >
            Recent Work
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {RESUME_TEMPLATES.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={() => handleSelectTemplate(template.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <RecentResumes />
        </TabsContent>
      </Tabs>
    </main>
  );
}
