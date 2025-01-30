"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { summarySchema, type SummarySchema } from "~/validators";
import { Textarea } from "~/components/form/textarea";
import { TemplateRender } from "~/app/_components/template-render";

interface SummaryFormProps<T extends FieldValues> {
  handleSubmit: SubmitHandler<T>;
}

function SummaryForm({ handleSubmit }: SummaryFormProps<SummarySchema>) {
  const form = useForm<SummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
      >
        <Textarea
          placeholder="Executivo global experiente em estágios iniciais com formação em economia e matemática pela Universidade de Wisconsin. Apaixonado por construir empresas inspiradoras que as pessoas amam, através de design, desenvolvimento, branding e a realização de grandes apostas."
          name="summary"
          label="Escreve seu sumário"
        />

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}

export default function Experiences() {
  const handleSubmit: SubmitHandler<SummarySchema> = (data) => {
    console.log("data", data);
  };

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <SummaryForm handleSubmit={handleSubmit} />
        <TemplateRender />
      </div>
    </div>
  );
}
