import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";

interface SummaryProps {
  params: Promise<{ id: string }>;
}

const Summary = async ({ params }: SummaryProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;
  return null;
};

export default Summary;
