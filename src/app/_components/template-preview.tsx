"use client";

import { getTemplate } from "~/lib/templates";
import { cn } from "~/lib/utils";
import { type Resume } from "~/stores/resume-store";

interface TemplatePreviewProps {
  isPreview?: boolean;
  resumeTemplate: Resume;
}

export const TemplatePreview = ({
  resumeTemplate,
  isPreview,
}: TemplatePreviewProps) => {
  const Template = getTemplate(resumeTemplate.templateId).component;

  return (
    <div className={cn("flex-1 border", isPreview && "pointer-events-none")}>
      <Template resumeTemplate={resumeTemplate} />
    </div>
  );
};
