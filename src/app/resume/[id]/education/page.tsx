"use client";

import { TemplatePreview } from "~/app/_components/template-preview";
import { List } from "./_components/list";
import { useResumeStore } from "~/providers/resume-store-provider";

const Education = () => {
  const { resume } = useResumeStore((state) => state);

  if (!resume) return null;

  return (
    <div className="flex justify-between gap-10">
      <List />
      <TemplatePreview data={resume} isPreview />
    </div>
  );
};

export default Education;
