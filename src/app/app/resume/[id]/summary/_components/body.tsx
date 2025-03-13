"use client";

import { PageContent } from "~/components/page";
import { PageForm } from "./form";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);

  if (!resumeTemplate) return null;

  return (
    <PageContent isLoading={!resumeTemplate}>
      <PageForm defaultValues={resumeTemplate?.summary} />
    </PageContent>
  );
};
