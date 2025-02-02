"use client";

import { useParams } from "next/navigation";

import { TemplateRender } from "~/app/_components/template-render";
import { List } from "./_components/list";
import { api } from "~/trpc/react";

export default function Education() {
  const params = useParams<{ id: string }>();

  const resume = api.resume.get.useQuery(params.id);

  if (resume.isLoading) return null;

  return (
    <div className="flex justify-between gap-10">
      <List />
      <TemplateRender isPreview={true} defaultValues={resume.data} />
    </div>
  );
}
