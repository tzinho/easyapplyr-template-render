import { type Resume } from "~/types/template";
import { api } from "~/trpc/server";

import { Body } from "./_components/body";

interface SkillsProps {
  params: Promise<{ id: string }>;
}

const Skills = async ({ params }: SkillsProps) => {
  const { id } = await params;
  const data = (await api.resumes.get(id)) as Resume;

  return <Body resumeId={id} data={data} />;
};

export default Skills;
