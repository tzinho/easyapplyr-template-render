import { PageContent } from "~/components/page";
import { TemplatePreview } from "~/app/_components/template-preview";
import { ChooseTemplate } from "~/components/choose-template";
import { useResumeStore } from "~/providers/resume-store-provider";
import { Toolbar } from "../../../_components/toolbar";

export const Body = () => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (!resumeTemplate) return null;

  return (
    <PageContent>
      <Toolbar />
      <TemplatePreview resumeTemplate={resumeTemplate} />
      <ChooseTemplate
        excludeTemplateId={resumeTemplate.templateId}
        resumeId={resumeTemplate.id}
      />
    </PageContent>
  );
};
