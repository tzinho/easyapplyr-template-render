"use client";

import { useResumeStore } from "~/providers/resume-store-provider";
import { TemplatePreview } from "~/app/_components/template-preview";
import { List } from "./list";
import { PageContentEditor } from "~/components/page";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <PageContentEditor>
      <List />
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </PageContentEditor>
  );
};
