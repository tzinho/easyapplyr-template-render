"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type InferSelectModel } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { Textarea } from "~/components/form/textarea";
import { type educations } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { educationSchema, type EducationSchema } from "~/validators";

export const EducationEditForm = ({
  data,
}: {
  data: InferSelectModel<typeof educations>;
}) => {
  const router = useRouter();
  const { id, educationId } = useParams<{ id: string; educationId: string }>();
  const utils = api.useUtils();

  const handleOnClick = () => router.back();

  const updateEducationMutation = api.educations.update.useMutation({
    onSuccess: () => {
      toast.success("Educação salva com sucesso!");
      void utils.educations.invalidate();
      router.push(`/app/resume/${id}/educations`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<EducationSchema>({
    defaultValues: data,
    resolver: zodResolver(educationSchema),
  });

  const handleOnSubmit: SubmitHandler<EducationSchema> = async (d) => {
    const { institution, description, ...rest } = d;
    await updateEducationMutation.mutateAsync({
      id: educationId,
      institution: institution ?? undefined,
      description: description ?? undefined,
      ...rest,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input
          name="degree"
          label="Grau"
          description="Qual é o seu diploma ou outra qualificação?"
          required
        />
        <Input
          name="institution"
          label="Instituição"
          description="Qual a instituição de ensino?"
        />
        <Textarea
          name="description"
          label="Descrição"
          description="Descreva aqui informações adicionais"
          rows={4}
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="destructive" onClick={handleOnClick}>
            Cancelar
          </Button>
          <ButtonLoading
            type="submit"
            isLoading={updateEducationMutation.isPending}
          >
            Salvar
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
};
