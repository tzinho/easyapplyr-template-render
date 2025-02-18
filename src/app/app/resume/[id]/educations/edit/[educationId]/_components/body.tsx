"use client";

import { useParams } from "next/navigation";
import { PageContent } from "~/components/page";

import { api } from "~/trpc/react";
import { EducationEditForm } from "./form";

export const Body = () => {
  const { educationId } = useParams<{ educationId: string }>();
  const education = api.educations.get.useQuery(educationId);

  if (education.isLoading) return null;

  return (
    <PageContent>
      <div className="flex gap-5">
        <div className="flex-1">
          <EducationEditForm data={education.data!} />
        </div>
        <div className="flex-1">Insights</div>
      </div>
    </PageContent>
  );
};
