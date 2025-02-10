"use client";

import { useForm } from "react-hook-form";

import { Form } from "~/components/ui/form";
import { type Resume } from "~/types/template";
import { getTemplate } from "~/lib/templates";

interface TemplateFormatProps {
  data: Resume;
  resumeId: string;
  templateId: string;
}

export const TemplateFormat = ({
  data,
  resumeId,
  templateId,
}: TemplateFormatProps) => {
  const form = useForm({
    mode: "onBlur",
    defaultValues: data,
  });

  const Template = getTemplate(templateId).component;

  return (
    <Form {...form}>
      <div className="flex-1">
        <Template resumeId={resumeId} />
      </div>
    </Form>
  );
};
