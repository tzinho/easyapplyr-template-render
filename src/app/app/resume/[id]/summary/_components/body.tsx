"use client";

import { PageContentEditor } from "~/components/page";
import { SummaryForm } from "./form";

export const Body = () => {
  return (
    <PageContentEditor>
      <SummaryForm />
      <div className="flex-1">Insights</div>
    </PageContentEditor>
  );
};
