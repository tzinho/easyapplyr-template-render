"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useParams } from "next/navigation";

import { api } from "~/trpc/react";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Resume } from "~/stores/resume-store";
import { useStore } from "~/store";
import { useIsMobile } from "~/hooks/use-mobile";
import { PageLoading } from "~/components/page-loading";

export default function Layout({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  const { setResumeTemplate } = useResumeStore((state) => state);
  const { setIsSidebarCollapse } = useStore();
  const isMobile = useIsMobile();

  const resume = api.resumes.get.useQuery(id);

  useEffect(() => {
    if (resume.data) setResumeTemplate(resume.data as unknown as Resume);
  }, [resume.isLoading, resume.data, setResumeTemplate]);

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
