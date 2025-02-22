"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form } from "~/components/ui/form";
import { type ExperienceSchema } from "~/validators";
import { api } from "~/trpc/react";
import { ExperienceList } from "./handle-list";
import { ExperienceForm } from "./handle-form";
import { type Experience } from "~/stores/resume-store";

interface HandlerProps {
  defaultValues: Omit<Experience, "id">[];
}

const generateANewItem = (order: number) => {
  return {
    role: null,
    company: null,
    where: "",
    did: "",
    _id: "",
    resumeId: "",
    order,
    appear: true,
  } as ExperienceSchema;
};

const schema = z.object({
  experiences: z.array(
    z.object({
      _id: z.string(),
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
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const experienceCreate = api.experiences.create.useMutation({
    onSuccess: () => toast.success("Experiência adicionada com sucesso!"),
  });

  const experienceUpdate = api.experiences.update.useMutation({
    onSuccess: () => toast.success("Experiência atualizada com sucesso!"),
  });

  const experienceDelete = api.experiences.delete.useMutation({
    onSuccess: () => toast.success("Experiência deletada com sucesso!"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { experiences: defaultValues ?? [generateANewItem(0)] },
  });

  const { fields, append, replace, move } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  useEffect(() => {
    if (fields.length && !activeIndex) setActiveIndex(fields[0]!._id);
  }, [fields.length]);

  const handleOnClick = (activeIndex: string) => {
    const isSubmitting = !fields.every((field) => !!field._id);
    const lastIndex = fields.length - 1;
    const isTheLastIndex =
      fields.findIndex((field) => field._id === activeIndex) !== lastIndex;
    // if (isSubmitting && isTheLastIndex)
    //   replace(fields.filter((field) => itemIndex !== lastIndex));
    setActiveIndex(activeIndex);
  };

  useEffect(() => {
    console.log("change");
  }, [fields.length, activeIndex]);

  const handleOnAppend = () => {
    append(generateANewItem(fields.length));
    console.log("[handleOnAppend]: ", fields);
    setActiveIndex(fields[fields.length - 1]!._id);
  };

  const handleOnRemove = (activeItemIndex: string) => {
    const newItems = fields.filter((field) => field._id !== activeItemIndex);
    const hasItems = newItems.length;
    replace(newItems);

    if (hasItems) {
      if (activeIndex === activeItemIndex)
        setActiveIndex(fields[fields.length - 1]!._id);
    } else {
      handleOnAppend();
      setActiveIndex(fields[0]!._id);
    }

    // void experienceDelete.mutateAsync(item!._id);
  };

  const handleOnSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    values,
  ) => {
    let experiences = values.experiences;
    const experience = values.experiences.find(
      (experience) => experience._id === activeIndex,
    )!;

    if (experience.resumeId) {
      void experienceUpdate.mutateAsync({ ...experience, id: experience._id });
    } else {
      const responseAPI = await experienceCreate.mutateAsync({
        ...experience,
        id: experience._id,
        resumeId: id,
      });

      experiences = experiences.map((experience) => {
        if (experience._id) return experience;
        return { ...experience, resumeId: id, id: responseAPI?.id };
      });
    }

    replace(experiences);
  };

  return (
    <Form {...form}>
      <div className="w-full md:max-w-[306px]">
        <ExperienceList
          onAppend={handleOnAppend}
          onClick={handleOnClick}
          onRemove={handleOnRemove}
          onMove={(actualIndex: number, nextIndex: number) => {
            move(actualIndex, nextIndex);
            // setActiveIndex(fields[0]!._id);
          }}
        />
      </div>
      <div className="flex-1">
        <ExperienceForm activeIndex={activeIndex} onSubmit={handleOnSubmit} />
      </div>
    </Form>
  );
};
