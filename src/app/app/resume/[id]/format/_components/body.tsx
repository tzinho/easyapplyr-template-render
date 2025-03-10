"use client";

import { PageContent } from "~/components/page";
import { TemplatePreview } from "~/app/_components/template-preview";
import { Toolbar } from "../../../_components/toolbar";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);

  return (
    <PageContent
      className="flex h-full flex-col items-center justify-center"
      isLoading={!resumeTemplate}
    >
      <Toolbar />
      <div className="mx-auto min-h-[1122.519685px] w-[793.7px] bg-red-100">
        {/* <div className="mx-auto min-h-[1122.519685px] w-[793.7px] scale-[0.412918] bg-red-100"> */}
        <TemplatePreview resumeTemplate={resumeTemplate!} />
      </div>
    </PageContent>
  );
};
