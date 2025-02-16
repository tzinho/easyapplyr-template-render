import { TemplatePreview } from "~/app/_components/template-preview";
import { useIsMobile } from "~/hooks/use-mobile";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const isMobile = useIsMobile();
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <div className="flex justify-between gap-10">
      {/* <List /> */}
      {!isMobile && (
        <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
      )}
    </div>
  );
};
