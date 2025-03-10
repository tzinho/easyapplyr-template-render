"use client";

import { PageContentTwoSections } from "~/components/page";
import { PageForm } from "./form";
import { AIWriter } from "./ai-writer";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);

  if (!resumeTemplate) return null;

  return (
    <PageContentTwoSections isLoading={!resumeTemplate}>
      <PageForm defaultValues={resumeTemplate.summary} />
      <AIWriter />
    </PageContentTwoSections>
  );
};
