"use client";

import { useForm } from "react-hook-form";

import { Simple } from "../_templates/simple";
import { Form } from "~/components/ui/form";
import { type Resume } from "~/types/template";

interface TemplatePreviewProps {
  data: Resume;
}

export const TemplatePreview = ({ data }: TemplatePreviewProps) => {
  const form = useForm({
    mode: "onBlur",
    defaultValues: data,
  });

  return (
    <Form {...form}>
      <Simple />
    </Form>
  );
};
