import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";

interface InvolvementsProps {
  params: Promise<{ id: string }>;
}

const Involvements = async ({ params }: InvolvementsProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;
  return null;
};

export default Involvements;
