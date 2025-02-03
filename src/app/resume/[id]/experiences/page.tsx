import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";

interface ExperiencesProps {
  params: Promise<{ id: string }>;
}

const Experiences = async ({ params }: ExperiencesProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;
  return null;
};

export default Experiences;
