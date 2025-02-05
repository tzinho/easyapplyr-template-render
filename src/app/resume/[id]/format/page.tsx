import { api } from "~/trpc/server";
import { type Resume } from "~/types/template";
import { TemplatePreview } from "~/app/_components/template-preview";

interface FormatProps {
  params: Promise<{ id: string }>;
}

export default async function Format({ params }: FormatProps) {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;
  return <TemplatePreview data={data} />;
}
