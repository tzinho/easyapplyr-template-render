"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { api } from "~/trpc/react";
import { educationSchema, type EducationSchema } from "~/validators";

export default function EducationCreate() {
  const utils = api.useUtils();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const educationCreateMutation = api.educations.create.useMutation({
    onSuccess() {
      void utils.educations.invalidate();
      toast.success("Educação criada com sucesso!");
      router.push(`/app/resume/${params.id}/education`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
  });
  const handleOnSubmit: SubmitHandler<EducationSchema> = async (values) => {
    const { degree, institution, description } = values;
    await educationCreateMutation.mutateAsync({
      degree,
      institution: institution ?? undefined,
      description: description ?? undefined,
      resumeId: params.id,
    });
  };

  const handleOnClick = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input name="degree" label="Grau" />
        <Input name="institution" label="Instituição" />
        <Input name="description" label="Descrição" />
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
}
