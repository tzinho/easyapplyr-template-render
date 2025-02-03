import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";

interface ProjectsProps {
  params: Promise<{ id: string }>;
}

const Projects = async ({ params }: ProjectsProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;
  return null;
};

export default Projects;
