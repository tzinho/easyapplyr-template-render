"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { HandlerList } from "./handler-list";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const experiences = api.experiences.list.useQuery({ resumeId: id });

  if (experiences.isLoading) return <PageLoading />;

  const defaultValues = experiences.data!.length
    ? experiences.data!.map((experience) => {
        const { id, ...rest } = experience;
        return { ...rest, _id: experience.id, activeIndex: uuidv4() };
      })
    : null;

  return (
    <PageContentEditor>
      <HandlerList defaultValues={defaultValues} />
    </PageContentEditor>
  );
};
