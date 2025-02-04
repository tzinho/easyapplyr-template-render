"use client";

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
import { Card, CardContent } from "~/components/ui/card";
import { type ResumeSchema, resumeSchema } from "~/validators";

export const ResumeModal = () => {
  const { toast } = useToast();

  const router = useRouter();
  const createResumeMutation = api.resumes.create.useMutation<{ id: string }[]>(
    {
      onSuccess: (resume) => {
        toast({ title: "Curriculum criado com sucesso!", description: "" });
        if (resume) {
          router.push(`/resume/${resume.id}/contact`);
        }
      },
    },
  );

  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
  });

  const handleSubmit: SubmitHandler<ResumeSchema> = async (d) => {
    await createResumeMutation.mutateAsync(
      {
        templateId: "1",
        ...d,
      },
      {
        onSuccess: (resume) => {
          if (resume) {
            router.push(`/resume/${resume.id}/contact`);
          }
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex h-[290px] w-full max-w-[240px] cursor-pointer flex-col justify-between overflow-hidden border-dashed">
          <CardContent className="m-auto flex h-full w-full items-center justify-center">
            <span className="my-auto text-muted-foreground">
              Criar novo curriculum
            </span>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Criar um curriculum</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <Input
                name="title"
                label="Título do curriculum"
                placeholder="Digite aqui..."
                description="Insira um título pra que fique fácil você identificá-lo"
                required
              />

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
      </DialogContent>
    </Dialog>
  );
};
