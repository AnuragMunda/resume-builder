"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/editor/editor";
import ResumePreview from "@/components/resumePreview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useResumeStore } from "@/hooks/store";
import { ArrowLeft } from "lucide-react";

const Edit = () => {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;
  const loadResume = useResumeStore((state) => state.loadResume);
  const templateId = useResumeStore((state) => state.templateId);
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId, loadResume]);

  useEffect(() => {
    if (resumeId) {
      const stored = localStorage.getItem(`${resumeId}-template`);
      if (!stored) {
        router.push("/");
      }
    }
  }, [resumeId, router]);

  return (
    <section>
      <div className="px-5 pt-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <Tabs defaultValue="edit" className="p-5 flex items-center">
        <TabsList className="w-full min-h-10 md:max-w-[20%]">
          <TabsTrigger className="md:text-md cursor-pointer" value="edit">
            Edit
          </TabsTrigger>
          {isSmallerDevice ? (
            <TabsTrigger value="preview">Preview</TabsTrigger>
          ) : (
            <TabsTrigger
              className="md:text-md cursor-pointer"
              value="customise"
            >
              Customise
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="edit" className="w-full">
          <Editor />
        </TabsContent>
        {isSmallerDevice ? (
          <TabsContent value="preview" className="w-full">
            {templateId && <ResumePreview templateId={templateId} />}
          </TabsContent>
        ) : (
          <TabsContent value="customise">
            Customise resume templates
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
};

export default Edit;
