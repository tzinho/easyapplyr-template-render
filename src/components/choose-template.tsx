"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Select } from "./form/select";
import { templates } from "~/app/_templates";
import { SelectItem } from "./ui/select";
import { Form } from "./ui/form";
import { api } from "~/trpc/react";
import { ButtonLoading } from "./ui/button-loading";

interface ChooseTemplateProps {
  excludeTemplateId?: string;
  resumeId: string;
}

export const ChooseTemplate = ({
  resumeId,
  excludeTemplateId,
}: ChooseTemplateProps) => {
  const router = useRouter();
  const schema = z.object({
    templateId: z.string(),
  });

  const changeTemplateMutation = api.resumes.changeTemplate.useMutation({
    onSuccess() {
      router.refresh();
      toast.success("Modelo alterado com sucesso!");
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleOnSubmit: SubmitHandler<z.infer<typeof schema>> = async (d) => {
    await changeTemplateMutation.mutateAsync({
      ...d,
      id: resumeId,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Alterar modelo</Button>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <SheetHeader>
              <SheetTitle>Escolha o modelo</SheetTitle>
              <SheetDescription>Selecione o modelo</SheetDescription>
            </SheetHeader>
            <div className="mb-3">
              <Select
                name="templateId"
                placeholder="Selecione o modelo"
                label="Modelo"
              >
                {templates.map((template) => {
                  if (excludeTemplateId !== template.id) {
                    return (
                      <SelectItem value={template.id} key={template.id}>
                        {template.title}
                      </SelectItem>
                    );
                  }
                })}
              </Select>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <ButtonLoading
                  isLoading={changeTemplateMutation.isPending}
                  type="submit"
                >
                  Confirmar
                </ButtonLoading>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
