"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { useResumeStore } from "~/providers/resume-store-provider";
import { useStore } from "~/store";
import { useIsMobile } from "~/hooks/use-mobile";
import { PageLoading } from "~/components/page-loading";

export default function ResumeLayoutEdit({ children }: PropsWithChildren) {
  console.log("[ResumeLayoutEdit]");

  const params = useParams<{ id: string }>();
  const state = useResumeStore((state) => state);
  const { setIsSidebarCollapse } = useStore();
  const isMobile = useIsMobile();

  const resume = api.resumes.get.useQuery(params.id);

  useEffect(() => {
    // if (resume.data) setResumeTemplate(resume.data as unknown as Resume);
  }, [resume.isLoading, resume.data]);

  useEffect(() => {
    if (isMobile !== undefined) setIsSidebarCollapse(!isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <div className="flex flex-col gap-3">
      {resume.isLoading ? <PageLoading /> : children}
    </div>
  );
}
