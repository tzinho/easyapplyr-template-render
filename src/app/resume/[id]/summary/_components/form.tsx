"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Summary } from "~/stores/resume-store";
import { api } from "~/trpc/react";
import { summarySchema, type SummarySchema } from "~/validators";

export const SummaryForm = () => {
  const params = useParams<{ id: string }>();

  const { resumeTemplate, setSummaryTemplate } = useResumeStore(
    (state) => state,
  );

  const form = useForm<SummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues: resumeTemplate?.summary,
  });

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
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex-1">
        <Textarea name="text" label="Sumário" rows={4} />
        <ButtonLoading isLoading={updateSummaryMutation.isPending}>
          Salvar
        </ButtonLoading>
      </form>
    </Form>
  );
};
