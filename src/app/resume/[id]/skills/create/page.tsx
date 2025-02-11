"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Textarea } from "~/components/form/textarea";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { useResumeStore } from "~/providers/resume-store-provider";
import { api } from "~/trpc/react";
import { skillSchema, type SkillSchema } from "~/validators";

export default function SkillsCreate() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { resumeTemplate, setResumeTemplate } = useResumeStore(
    (state) => state,
  );

  const SkillsCreateMutation = api.skills.create.useMutation({
    onSuccess(data) {
      setResumeTemplate({
        ...resumeTemplate,
        skills: [...resumeTemplate.skills, ...data],
      });
      toast.success("Habilidade criada com sucesso!");
      router.push(`/resume/${params.id}/skills`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<SkillSchema>({
    resolver: zodResolver(skillSchema),
  });

  const handleOnSubmit: SubmitHandler<SkillSchema> = async (values) => {
    await SkillsCreateMutation.mutateAsync({
      ...values,
      resumeId: params.id,
    });
  };

  const handleOnClick = () => router.back();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Textarea name="text" label="Habilidade" />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="destructive" onClick={handleOnClick}>
            Cancelar
          </Button>
          <ButtonLoading
            type="submit"
            isLoading={SkillsCreateMutation.isPending}
          >
            Salvar
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
}
