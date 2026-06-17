"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/editor/editor";
import ResumePreview from "@/components/resumePreview";
import TemplateSelector from "@/components/templateSelector";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useResumeStore } from "@/hooks/store";
import { ArrowLeft, Palette } from "lucide-react";

const Edit = () => {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;
  const loadResume = useResumeStore((state) => state.loadResume);
  const templateId = useResumeStore((state) => state.templateId);
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");
  const [showCustomiseSheet, setShowCustomiseSheet] = useState(false);

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
      <Tabs defaultValue="edit" className="px-5 flex items-center">
        <TabsList className="w-full min-h-10 md:max-w-[20%] bg-neutral-800">
          <TabsTrigger
            className="md:text-md cursor-pointer text-white md:hover:text-neutral-400"
            value="edit"
          >
            Edit
          </TabsTrigger>
          {isSmallerDevice ? (
            <TabsTrigger
              value="preview"
              className="cursor-pointer text-white md:hover:text-neutral-400"
            >
              Preview
            </TabsTrigger>
          ) : (
            <TabsTrigger
              className="md:text-md cursor-pointer text-white md:hover:text-neutral-400"
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
          <TabsContent value="preview" className="w-full flex flex-col h-full">
            <div className="flex-1 overflow-auto pb-16">
              {templateId && <ResumePreview templateId={templateId} />}
            </div>
            <div className="sticky bottom-0 flex justify-center border-t bg-background/80 backdrop-blur-sm p-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer"
                onClick={() => setShowCustomiseSheet(true)}
              >
                <Palette className="size-4" />
                Customise Template
              </Button>
            </div>
            <Sheet
              open={showCustomiseSheet}
              onOpenChange={setShowCustomiseSheet}
            >
              <SheetContent side="bottom" className="h-[60vh]">
                <SheetHeader>
                  <SheetTitle>Choose Template</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-auto px-4 pb-4">
                  <TemplateSelector variant="buttons" />
                </div>
              </SheetContent>
            </Sheet>
          </TabsContent>
        ) : (
          <TabsContent value="customise" className="w-full">
            <div className="flex h-full gap-6">
              <div className="w-[50%] p-8 overflow-auto">
                <TemplateSelector variant="grid" />
              </div>
              <div className="flex-1 overflow-auto">
                {templateId && <ResumePreview templateId={templateId} />}
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
};

export default Edit;
