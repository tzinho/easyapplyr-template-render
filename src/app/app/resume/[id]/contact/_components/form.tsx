"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form } from "~/components/ui/form";
import { Input } from "~/components/form/input";
import { api } from "~/trpc/react";
import { ButtonLoading } from "~/components/ui/button-loading";
import { contactSchema, type ContactSchema } from "~/validators/contact";
import { type Resume } from "~/stores/resume-store";
import { SelectCity, SelectCountry, SelectState } from "./select-location";
import { useResumeStore } from "~/providers/resume-store-provider";

export const PageForm = ({
  defaultValues,
}: {
  defaultValues: Resume["contact"];
}) => {
  const params = useParams<{ id: string }>();
  const setContact = useResumeStore((state) => state.setContact);

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const updateContact = api.contact.create.useMutation({
    onSuccess: () => toast.success("Mudanças salvas com sucesso!"),
    onError: () =>
      toast.error("Ocorreu um erro ao tentar salvar as mudanças! "),
  });

  const onSubmit = async (values: ContactSchema) => {
    setContact(values);
    await updateContact.mutateAsync({ ...values, resumeId: params.id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
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
            className="flex-1"
          />
          <SelectCountry name="country" placeholder="Brasil" />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <SelectState name="state" placeholder="São Paulo, SP" />
          <SelectCity name="city" placeholder="Guarulhos" />
        </div>

        <ButtonLoading
          type="submit"
          isLoading={updateContact.isPending}
          className="self-end"
        >
          Salvar as informações de contato
        </ButtonLoading>
      </form>
    </Form>
  );
};
