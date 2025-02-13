import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";
import { SummaryForm } from "./form";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <div className="flex justify-between gap-10">
      <SummaryForm />
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview={true} />
    </div>
  );
};
