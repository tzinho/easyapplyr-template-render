import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";
import { ContactForm } from "./form";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <div className="flex justify-between gap-10">
      <ContactForm />
      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </div>
  );
};
