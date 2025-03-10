"use client";

import { useEffect, type PropsWithChildren } from "react";
import { PageLoading } from "~/components/page-loading";

import { useIsMobile } from "~/hooks/use-mobile";
import { useResumeStore } from "~/providers/resume-store-provider";
import { useStore } from "~/store";
import { type Resume } from "~/stores/resume-store";

interface WrapperProps extends PropsWithChildren {
  resumeTemplate: Resume | null;
}

export const Wrapper = ({ children, resumeTemplate }: WrapperProps) => {
  const { setIsSidebarCollapse } = useStore();
  const isMobile = useIsMobile();
  const setResumeTemplate = useResumeStore((state) => state.setResumeTemplate);

  useEffect(() => {
    if (isMobile !== undefined) setIsSidebarCollapse(!isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (resumeTemplate) {
      setResumeTemplate(resumeTemplate);
    }
  }, [resumeTemplate]);

  if (!resumeTemplate) return <PageLoading />;

  return children;
};
