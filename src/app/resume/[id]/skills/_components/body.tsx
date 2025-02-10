"use client";

import Link from "next/link";
import { type InferSelectModel } from "drizzle-orm";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { TemplatePreview } from "~/app/_components/template-preview";
import { List } from "~/components/list";
import { api } from "~/trpc/react";
import { type skills, type resumes } from "~/server/db/schema";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ButtonLoading } from "~/components/ui/button-loading";
import { useResumeStore } from "~/providers/resume-store-provider";

interface BodyProps {
  resume: InferSelectModel<typeof resumes> & {
    skills: InferSelectModel<typeof skills>;
  };
}

export const Body = ({ resume }: BodyProps) => {
  const { resume: previousValues, setResume } = useResumeStore(
    (state) => state,
  );
  console.log("[body]: ", resume);

  const skillsOrderMutation = api.skills.changeOrder.useMutation({
    onSuccess: async (_, variables) => {
      console.log("[variables]: ", variables);
      setResume({ ...previousValues, skills: variables });
      toast.success("Alterado a ordem dos itens com sucesso!");
    },
    onError: () =>
      toast.error("Ocorreu um erro ao atualizar a ordem dos itens!"),
  });

  const skillsDeleteMutation = api.skills.delete.useMutation({
    onSuccess: () => toast.success("Sucesso deletando o item"),
  });

  return (
    <div className="flex justify-between gap-10">
      <div className="flex flex-1 flex-col">
        <List<InferSelectModel<typeof skills>>
          initialItems={resume.skills}
          renderItem={(item) => {
            return (
              <div className="flex w-full items-center justify-between rounded-md border p-3">
                <p>{item.text}</p>
                <ButtonLoading
                  onClick={() => skillsDeleteMutation.mutateAsync(item.id)}
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  isLoading={skillsDeleteMutation.isPending}
                >
                  <Trash2 className="h-2 w-2" />
                </ButtonLoading>
              </div>
            );
          }}
          onUpdate={skillsOrderMutation.mutateAsync}
        />

        <Link
          href={`/resume/${resume.id}/skills/create`}
          className={cn(buttonVariants({ variant: "default" }), "h-6")}
        >
          <Plus />
          Adicionar habilidade
        </Link>
      </div>

      <TemplatePreview data={resume} isPreview />
    </div>
  );
};
