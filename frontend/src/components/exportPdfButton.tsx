"use client";

import { RefObject, useState } from "react";
import { Button } from "@/components/ui/button";
import { exportPdf } from "@/utils/exportPdf";
import { Download, Loader2 } from "lucide-react";

interface ExportPdfButtonProps {
  previewRef: RefObject<HTMLDivElement | null>;
  variant?: "default" | "icon";
}

const ExportPdfButton = ({
  previewRef,
  variant = "default",
}: ExportPdfButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isExporting) return;

    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      await exportPdf(previewRef.current, "resume.pdf");
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 cursor-pointer"
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {variant !== "icon" ? "Download PDF" : "Download"}
    </Button>
  );
};

export default ExportPdfButton;
