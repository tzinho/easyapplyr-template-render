"use client";

import { ContactForm } from "./_components/form";
import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";

const Contact = () => {
  const { resume: resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <div className="flex justify-between gap-10">
      <ContactForm data={resumeTemplate.contact} />
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </div>
  );
};

export default Contact;
