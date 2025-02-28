"use client";

import { useParams } from "next/navigation";

import { PageContent } from "~/components/page";
import { SummaryForm } from "./form";
import { api } from "~/trpc/react";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const summary = api.summary.get.useQuery(params.id);

  if (summary.isLoading) return <PageLoading />;

  return (
    <PageContent>
      <SummaryForm defaultValues={summary.data!} />
    </PageContent>
  );
};
