import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";
import { ContactForm } from "./form";
import { useIsMobile } from "~/hooks/use-mobile";
import { PageContentEditor } from "~/components/page";

export const Body = () => {
  const isMobile = useIsMobile();
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <PageContentEditor>
      <ContactForm />
      {!isMobile && (
        <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
      )}
    </PageContentEditor>
  );
};
