"use client";

import React from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { type Summary } from "~/stores/resume-store";
import { api } from "~/trpc/react";
import { type SummarySchema } from "~/validators/summary";
import { Textarea } from "~/components/form/textarea";
import { useResumeStore } from "~/providers/resume-store-provider";
import { AIWriter } from "./ai-writer";

export const PageForm = ({ defaultValues }: { defaultValues: Summary }) => {
  const params = useParams<{ id: string }>();

  const form = useForm({
    defaultValues: {
      ...defaultValues,
      highlights: "",
    },
  });

  const setSummary = useResumeStore((state) => state.setSummary);

  const updateSummary = api.summary.create.useMutation({
    onSuccess: () => toast.success("Sumário salvo com sucesso!"),
  });

  const handleOnSubmit: SubmitHandler<SummarySchema> = async (values) => {
    setSummary(values);
    await updateSummary.mutateAsync({
      resumeId: params.id,
      ...values,
    });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-1 flex-col"
        >
          <Textarea
            name="text"
            label="Escreva o melhor sumário possível"
            placeholder="Experiente executivo global em estágio inicial com graduação em economia e matemática da Universidade de Wisconsin. Paixão por construir empresas inspiradoras que as pessoas adoram por meio de design, desenvolvimento, branding e grandes apostas."
            rows={4}
          />
          <ButtonLoading
            isLoading={updateSummary.isPending}
            className="self-end"
          >
            Salvar suas informações
          </ButtonLoading>
        </form>
        <AIWriter />
      </div>
    </Form>
  );
};
