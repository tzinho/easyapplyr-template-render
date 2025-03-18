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
  return <Template resumeTemplate={resumeTemplate} isPreview={isPreview} />;
};
