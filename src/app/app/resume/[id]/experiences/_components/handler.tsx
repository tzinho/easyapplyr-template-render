"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "~/components/ui/form";
import { type ExperienceSchema } from "~/validators";
import { api } from "~/trpc/react";
import { ExperienceList } from "./handle-list";
import { ExperienceForm } from "./handle-form";
import { type Experience } from "~/stores/resume-store";
import { toast } from "sonner";

interface HandlerProps {
  defaultValues: Experience[];
}

const schema = z.object({
  experiences: z.array(
    z.object({
      id: z.string(),
      appear: z.boolean(),
      where: z.string().nullish(),
      role: z.string({ message: "A função é obrigatória!" }),
      company: z.string({ message: "A empresa é obrigatória!" }),
      did: z.string().nullish(),
      resumeId: z.string(),
      order: z.number(),
    }),
  ),
});

export const Handler = ({ defaultValues }: HandlerProps) => {
  const { id } = useParams<{ id: string }>();
  const [currentVisible, setCurrentVisible] = useState<number>(0);
  const experienceCreate = api.experiences.create.useMutation({
    onSuccess() {
      toast.success("Experiência adicionada com sucesso!");
    },
  });
  const experienceUpdate = api.experiences.update.useMutation({
    onSuccess() {
      toast.success("Experiência atualizada com sucesso!");
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      experiences: defaultValues ?? [
        {
          role: "",
          company: "",
          where: "",
          did: "",
          resumeId: "",
          appear: true,
          order: 0,
        } as ExperienceSchema,
      ],
    },
  });

  // console.log("form", form.formState.errors);

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const handleOnClick = (index: number) => {
    if (
      !fields.every((field) => !!field.resumeId) &&
      index !== fields.length - 1
    ) {
      replace(fields.filter((_, itemIndex) => itemIndex !== fields.length - 1));
    }
    setCurrentVisible(index);
  };

  const handleOnAppend = () => {
    console.log("[handleOnAppend]");
    append({
      role: "",
      company: "",
      where: "",
      did: "",
      id: "",
      resumeId: "",
      order: fields.length,
      appear: true,
    });

    setCurrentVisible(fields.length);
  };

  const handleOnRemove = (index: number) => {
    console.log("[handleOnRemove]");
    remove(index);
    console.log("[index]: ", index);
    console.log("[length]: ", fields.length);
    console.log("[field]: ", fields[index]);
    if (fields.length === 1) handleOnAppend();
  };

  const handleOnSubmit = (values) => {
    console.log("[values]: ", values);
    const experience = values.experiences[currentVisible];
    console.log("[experience]: ", experience);
    if (experience.resumeId) {
      console.log("updating...");
      void experienceUpdate.mutateAsync(experience);
    } else {
      console.log("creating...");
      void experienceCreate.mutateAsync({
        ...experience,
        resumeId: id,
      });
    }
    replace(values.experiences);
  };

  return (
    <Form {...form}>
      <div className="w-full md:max-w-[306px]">
        <ExperienceList
          onAppend={handleOnAppend}
          onClick={handleOnClick}
          onRemove={handleOnRemove}
          onMove={(values) => replace(values)}
        />
      </div>
      <div className="flex-1">
        <ExperienceForm
          currentVisible={currentVisible}
          onSubmit={handleOnSubmit}
        />
      </div>
    </Form>
  );
};
