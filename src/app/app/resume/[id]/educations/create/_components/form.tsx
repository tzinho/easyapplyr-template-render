"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "~/components/form/input";
import { Textarea } from "~/components/form/textarea";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { educationSchema, type EducationSchema } from "~/validators";

export const EducationCreateForm = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
  });

  const educationCreateMutation = api.educations.create.useMutation({
    onSuccess() {
      void utils.educations.invalidate();
      toast.success("Educação criada com sucesso!");
      router.push(`/app/resume/${params.id}/educations`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleOnClick = () => router.back();

  const handleOnSubmit: SubmitHandler<EducationSchema> = async (values) => {
    const { degree, institution, description } = values;
    await educationCreateMutation.mutateAsync({
      degree,
      institution: institution ?? undefined,
      description: description ?? undefined,
      resumeId: params.id,
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
            isLoading={educationCreateMutation.isPending}
          >
            Salvar
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
};
