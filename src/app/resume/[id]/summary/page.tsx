"use client";

import { useParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import { summarySchema, type SummarySchema } from "~/validators";
import { Textarea } from "~/components/form/textarea";
import { TemplateRender } from "~/app/_components/template-render";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { ButtonLoading } from "~/components/ui/button-loading";

function SummaryForm({ data }: any) {
  const { id } = useParams<{ id: string }>();
  const updateSummary = api.summary.create.useMutation({
    onSuccess() {
      toast.success("Sumário editado com sucesso!");
    },
    onError() {
      toast.error("Ocorreu um erro ao tentar editar o sumário!");
    },
  });

  const handleOnSubmit = async (d) => {
    await updateSummary.mutateAsync({ ...d, resumeId: id });
  };

  const form = useForm<SummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues: data,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="w-full space-y-6"
      >
        <Textarea
          placeholder="Executivo global experiente em estágios iniciais com formação em economia e matemática pela Universidade de Wisconsin. Apaixonado por construir empresas inspiradoras que as pessoas amam, através de design, desenvolvimento, branding e a realização de grandes apostas."
          name="text"
          label="Escreve seu sumário"
        />

        <ButtonLoading type="submit" isLoading={updateSummary.isPending}>
          Salvar
        </ButtonLoading>
      </form>
    </Form>
  );
}

export default function Summary() {
  const params = useParams<{ id: string }>();

  const resume = api.resume.get.useQuery(params.id);

  if (resume.isLoading) return null;

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <SummaryForm data={resume.data?.summary} />
        <TemplateRender defaultValues={resume.data} />
      </div>
    </div>
  );
}
