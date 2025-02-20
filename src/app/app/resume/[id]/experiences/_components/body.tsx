"use client";

import { useParams } from "next/navigation";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { Handler } from "./handler";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const experiences = api.experiences.list.useQuery({ resumeId: id });

  if (experiences.isLoading) return <PageLoading />;

  return (
    <PageContentEditor>
      <Handler defaultValues={experiences.data!} />
    </PageContentEditor>
  );
};
