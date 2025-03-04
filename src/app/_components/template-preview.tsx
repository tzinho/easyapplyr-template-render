"use client";

import { getTemplate } from "~/lib/templates";
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
  //<div className="h-[600px] w-full flex justify-center overflow-auto bg-gray-100 p-4">
  return (
    <div className="flex-1">
      <Template resumeTemplate={resumeTemplate} isPreview={isPreview} />
    </div>
  );
};
