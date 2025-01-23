"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  type SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

import { Input } from "~/components/form/input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { educations } from "~/server/db/schema";

const formSchema = z.object({
  institution: z.string().optional(),
  degree: z.string().optional(),
  year: z.string().optional(),
});

const EducationForm = () => {
  const form = useFormContext<FormSchema>();

  const onSubmit: SubmitHandler<FormSchema> = (d) => {
    console.log(d);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex-2 w-full space-y-6"
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

      <Input
        placeholder="Insira mais informações"
        name="description"
        label="Quando você obteve seu diploma/qualificação?"
      />

      <Button type="submit">Adicionar</Button>
    </form>
  );
};

type FormSchema = z.infer<typeof formSchema>;

const List = () => {
  return <div className="w-full bg-red-500">List</div>;
};

interface Education {
  id: string;
  degree?: string;
  institution?: string;
  year?: string;
  description?: string;
  appear: boolean;
  order: number;
}

export default function Education() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   items: {
    //     institution: "",
    //     degree: "",
    //     year: "",
    //   }
    // },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: "educations",
    },
  );

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <Form {...form}>
          <div className="w-full flex-1">
            <List items={educations} />
          </div>
          <EducationForm />
        </Form>
      </div>
    </div>
  );
}
