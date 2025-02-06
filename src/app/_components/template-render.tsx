"use client";

import { useForm } from "react-hook-form";

import { Template } from "../_templates/simple";
import { Form } from "~/components/ui/form";

interface TemplateRenderProps {
  data: Record<string, any>;
}

export const TemplateRender = ({ data }: TemplateRenderProps) => {
  const form = useForm({
    mode: "onBlur",
    defaultValues: data,
  });

  return (
    <Form {...form}>
      <form>
        <Template />
      </form>
    </Form>
  );
};
