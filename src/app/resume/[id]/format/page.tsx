import { api } from "~/trpc/server";
import { type Resume } from "~/types/template";
import { TemplatePreview } from "~/app/_components/template-preview";
import { ChooseTemplate } from "~/components/choose-template";

interface FormatProps {
  params: Promise<{ id: string }>;
}

export default async function Format({ params }: FormatProps) {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;

  return (
    <>
      <TemplatePreview data={data} templateId={data.templateId} />
      <ChooseTemplate excludeTemplateId={data.templateId} resumeId={id} />
    </>
  );
}
