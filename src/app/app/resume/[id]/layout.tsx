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
  const setResumeTemplate = useResumeStore((state) => state.setResumeTemplate);
  const { setIsSidebarCollapse } = useStore();
  const isMobile = useIsMobile();

  const responseAPI = api.resumes.get.useQuery(params.id);

  useEffect(() => {
    if (responseAPI.data) setResumeTemplate(responseAPI.data);
  }, [responseAPI.isLoading, responseAPI.data]);

  useEffect(() => {
    if (isMobile !== undefined) setIsSidebarCollapse(!isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <div className="flex flex-col gap-3">
      {responseAPI.isLoading ? <PageLoading /> : children}
    </div>
  );
}
