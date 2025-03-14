"use client";

import { useState } from "react";

import { type Resume } from "~/stores/resume-store";
import { api } from "~/trpc/react";
import { ResumePreview } from "./resume-preview";
import { AlertToDeleteAResume } from "./alert-to-delete-a-resume";
import { ModalToCreateAResume } from "./modal-to-create-a-resume";
import { Card, CardContent } from "~/components/ui/card";
import { PageLoading } from "~/components/page-loading";

export const ListOfResumeTemplates = () => {
  const [selectedResumeTemplate, setSelectedResumeTemplate] =
    useState<Resume | null>(null);
  const resumesTemplates = api.resumes.list.useQuery();

  if (resumesTemplates.isLoading) return <PageLoading />;

  return (
    <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ModalToCreateAResume>
        <Card className="flex h-[290px] w-[215.16px] cursor-pointer flex-col justify-between overflow-hidden border-dashed">
          <CardContent className="m-auto flex h-full w-full items-center justify-center">
            <span className="my-auto text-muted-foreground">
              Criar novo currículo
            </span>
          </CardContent>
        </Card>
      </ModalToCreateAResume>

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
