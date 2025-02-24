"use client";

import { PageContentEditor } from "~/components/page";
import { SummaryForm } from "./form";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const params = useParams<{ id: string }>();
  const summary = api.summary.get.useQuery(params.id);

  if (summary.isLoading) return <PageLoading />;

  return (
    <PageContentEditor>
      <SummaryForm defaultValues={summary.data!} />
      <div className="flex-1">Insights</div>
    </PageContentEditor>
  );
};
