"use client";

import { PageContent } from "~/components/page";
import { EducationCreateForm } from "./form";
import { Insights } from "./insights";

export const Body = () => {
  return (
    <PageContent>
      <div className="flex gap-5">
        <div className="flex-1">
          <EducationCreateForm />
        </div>
        <Insights />
      </div>
    </PageContent>
  );
};
