"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { TemplateRender } from "~/app/_components/template-render";
import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

export default function Education() {
  const [editingId, setEditingId] = useState<string | null>(null);

  const formSchema = z.object({
    institution: z.string().min(2, "Institution name is required"),
    degree: z.string().min(2, "Degree is required"),
    year: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: "",
      degree: "",
      year: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (d: any) => {
    console.log(d);
  };

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <Input
              placeholder="Analista de Sistemas"
              name="degree"
              label="Qual é o seu grau ou outra qualificação e principalidade?"
            />
            <Input
              placeholder="UNG - Universidade de Guarulhos"
              name="institution"
              label="Onde você obteu seu grau/qualificação?"
            />
            <Input
              placeholder="2025"
              name="year"
              label="Quando você obteve seu diploma/qualificação?"
            />
            <Button type="submit">
              {editingId ? "Atualizar" : "Adicionar"}
            </Button>
          </form>
        </Form>

        <TemplateRender />
      </div>
    </div>
  );
}
