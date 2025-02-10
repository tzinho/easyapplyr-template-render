"use client";

import { SummaryForm } from "./_components/form";
import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";

const Summary = () => {
  const { resume } = useResumeStore((state) => state);

  if (!resume) return null;

  return (
    <div className="flex justify-between gap-10">
      <SummaryForm data={resume.summary} />
      <TemplatePreview data={resume} isPreview />
    </div>
  );
};

export default Summary;
