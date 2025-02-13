import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <div className="flex justify-between gap-10">
      {/* <List /> */}
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </div>
  );
};
