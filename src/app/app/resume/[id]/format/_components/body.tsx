"use client";

import { PageContent } from "~/components/page";
import { TemplatePreview } from "~/app/_components/template-preview";
import { Toolbar } from "../../../_components/toolbar";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const resume = api.resumes.get.useQuery(id);

  if (resume.isLoading) return <PageLoading />;

  return (
    <PageContent>
      <Toolbar />
      <TemplatePreview resumeTemplate={resume.data!} />
    </PageContent>
  );
};
