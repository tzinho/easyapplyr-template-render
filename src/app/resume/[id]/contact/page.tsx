"use client";

import { ContactForm } from "./_components/form";
import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";

const Contact = () => {
  const { resume } = useResumeStore((state) => state);

  if (!resume) return null;

  return (
    <div className="flex justify-between gap-10">
      <ContactForm data={resume.contact} />
      <TemplatePreview data={resume} isPreview />
    </div>
  );
};

export default Contact;
