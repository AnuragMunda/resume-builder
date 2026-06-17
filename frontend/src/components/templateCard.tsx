"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ResumeTemplate } from "@/utils/types";
import { TemplatePreview } from "@/components/miniPreview";

interface TemplateCardProps {
  template: ResumeTemplate;
  onSelect: () => void;
}

const TemplateCard = ({ template, onSelect }: TemplateCardProps) => {
  return (
    <Card
      className="cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 hover:shadow-lg"
      onClick={onSelect}
    >
      <div className="flex items-center justify-center bg-gray-50 py-6">
        <TemplatePreview styles={template.styles} />
      </div>
      <CardContent>
        <CardTitle className="text-lg">{template.name}</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          {template.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
