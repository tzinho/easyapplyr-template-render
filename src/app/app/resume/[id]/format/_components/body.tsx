"use client";

import { PageContent } from "~/components/page";
import { TemplatePreview } from "~/app/_components/template-preview";
import { useResumeStore } from "~/providers/resume-store-provider";
import { ScalablePdfPreview } from "~/components/scalable-df-preview";
import { Toolbar } from "../../../_components/toolbar";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);
  // A4     - 210mm   x 297mm
  // Letter - 215.9mm x 279.4mm

  return (
    <PageContent className="flex flex-col" isLoading={!resumeTemplate}>
      <Toolbar />
      <div className="container mx-auto max-w-5xl bg-gray-100 p-4">
        <ScalablePdfPreview>
          <TemplatePreview resumeTemplate={resumeTemplate!} />
        </ScalablePdfPreview>
      </div>
    </PageContent>
  );
};
