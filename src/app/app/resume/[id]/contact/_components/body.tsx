"use client";

import { PageContentEditor } from "~/components/page";
import { ContactForm } from "./form";
import { useResumeStore } from "~/providers/resume-store-provider";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return <PageLoading />;

  return (
    <PageContentEditor>
      <ContactForm defaultValues={resumeTemplate?.contact} />
    </PageContentEditor>
  );
};
