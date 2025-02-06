import { TemplatePreview } from "~/app/_components/template-preview";
import { List } from "./_components/list";
import { api } from "~/trpc/server";
import { type Resume } from "~/types/template";

interface EducationProps {
  params: Promise<{ id: string }>;
}

const Education = async ({ params }: EducationProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;

  return (
    <div className="flex justify-between gap-10">
      <List />
      <TemplatePreview templateId={data.templateId} data={data} />
    </div>
  );
};

export default Education;
