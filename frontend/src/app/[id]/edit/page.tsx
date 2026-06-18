"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/editor/editor";
import ResumePreview from "@/components/resumePreview";
import TemplateSelector from "@/components/templateSelector";
import ExportPdfButton from "@/components/exportPdfButton";
import AiCritiquePanel from "@/components/aiCritiquePanel";
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
import { fetchCritique } from "@/utils/api";
import type { ResumeCritique } from "@/utils/types";
import {
  ArrowLeft,
  Palette,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

const Edit = () => {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;
  const loadResume = useResumeStore((state) => state.loadResume);
  const templateId = useResumeStore((state) => state.templateId);
  const personalDetails = useResumeStore((state) => state.personalDetails);
  const summary = useResumeStore((state) => state.summary);
  const workExperience = useResumeStore((state) => state.workExperience);
  const educationHistory = useResumeStore((state) => state.educationHistory);
  const skills = useResumeStore((state) => state.skills);
  const isSmallerDevice = useMediaQuery("(max-width: 1023px)");
  const [showCustomiseSheet, setShowCustomiseSheet] = useState(false);
  const [showCritiqueSheet, setShowCritiqueSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(
    isSmallerDevice ? "preview" : "edit",
  );
  const [critique, setCritique] = useState<ResumeCritique | null>(null);
  const [isCritiquing, setIsCritiquing] = useState(false);
  const [critiqueError, setCritiqueError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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

  const handleCritique = useCallback(async () => {
    setIsCritiquing(true);
    setCritiqueError(null);
    setCritique(null);

    try {
      const data = await fetchCritique({
        personalDetails,
        summary,
        workExperience,
        educationHistory,
        skills,
      });
      setCritique(data.critique);
      setShowCritiqueSheet(true);
    } catch (err) {
      setCritiqueError(
        err instanceof Error ? err.message : "Failed to get AI critique",
      );
      setShowCritiqueSheet(true);
    } finally {
      setIsCritiquing(false);
    }
  }, [personalDetails, summary, workExperience, educationHistory, skills]);

  const critiqueButton = (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 cursor-pointer"
      onClick={handleCritique}
      disabled={isCritiquing}
    >
      {isCritiquing ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {isCritiquing ? "Analyzing..." : "AI Critique"}
    </Button>
  );

  return (
    <section>
      <div className="flex items-center px-5 pt-5">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => router.push("/")}
          className="gap-1.5 cursor-pointer mb-2 md:mb-0"
        >
          <ArrowLeft className="size-4" />
          Home
        </Button>
        {!isSmallerDevice && (
          <div className="ml-auto flex items-center gap-2">
            {critiqueButton}
            <ExportPdfButton previewRef={previewRef} />
          </div>
        )}
      </div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="px-5 flex items-center"
      >
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
              {templateId && (
                <ResumePreview ref={previewRef} templateId={templateId} />
              )}
            </div>
            <div className="sticky bottom-0 flex items-center justify-center gap-3 border-t bg-background/80 backdrop-blur-sm p-4">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 cursor-pointer"
                onClick={() => setShowCustomiseSheet(true)}
              >
                <Palette className="size-4" />
                Customise Template
              </Button>
              <ExportPdfButton previewRef={previewRef} variant="icon" />
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={handleCritique}
                disabled={isCritiquing}
              >
                {isCritiquing ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
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
          <TabsContent value="customise" className="w-full" forceMount>
            <div className="flex h-full gap-6">
              <div className="w-[50%] p-8 overflow-auto">
                <TemplateSelector variant="grid" />
              </div>
              <div className="flex-1 overflow-auto">
                {templateId && (
                  <ResumePreview ref={previewRef} templateId={templateId} />
                )}
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      <Sheet open={showCritiqueSheet} onOpenChange={setShowCritiqueSheet}>
        <SheetContent
          side={isSmallerDevice ? "bottom" : "right"}
          className={isSmallerDevice ? "" : "w-[480px] sm:w-[540px]"}
          style={isSmallerDevice ? { height: "70vh" } : undefined}
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-purple-500" />
              AI Resume Critique
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">                      
            {critiqueError ? (
              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <AlertCircle className="size-10 text-red-500" />
                <p className="text-sm text-muted-foreground">{critiqueError}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCritique}
                  disabled={isCritiquing}
                >
                  Try Again
                </Button>
              </div>
            ) : critique ? (
              <div className="mt-5">
                <AiCritiquePanel critique={critique} />
              </div>
            ) : (
              <div className="mt-10 flex justify-center">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Edit;
