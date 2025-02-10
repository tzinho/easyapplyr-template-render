"use client";

import { Body } from "./_components/body";
import { useResumeStore } from "~/providers/resume-store-provider";

const Skills = () => {
  const { resume } = useResumeStore((state) => state);

  if (!resume) return null;

  return <Body resume={resume} />;
};

export default Skills;
