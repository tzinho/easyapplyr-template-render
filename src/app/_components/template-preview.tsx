"use client";

import { useForm } from "react-hook-form";

import { Form } from "~/components/ui/form";
import { type Resume } from "~/types/template";
import { getTemplate } from "~/lib/templates";
import { cn } from "~/lib/utils";
import { useResumeStore } from "~/providers/resume-store-provider";

interface TemplatePreviewProps {
  data: Resume;
  isPreview?: boolean;
}

export const TemplatePreview = ({ data, isPreview }: TemplatePreviewProps) => {
  const { resume } = useResumeStore((state) => state);

  const form = useForm({
    mode: "onBlur",
    defaultValues: data,
  });

  if (!resume) return null;

  const Template = getTemplate(resume.templateId).component;

  return (
    <Form {...form}>
      <div className={cn("flex-1 border", isPreview && "pointer-events-none")}>
        <Template resumeId={resume.id} />
      </div>
    </Form>
  );
};
