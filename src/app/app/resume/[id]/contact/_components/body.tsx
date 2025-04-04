"use client";

import { PageContentTwoSections } from "~/components/page";
import { PageForm } from "./form";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);

  if (!resumeTemplate) return null;

  return (
    <PageContentTwoSections>
      {resumeTemplate && <PageForm defaultValues={resumeTemplate.contact} />}
    </PageContentTwoSections>
  );
};
