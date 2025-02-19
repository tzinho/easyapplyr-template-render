"use client";

import { PageContentEditor } from "~/components/page";
import { ContactForm } from "./form";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return <h1>Carregando ...</h1>;

  return (
    <PageContentEditor>
      <ContactForm defaultValues={resumeTemplate?.contact} />
    </PageContentEditor>
  );
};
