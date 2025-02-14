"use client";

import { useState } from "react";

import { type Resume } from "~/stores/resume-store";
import { api } from "~/trpc/react";
import { ResumePreview } from "./resume-preview";
import { AlertToDeleteAResume } from "./alert-to-delete-a-resume";
import { ModalToCreateAResume } from "./modal-to-create-a-resume";

export const ListOfResumeTemplates = () => {
  const [selectedResumeTemplate, setSelectedResumeTemplate] =
    useState<Resume | null>(null);
  const resumesTemplates = api.resumes.list.useQuery();

  if (resumesTemplates.isLoading) return <h1>Carregando...</h1>;

  return (
    <div className="grid grid-cols-1 justify-items-center gap-3 md:grid-cols-2 lg:grid-cols-4">
      <ModalToCreateAResume />
      {resumesTemplates.data?.map((resumeTemplate) => (
        <ResumePreview
          key={resumeTemplate.id}
          resumeTemplate={resumeTemplate as unknown as Resume}
          onDelete={setSelectedResumeTemplate}
          onDuplicate={() => console.log("duplicate")}
        />
      ))}

      <AlertToDeleteAResume
        open={!!selectedResumeTemplate}
        onOpenChange={() => setSelectedResumeTemplate(null)}
        resumeTemplate={selectedResumeTemplate}
      />
    </div>
  );
};
