"use client";

import { TemplatePreview } from "~/app/_components/template-preview";
import { ChooseTemplate } from "~/components/choose-template";
import { useResumeStore } from "~/providers/resume-store-provider";

export default function Format() {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <>
      <TemplatePreview resumeTemplate={resumeTemplate} />
      <ChooseTemplate
        excludeTemplateId={resumeTemplate.templateId}
        resumeId={resumeTemplate.id}
      />
    </>
  );
}
