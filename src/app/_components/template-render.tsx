"use client";

import { useForm } from "react-hook-form";

import { Simple } from "../_templates/simple";
import { Form } from "~/components/ui/form";

interface TemplateRenderProps {
  isPreview?: boolean;
  defaultValues: Record<string, any>;
}

export const TemplateRender = ({
  isPreview,
  defaultValues,
}: TemplateRenderProps) => {
  const form = useForm({
    mode: "onBlur",
    defaultValues,
  });

  console.log("defaultValues", defaultValues);

  return (
    <Form {...form}>
      <form>
        <Simple isPreview={isPreview} />
      </form>
    </Form>
  );
};
