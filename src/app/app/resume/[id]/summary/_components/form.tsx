"use client";

import React from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Summary } from "~/stores/resume-store";
import { api } from "~/trpc/react";
import { type SummarySchema } from "~/validators/summary";
import { Textarea } from "~/components/form/textarea";

export const SummaryForm = ({ defaultValues }: { defaultValues: Summary }) => {
  const params = useParams<{ id: string }>();

  const { setSummaryTemplate } = useResumeStore((state) => state);

  const form = useForm({ defaultValues });

  const updateSummaryMutation = api.summary.create.useMutation({
    onSuccess(_, variables) {
      setSummaryTemplate(variables as Summary);
      toast.success("Sumário salvo com sucesso!");
    },
  });

  const handleOnSubmit: SubmitHandler<SummarySchema> = async (d) => {
    await updateSummaryMutation.mutateAsync({
      resumeId: params.id,
      ...d,
    });
  };

  return (
    <Form {...form}>
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
          isLoading={updateSummaryMutation.isPending}
          className="self-end"
        >
          Salvar suas informações
        </ButtonLoading>
      </form>
    </Form>
  );
};
