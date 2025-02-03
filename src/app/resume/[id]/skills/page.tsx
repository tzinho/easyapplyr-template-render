import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";

interface SkillsProps {
  params: Promise<{ id: string }>;
}

const Skills = async ({ params }: SkillsProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;
  return null;
};

export default Skills;
