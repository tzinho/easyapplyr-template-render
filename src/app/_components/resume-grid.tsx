"use client";

import { useState } from "react";

import { type Resume } from "~/types/template";
import { api } from "~/trpc/react";
import { DeleteResume } from "./dialog/delete-resume";
import { ResumePreview } from "./resume";

export const ResumeGrid = () => {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const resumes = api.resumes.list.useQuery();

  return (
    <>
      {resumes?.data?.map((resume) => (
        <ResumePreview
          key={resume.id}
          resume={resume}
          onDelete={setSelectedResume}
          lastEdited="two hours ago"
        />
      ))}

      <DeleteResume
        open={!!selectedResume}
        onOpenChange={() => setSelectedResume(null)}
        resume={selectedResume}
      />
    </>
  );
};
