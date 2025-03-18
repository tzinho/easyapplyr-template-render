"use client";

import { PageContent } from "~/components/page";
import { TemplatePreview } from "~/app/_components/template-preview";
import { Toolbar } from "../../../_components/toolbar";
import { useResumeStore } from "~/providers/resume-store-provider";
import { ScalablePdfPreview } from "~/components/scalable-df-preview";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);

  return (
    <PageContent className="flex flex-col" isLoading={!resumeTemplate}>
      <Toolbar />
      <div className="container mx-auto max-w-5xl p-4">
        <ScalablePdfPreview>
          <TemplatePreview resumeTemplate={resumeTemplate!} />
        </ScalablePdfPreview>
      </div>
    </PageContent>
  );
};
