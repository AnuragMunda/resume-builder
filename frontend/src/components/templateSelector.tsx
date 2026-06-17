"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/hooks/store";
import { RESUME_TEMPLATES } from "@/utils/templates";
import { TemplatePreview } from "@/components/miniPreview";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  variant: "grid" | "buttons";
}

const GridSelector = () => {
  const currentTemplateId = useResumeStore((state) => state.templateId);
  const setTemplate = useResumeStore((state) => state.setTemplate);

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {RESUME_TEMPLATES.map((template) => {
        const isSelected = currentTemplateId === template.id;
        return (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isSelected
                ? "ring-2 ring-primary"
                : "hover:ring-2 hover:ring-primary/50"
            }`}
            onClick={() => setTemplate(template.id)}
          >
            <div className="flex items-center justify-center bg-gray-50 py-4">
              <TemplatePreview styles={template.styles} />
            </div>
            <CardContent className="relative p-3">
              {isSelected && (
                <div className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" />
                </div>
              )}
              <div className="text-sm font-medium">{template.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {template.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const ButtonSelector = () => {
  const currentTemplateId = useResumeStore((state) => state.templateId);
  const setTemplate = useResumeStore((state) => state.setTemplate);

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {RESUME_TEMPLATES.map((template) => {
        const isSelected = currentTemplateId === template.id;
        return (
          <Button
            key={template.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className="flex shrink-0 items-center gap-2 cursor-pointer"
            onClick={() => setTemplate(template.id)}
          >
            <div
              className="size-3 rounded-full"
              style={{ backgroundColor: template.styles.primaryColor }}
            />
            {template.name}
            {isSelected && <Check className="size-3" />}
          </Button>
        );
      })}
    </div>
  );
};

const TemplateSelector = ({ variant }: TemplateSelectorProps) => {
  if (variant === "buttons") {
    return <ButtonSelector />;
  }
  return <GridSelector />;
};

export default TemplateSelector;
