"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { api } from "~/trpc/react";
import { type Experience } from "~/stores/resume-store";
import { Form } from "~/components/ui/form";
import { ExperienceList } from "./handle-list";
import { ExperienceForm } from "./handle-form";

interface HandlerProps {
  defaultValues: Omit<Experience, "id"> & { activeIndex: string }[];
}

const experienceSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  where: z.string().nullish(),
  role: z.string().min(1, "A função é obrigatório!"),
  company: z.string().min(1, "A empresa é obrigatória!"),
  did: z.string().nullish(),
  resumeId: z.string(),
  startAt: z.date().nullish(),
  endAt: z.date().nullish(),
  order: z.number(),
});

const schema = z.object({
  experiences: z.array(experienceSchema),
});

const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    role: "",
    company: "",
    where: "",
    did: "",
    _id: "",
    activeIndex,
    resumeId: "",
    order,
    appear: true,
  } as z.infer<typeof experienceSchema>;
};

export const HandlerList = ({ defaultValues }: HandlerProps) => {
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
    defaultValues: {
      experiences: defaultValues ?? [generateANewItem(0)],
    },
  });

  const { fields, append, replace, move, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  useEffect(() => {
    if (fields.length && !activeIndex) setActiveIndex(fields[0]!.activeIndex);
  }, [fields.length]);

  const handleOnClick = (activeIndex: string) => {
    const isSubmitting = !fields.every((field) => !!field._id);

    setActiveIndex(activeIndex);

    if (isSubmitting) {
      // remove(fields.length - 1);
      replace(fields.filter((field) => !!field._id));
    }
  };

  const handleOnAppend = () => {
    const newItem = generateANewItem(fields.length);
    append(newItem);
    setActiveIndex(newItem.activeIndex);
  };

  const handleOnRemove = (activeItemIndex: string) => {
    const newItems = fields.filter(
      (field) => field.activeIndex !== activeItemIndex,
    );
    const hasItems = newItems.length;
    const index = fields.findIndex(
      (field) => field.activeIndex === activeItemIndex,
    );
    remove(index);

    if (hasItems) {
      if (activeIndex === activeItemIndex)
        setActiveIndex(fields[fields.length - 1]!.activeIndex);
    } else {
      handleOnAppend();
      setActiveIndex(fields[0]!.activeIndex);
    }

    // void experienceDelete.mutateAsync(item!._id);
  };

  const handleOnSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    values,
  ) => {
    let experiences = values.experiences;
    const experience = values.experiences.find(
      (experience) => experience.activeIndex === activeIndex,
    )!;

    if (experience.resumeId) {
      void experienceUpdate.mutateAsync({ ...experience, id: experience._id });
    } else {
      const responseAPI = await experienceCreate.mutateAsync({
        ...experience,
        resumeId: id,
      });

      experiences = experiences.map((experience) => {
        if (experience._id) return experience;
        return { ...experience, resumeId: id, _id: responseAPI?.id };
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
          activeIndex={activeIndex!}
          fields={fields}
          onMove={(actualIndex: number, nextIndex: number) =>
            move(actualIndex, nextIndex)
          }
        />
      </div>
      <div className="flex-1">
        <ExperienceForm
          activeIndex={activeIndex}
          onSubmit={handleOnSubmit}
          fields={fields}
          isLoading={experienceCreate.isPending || experienceUpdate.isPending}
        />
      </div>
    </Form>
  );
};
