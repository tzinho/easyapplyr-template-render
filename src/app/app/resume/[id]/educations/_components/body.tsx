"use client";

import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { HandlerList } from "./handler-list";
import { PageLoading } from "~/components/page-loading";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const educations = api.educations.list.useQuery({ resumeId: id });

  if (educations.isLoading) return <PageLoading />;

  const defaultValues = educations.data!.length
    ? educations.data!.map((education) => {
        const { id, ...rest } = education;
        return { ...rest, _id: education.id, activeIndex: uuidv4() };
      })
    : null;

  console.log("defaultValues", defaultValues);

  return (
    <PageContentEditor>
      <HandlerList defaultValues={defaultValues} />
    </PageContentEditor>
  );
};
