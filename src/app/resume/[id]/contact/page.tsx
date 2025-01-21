"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/form/input";
import { TemplateRender } from "~/app/_components/template-render";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      console.log("Submitting values:", values);
    },
    onSuccess: () => {
      toast.success("Contact information saved successfully!");
      form.reset();
    },
    onError: (error) => {
      console.error("Error saving contact:", error);
      toast.error("Failed to save contact information");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex w-full gap-3">
              <Input
                name="name"
                label="Nome Completo"
                placeholder="Thiago Luiz"
              />
              <Input name="email" label="Email" placeholder="thiago@luiz.com" />
            </div>

            <Input
              name="phone"
              label="Telefone"
              placeholder="(11) 96065-7707"
            />
            <Input
              name="address"
              label="Endereço"
              placeholder="São Paulo, SP"
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Form>

        <TemplateRender />
      </div>
    </div>
  );
};

export default Contact;
