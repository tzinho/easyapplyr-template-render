"use client";

import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { PageContentEditor } from "~/components/page";
import { api } from "~/trpc/react";
import { Handler } from "./handler";

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const experiences = api.experiences.list.useQuery({ resumeId: id });

  if (experiences.isLoading)
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin" />
        <h1>Carregando ...</h1>
      </div>
    );

  return (
    <PageContentEditor>
      <Handler defaultValues={experiences.data} />
    </PageContentEditor>
  );
};
