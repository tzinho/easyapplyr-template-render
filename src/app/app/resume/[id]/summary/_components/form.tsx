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
import { type SummarySchema } from "~/validators";
import { TextareaList } from "~/components/form/textarea-list";

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
        <TextareaList name="text" label="Sumário" placeholder="Sumário" />
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
