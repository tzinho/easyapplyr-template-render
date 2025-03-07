"use client";

import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { PageContentTwoSections } from "~/components/page";
import { PageForm } from "./form";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const responseAPI = api.contact.get.useQuery(params.id);

  return (
    <PageContentTwoSections
      isLoading={responseAPI.isLoading}
      isError={responseAPI.isError}
    >
      <PageForm defaultValues={responseAPI.data!} />
    </PageContentTwoSections>
  );
};
