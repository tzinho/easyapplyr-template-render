import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";
import { List } from "./_components/list";
import { TemplatePreview } from "~/app/_components/template-preview";

interface ExperiencesProps {
  params: Promise<{ id: string }>;
}

const Experiences = async ({ params }: ExperiencesProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;

  return (
    <div className="flex justify-between gap-10">
      <List />
      <TemplatePreview templateId={data.templateId} data={data} resumeId={id} />
    </div>
  );
};

export default Experiences;
