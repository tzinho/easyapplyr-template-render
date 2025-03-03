"use client";

import { ListOfResumeTemplates } from "~/app/_components/list-of-resume-templates";
import { PageContent } from "~/components/page";

export const Body = () => {
  return (
    <PageContent className="md:px-6">
      <ListOfResumeTemplates />
    </PageContent>
  );
};
