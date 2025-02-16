"use client";

import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";
import { SummaryForm } from "./form";
import { PageContentEditor } from "~/components/page";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <PageContentEditor>
      <SummaryForm />
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </PageContentEditor>
  );
};
