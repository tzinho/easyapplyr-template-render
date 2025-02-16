"use client";

import { type PropsWithChildren } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/form/input";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";
import { ButtonLoading } from "~/components/ui/button-loading";
import { type ResumeSchema, resumeSchema } from "~/validators";

const FormToSuggestTemplate = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
  });

  const createResumeMutation = api.resumes.create.useMutation<{ id: string }[]>(
    {
      onSuccess: (resume) => {
        void utils.resumes.list.invalidate();
        toast({ title: "Currículo criado com sucesso!", description: "" });
        if (resume) router.push(`/app/resume/${resume.id}/contact`);
      },
    },
  );

  const handleSubmit: SubmitHandler<ResumeSchema> = async (d) => {
    await createResumeMutation.mutateAsync(d, {
      onSuccess: (resumeTemplate) => {
        if (resumeTemplate)
          router.push(`/app/resume/${resumeTemplate.id}/contact`);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>Sugerir um modelo</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <Input
            name="title"
            label="Título do currículo"
            placeholder="Digite aqui..."
            description="Insira um título lembrando que usamos nomes de cidades, Que tal usar o nome da sua?"
            required
          />
          <Input
            name="file"
            label="Arquivo"
            className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
            type="file"
            description="Carregue uma imagem do modelo ao qual você gostaria que adicionassemos na nossa biblioteca"
          />
        </div>
        <DialogFooter className="justify-end gap-3 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>

          <ButtonLoading
            type="submit"
            isLoading={createResumeMutation.isPending}
          >
            Salvar
          </ButtonLoading>
        </DialogFooter>
      </form>
    </Form>
  );
};

export const ModalToSuggestATemplate = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormToSuggestTemplate />
      </DialogContent>
    </Dialog>
  );
};
