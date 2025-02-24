"use client";

import { createContext, type ReactNode, type PropsWithChildren } from "react";
// import { useIsMobile } from "~/hooks/use-mobile";

import { getTemplate } from "~/lib/templates";
import { cn } from "~/lib/utils";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Resume } from "~/stores/resume-store";

interface TemplatePreviewProps {
  isPreview?: boolean;
  resumeTemplate: Resume;
}

type ResumeApi = {
  resumeTemplate: Resume | null;
};

const ResumeContext = createContext<ResumeApi | undefined>(undefined);

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  return (
    <ResumeContext.Provider value={{ resumeTemplate: null }}>
      {children}
    </ResumeContext.Provider>
  );
};

interface WrapperProps extends PropsWithChildren {
  isPreview: boolean;
}

export const Wrapper = ({ isPreview, children }: WrapperProps) => {
  const { resumeTemplate } = useResumeStore((state) => state);

  if (isPreview) {
    return null;
  }

  return children;
};

export const TemplatePreview = ({
  resumeTemplate,
  isPreview,
}: TemplatePreviewProps) => {
  // const isMobile = useIsMobile();

  const Template = getTemplate(resumeTemplate.templateId).component;

  // if (isMobile) return null;

  return (
    <div className={cn("flex-1", isPreview && "pointer-events-none")}>
      <Template resumeTemplate={resumeTemplate} />
    </div>
  );
};
