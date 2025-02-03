import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";

interface CourseworksProps {
  params: Promise<{ id: string }>;
}

const Courseworks = async ({ params }: CourseworksProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;
  return null;
};

export default Courseworks;
