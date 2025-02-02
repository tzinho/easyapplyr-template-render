"use client";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/form/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContactSchema, contactSchema } from "~/validators";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { ButtonLoading } from "~/components/ui/button-loading";

export const ContactForm = ({ data }: any) => {
  const params = useParams<{ id: string }>();

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: data,
  });

  const updateContactMutation = api.contact.create.useMutation({
    onSuccess: () => toast.success("Mudanças salvas com sucesso!"),
    onError() {
      toast.error("Ocorreu um erro ao tentar salvar as mudanças! ");
    },
  });

  const onSubmit = async (values: ContactSchema) => {
    await updateContactMutation.mutateAsync({ ...values, resumeId: params.id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Input name="name" label="Nome Completo" placeholder="Thiago Luiz" />

          <Input name="email" label="Email" placeholder="thiago@luiz.com" />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Input name="phone" label="Telefone" placeholder="(11) 96065-7707" />

          <Input
            name="linkedin"
            label="Linkedin"
            placeholder="https://linkedin.com/in/tluiz"
          />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Input
            name="personal"
            label="Site"
            placeholder="https://www.thiagoluiz.com"
          />

          <Input name="country" label="País" placeholder="Brasil" />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Input name="state" label="Estado" placeholder="São Paulo, SP" />
          <Input name="city" label="Cidade" placeholder="Guarulhos" />
        </div>

        <ButtonLoading
          type="submit"
          isLoading={updateContactMutation.isPending}
        >
          Salvar
        </ButtonLoading>
      </form>
    </Form>
  );
};
