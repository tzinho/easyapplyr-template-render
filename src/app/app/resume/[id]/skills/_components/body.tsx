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
import { Skeleton } from "~/components/ui/skeleton";
import { PageContentEditor } from "~/components/page";

export const Body = () => {
  const { resumeTemplate, setResumeTemplate, deleteSkillTemplate } =
    useResumeStore((state) => state);

  const skillsHideMutation = api.skills.hide.useMutation({
    onSuccess: (_, variables) => {
      setResumeTemplate({
        ...resumeTemplate,
        skills: resumeTemplate!.skills.map((skill) => {
          if (skill.id === variables.id) {
            return variables;
          }
          return skill;
        }),
      });
      toast.success("Item não aparecerá no currículo!");
    },
  });

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

  if (!resumeTemplate)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );

  return (
    <PageContentEditor>
      <div>
        <List<Skill>
          initialItems={resumeTemplate.skills}
          type="skills"
          renderItem={(item) => {
            return (
              <div className="flex w-full items-center justify-between rounded-md border p-3">
                <p>{item.text}</p>
              </div>
            );
          }}
          onHide={async (item) => {
            void skillsHideMutation.mutateAsync(item);
          }}
          onUpdate={async (data) => {
            await skillsOrderMutation.mutateAsync(data);
          }}
          onDelete={(id) => skillsDeleteMutation.mutateAsync(id)}
        />

        <Link
          href={`/app/resume/${resumeTemplate.id}/skills/create`}
          className={cn(buttonVariants({ variant: "default" }), "h-6")}
        >
          <Plus />
          Adicionar habilidade
        </Link>
      </div>

      <TemplatePreview resumeTemplate={resumeTemplate} isPreview />
    </PageContentEditor>
  );
};
