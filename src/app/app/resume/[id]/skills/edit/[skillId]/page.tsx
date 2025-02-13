"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type InferSelectModel } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Textarea } from "~/components/form/textarea";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Form } from "~/components/ui/form";
import { type skills } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { skillSchema, type SkillSchema } from "~/validators";

const SkillsForm = ({ data }: { data: InferSelectModel<typeof skills> }) => {
  const router = useRouter();
  const { id, skillId } = useParams<{ id: string; skillId: string }>();
  const utils = api.useUtils();

  const updateSkillMutation = api.skills.update.useMutation({
    onSuccess: () => {
      toast.success("Habilidade salva com sucesso!");
      void utils.skills.invalidate();
      router.push(`/resume/${id}/skills`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<SkillSchema>({
    defaultValues: data,
    resolver: zodResolver(skillSchema),
  });

  const handleOnSubmit: SubmitHandler<SkillSchema> = async (d) => {
    await updateSkillMutation.mutateAsync({ id: skillId, ...d });
  };

  const handleOnClick = () => {
    router.back();
  };

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
            isLoading={updateSkillMutation.isPending}
          >
            Salvar
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
};

export default function SkillEdit() {
  const { skillId } = useParams<{ id: string; skillId: string }>();
  const skill = api.skills.get.useQuery(skillId);

  if (skill.isLoading) return null;

  return (
    <div>
      <SkillsForm data={skill.data!} />
    </div>
  );
}
