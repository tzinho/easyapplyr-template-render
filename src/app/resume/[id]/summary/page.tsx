"use client";

import { SummaryForm } from "./_components/form";
import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";

const Summary = () => {
  const { resume: resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <div className="flex justify-between gap-10">
      <SummaryForm data={resumeTemplate.summary} />
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview={true} />
    </div>
  );
};

export default Summary;
