"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { TemplatePreview } from "~/app/_components/template-preview";
import { List } from "~/components/list";
import { api } from "~/trpc/react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Skill } from "~/stores/resume-store";

export const Body = () => {
  const { resumeTemplate, setResumeTemplate, deleteSkillTemplate } =
    useResumeStore((state) => state);

  const skillsOrderMutation = api.skills.changeOrder.useMutation({
    onSuccess: async (_, variables) => {
      setResumeTemplate({ ...resumeTemplate, skills: variables });
      toast.success("Alterado a ordem dos itens com sucesso!");
    },
    onError: () =>
      toast.error("Ocorreu um erro ao atualizar a ordem dos itens!"),
  });

  const skillsDeleteMutation = api.skills.delete.useMutation({
    onSuccess: (data, variables) => {
      deleteSkillTemplate(variables);
      toast.success("Sucesso deletando o item");
    },
  });

  if (!resumeTemplate) return <h1>Carregando...</h1>;

  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-1 flex-col">
        <List<Skill>
          initialItems={resumeTemplate.skills}
          renderItem={(item) => {
            return (
              <div className="flex w-full items-center justify-between rounded-md border p-3">
                <p>{item.text}</p>
              </div>
            );
          }}
          onUpdate={(data) => {
            skillsOrderMutation.mutateAsync(data);
          }}
          onDelete={(id) => skillsDeleteMutation.mutateAsync(id)}
        />

        <Link
          href={`/resume/${resumeTemplate.id}/skills/create`}
          className={cn(buttonVariants({ variant: "default" }), "h-6")}
        >
          <Plus />
          Adicionar habilidade
        </Link>
      </div>

      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </div>
  );
};
