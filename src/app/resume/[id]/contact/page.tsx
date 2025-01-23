"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/form/input";
import { TemplateRender } from "~/app/_components/template-render";
import { type ContactSchema, contactSchema } from "~/validators";
import { api } from "~/trpc/react";

const Contact = () => {
  const params = useParams<{ id: string }>();

  const updateContactMutation = api.contact.create.useMutation({
    onSuccess: () => toast.success("Mudanças salvas com sucesso!"),
    onError(error, variables, context) {
      console.log(error, variables, context);
      toast.error("Ocorreu um erro ao tentar salvar as mudanças!");
    },
  });

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      personal: "",
      linkedin: "",
      country: "",
      state: "",
      city: "",
    },
  });

  const onSubmit = async (values: ContactSchema) => {
    console.log(values);
    await updateContactMutation.mutateAsync({ ...values, resumeId: params.id });
  };

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex w-full flex-col gap-3 md:flex-row">
              <Input
                name="name"
                label="Nome Completo"
                placeholder="Thiago Luiz"
              />

              <Input name="email" label="Email" placeholder="thiago@luiz.com" />
            </div>

            <div className="flex w-full flex-col gap-3 md:flex-row">
              <Input
                name="phone"
                label="Telefone"
                placeholder="(11) 96065-7707"
              />

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

            <Button type="submit">Salvar</Button>
          </form>
        </Form>

        <TemplateRender />
      </div>
    </div>
  );
};

export default Contact;
