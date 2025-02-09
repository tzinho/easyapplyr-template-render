"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { summarySchema, type SummarySchema } from "~/validators";

export const SummaryForm = ({ data }: any) => {
  const params = useParams<{ id: string }>();
  const form = useForm<SummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues: data,
  });

  console.log("d", data);

  const updateSummaryMutation = api.summary.create.useMutation({
    onSuccess() {
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
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Textarea name="text" label="Sumário" />
        <ButtonLoading isLoading={updateSummaryMutation.isPending}>
          Salvar
        </ButtonLoading>
      </form>
    </Form>
  );
};
