"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { DeleteResume } from "./dialog/delete-resume";
import { ResumePreview } from "./resume";
import { type ResumeActions } from "~/stores/resume-store";

export const ResumeTemplates = () => {
  const [selectedResumeTemplate, setSelectedResumeTemplate] =
    useState<ResumeActions | null>(null);
  const resumesTemplates = api.resumes.list.useQuery();

  if (resumesTemplates.isLoading) return null;

  return (
    <>
      {resumesTemplates?.data?.map((resumeTemplate) => (
        <ResumePreview
          key={resumeTemplate.id}
          resumeTemplate={resumeTemplate}
          onDelete={setSelectedResumeTemplate}
          onDuplicate={() => console.log("duplicate")}
        />
      ))}

      <DeleteResume
        open={!!selectedResumeTemplate}
        onOpenChange={() => setSelectedResumeTemplate(null)}
        resume={selectedResumeTemplate}
      />
    </>
  );
};
