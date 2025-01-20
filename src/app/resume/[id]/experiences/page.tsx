"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { TemplateRender } from "~/app/_components/template-render";
import { type ExperienceSchema, experienceSchema } from "~/validators";

export default function Experiences() {
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
  });

  const onSubmit: SubmitHandler<ExperienceSchema> = (d: any) => {
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
              name="role"
              label="Qual a sua função na empresa?"
            />

            <Input
              placeholder="Google"
              name="company"
              label="Para qual empresa você trabalhou?"
            />

            <Input
              placeholder="Desenvolvedor Full Stack"
              name="did"
              label="O que você fez na empresa?"
            />

            <Input
              placeholder="São Paulo, SP"
              name="where"
              label="Onde a empresa estava localizada?"
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
