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
import { experienceSchema, type ExperienceSchema } from "~/validators";

export default function ExperienceCreate() {
  const utils = api.useUtils();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const experienceCreateMutation = api.experiences.create.useMutation({
    onSuccess() {
      void utils.experiences.invalidate();
      toast.success("Experiência criada com sucesso!");
      router.push(`/app/resume/${params.id}/experiences`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
  });

  const handleOnSubmit: SubmitHandler<ExperienceSchema> = async (values) => {
    await experienceCreateMutation.mutateAsync({
      ...values,
      resumeId: params.id,
    });
  };

  const handleOnClick = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Input name="role" label="Função" />
        <Input name="company" label="Empresa" />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="destructive" onClick={handleOnClick}>
            Cancelar
          </Button>
          <ButtonLoading
            type="submit"
            isLoading={experienceCreateMutation.isPending}
          >
            Salvar
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
}
