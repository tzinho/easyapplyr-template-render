import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";
import { SummaryForm } from "./form";
import { useIsMobile } from "~/hooks/use-mobile";

export const Body = () => {
  const isMobile = useIsMobile();
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <div className="flex justify-between gap-10">
      <SummaryForm />
      {!isMobile && (
        <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
      )}
    </div>
  );
};
