"use client";

import { useForm } from "react-hook-form";

import { Form } from "~/components/ui/form";
import { type Resume } from "~/types/template";
import { getTemplate } from "~/lib/templates";

interface TemplatePreviewProps {
  data: Resume;
  templateId: string;
}

export const TemplatePreview = ({ data, templateId }: TemplatePreviewProps) => {
  const form = useForm({
    mode: "onBlur",
    defaultValues: data,
  });

  const Template = getTemplate(templateId).component;

  return (
    <Form {...form}>
      <Template />
    </Form>
  );
};
