"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type InferSelectModel } from "drizzle-orm";
import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Textarea } from "~/components/form/textarea";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type summaries } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { summarySchema, type SummarySchema } from "~/validators";

export const SummaryForm = ({
  data,
}: {
  data: InferSelectModel<typeof summaries>;
}) => {
  const params = useParams<{ id: string }>();

  const { resume, setResume } = useResumeStore((state) => state);

  console.log("resume", resume);
  const form = useForm<SummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues: data,
  });

  const updateSummaryMutation = api.summary.create.useMutation({
    onSuccess(_, variables) {
      setResume({ ...resume, summary: { ...resume?.summary, ...variables } });
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
        <Textarea name="text" label="Sumário" />
        <ButtonLoading isLoading={updateSummaryMutation.isPending}>
          Salvar
        </ButtonLoading>
      </form>
    </Form>
  );
};
