"use client";

import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { PageContent } from "~/components/page";
import { TemplatePreview } from "~/app/_components/template-preview";
import { Toolbar } from "../../../_components/toolbar";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const responseAPI = api.resumes.get.useQuery(params.id);

  return (
    <PageContent
      className="flex h-full flex-col items-center justify-center"
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <Toolbar />
      <div className="mx-auto min-h-[1122.519685px] w-[793.7px] bg-red-100">
        <TemplatePreview resumeTemplate={responseAPI.data!} />
      </div>
    </PageContent>
  );
};
