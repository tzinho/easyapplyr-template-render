import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";
import { SummaryForm } from "./_components/form";

interface SummaryProps {
  params: Promise<{ id: string }>;
}

const Summary = async ({ params }: SummaryProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;

  return <SummaryForm data={data.summary} />;
};

export default Summary;
