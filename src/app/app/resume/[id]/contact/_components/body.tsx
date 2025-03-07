"use client";

import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { PageContentTwoSections } from "~/components/page";
import { PageForm } from "./form";
import { useResumeStore } from "~/providers/resume-store-provider";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const responseAPI = api.contact.get.useQuery(params.id);
  const resumeTemplate = useResumeStore((state) => state.resumeTemplate);

  console.log("[state]: ", responseAPI.isLoading, resumeTemplate);

  return (
    <PageContentTwoSections
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <PageForm defaultValues={responseAPI.data!} />
    </PageContentTwoSections>
  );
};
