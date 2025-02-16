"use client";

import { TemplatePreview } from "~/app/_components/template-preview";
import { PageContentEditor } from "~/components/page";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <PageContentEditor>
      {/* <List /> */}
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </PageContentEditor>
  );
};
