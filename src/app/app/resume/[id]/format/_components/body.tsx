"use client";

import { useParams } from "next/navigation";

import { PageContent } from "~/components/page";
import { TemplatePreview } from "~/app/_components/template-preview";
import { Toolbar } from "../../../_components/toolbar";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const resume = api.resumes.get.useQuery(id);

  if (resume.isLoading) return <PageLoading />;

  return (
    <PageContent className="flex h-full flex-col items-center justify-center">
      <Toolbar />
      <div className="mx-auto min-h-[1122.519685px] w-[793.7px] bg-red-100">
        <TemplatePreview resumeTemplate={resume.data!} />
      </div>
    </PageContent>
  );
};
