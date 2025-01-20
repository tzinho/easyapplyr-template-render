"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { CardResume } from "./card/resume";
import { DeleteResume } from "./dialog/delete-resume";
import { type Resume } from "~/types/template";

export const ResumeGrid = () => {
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const resumes = api.resume.list.useQuery();

  return (
    <>
      {resumes?.data?.map((resume) => (
        <CardResume
          key={resume.id}
          resume={resume}
          setSelectedResume={setSelectedResume}
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
