"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
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

export const ResumeModal = () => {
  const { toast } = useToast();

  const router = useRouter();
  const createResumeMutation = api.resume.create.useMutation<{ id: string }[]>({
    onSuccess: (resumes) => {
      toast({ title: "Curriculum criado com sucesso!", description: "" });
      if (resumes.length > 0 && resumes[0]) {
        router.push(`/resume/${(resumes[0] as { id: string }).id}/contact`);
      }
    },
  });

  const formSchema = z.object({
    title: z
      .string({ required_error: "O título do curriculum é obrigatório" })
      .min(3, {
        message: "O título do curriculum deve possuir ao menos 3 caracteres!",
      }),
    experience: z.coerce.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (d) => {
    await createResumeMutation.mutateAsync(d, {
      onSuccess: (resumes) => {
        if (resumes.length > 0 && resumes[0]) {
          router.push(`/resume/${(resumes[0] as { id: string }).id}/contact`);
        }
      },
    });
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
