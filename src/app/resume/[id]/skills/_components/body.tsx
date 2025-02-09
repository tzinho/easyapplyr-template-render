"use client";

import Link from "next/link";
import { type InferSelectModel } from "drizzle-orm";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";

import { TemplatePreview } from "~/app/_components/template-preview";
import { List } from "~/components/list";
import { api } from "~/trpc/react";
import { ButtonLoading } from "~/components/ui/button-loading";
import { type resumes, type skills } from "~/server/db/schema";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface BodyProps {
  data: InferSelectModel<typeof resumes> & {
    skills: InferSelectModel<typeof skills>[];
  };
  resumeId: string;
}

export const Body = ({ data, resumeId }: BodyProps) => {
  console.log("[data]: ", data?.skills);
  const utils = api.useUtils();
  const skillsOrderMutation = api.skills.changeOrder.useMutation({
    onSuccess: async () => {
      utils.resumes.get.setData(resumeId, (old) => {
        console.log("old", old);
        return { ...old, skills: [] };
      });
      // await utils.invalidate();
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
          initialItems={data.skills}
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
                  <Trash className="h-2 w-2" />
                </ButtonLoading>
              </div>
            );
          }}
          onUpdate={skillsOrderMutation.mutateAsync}
        />

        <Link
          href={`/resume/${resumeId}/skills/create`}
          className={cn(buttonVariants({ variant: "default" }), "h-6")}
        >
          <Plus />
          Adicionar habilidade
        </Link>
      </div>

      <TemplatePreview
        templateId={data.templateId}
        data={data}
        resumeId={resumeId}
      />
    </div>
  );
};
