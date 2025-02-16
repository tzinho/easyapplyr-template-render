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
import { Select } from "~/components/form/select";
import { SelectItem } from "~/components/ui/select";
import { Input } from "~/components/form/input";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";
import { ButtonLoading } from "~/components/ui/button-loading";
import { type ResumeSchema, resumeSchema } from "~/validators";
import { templates } from "../_templates";

const FormToCreateResume = () => {
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
          <DialogTitle>Criar um currículo</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <Input
            name="title"
            label="Título do currículo"
            placeholder="Digite aqui..."
            description="Insira um título pra que fique fácil você identificá-lo"
            required
          />

          <Select
            name="templateId"
            placeholder="Selecione o modelo"
            label="Modelo"
          >
            {templates.map((template) => (
              <SelectItem value={template.id} key={template.id}>
                {template.title}
              </SelectItem>
            ))}
          </Select>

          <Select
            name="experience"
            placeholder="Selecione..."
            label="Experiência"
          >
            <SelectItem value="0">0-1 anos</SelectItem>
            <SelectItem value="1">1-3 anos</SelectItem>
            <SelectItem value="2">3-5 anos</SelectItem>
            <SelectItem value="3">5+ anos</SelectItem>
          </Select>
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

export const ModalToCreateAResume = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormToCreateResume />
      </DialogContent>
    </Dialog>
  );
};
