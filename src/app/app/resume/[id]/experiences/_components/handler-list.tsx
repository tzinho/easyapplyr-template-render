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
  prefix: string;
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
  startAt: z.string().nullish(),
  endAt: z.string().nullish(),
  order: z.number(),
});

const schema = z.object({
  experiences: z.array(experienceSchema),
});

const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    _id: "",
    role: "",
    company: "",
    where: "",
    did: "",
    activeIndex,
    resumeId: "",
    order,
    appear: true,
    startAt: null,
    endAt: null,
  } as z.infer<typeof experienceSchema>;
};

export const HandlerList = ({ defaultValues, prefix }: HandlerProps) => {
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

  const experienceChangeOrder = api.experiences.changeOrder.useMutation({
    onSuccess: () =>
      toast.success("Ordem das experiências alterada com sucesso!"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      experiences: defaultValues ?? [generateANewItem(0)],
    },
  });

  const { fields, append, replace, move, update } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  useEffect(() => {
    if (fields.length && !activeIndex) setActiveIndex(fields[0]!.activeIndex);
  }, [fields.length]);

  const handleOnClick = (activeItemIndex: string) => {
    if (form.formState.touchedFields?.experiences) {
      const fieldIndex = fields.findIndex(
        (field) => field.activeIndex === activeIndex,
      );
      const fieldOnArray =
        form.formState.touchedFields?.experiences[fieldIndex];
      if (Object.values(fieldOnArray!).some((value) => !!value)) {
        console.log("The field had been edit");
        return;
      }
    }

    const isSubmitting = !fields.every((field) => !!field._id);

    setActiveIndex(activeItemIndex);

    if (isSubmitting) {
      replace(fields.filter((field) => !!field._id));
    }

    form.reset(form.control._formValues, {
      keepValues: true,
      keepDirty: true,
      keepErrors: true,
      keepSubmitCount: true,
    });
  };

  const handleOnAppend = () => {
    const newItem = generateANewItem(fields.length);
    append(newItem);
    setActiveIndex(newItem.activeIndex);
    form.reset(form.control._formValues, {
      keepValues: true,
      keepDirty: true,
      keepErrors: true,
      keepSubmitCount: true,
    });
  };

  const handleOnRemove = (activeItemIndex: string) => {
    const newItems = fields.filter(
      (field) => field.activeIndex !== activeItemIndex,
    );
    const hasItems = newItems.length;
    const index = fields.findIndex(
      (field) => field.activeIndex === activeItemIndex,
    );
    const item = fields[index];
    void experienceDelete.mutateAsync(item!._id);

    if (hasItems) {
      replace(newItems);

      if (activeIndex === activeItemIndex)
        setActiveIndex(newItems[newItems.length - 1]!.activeIndex);
    } else {
      const newItem = generateANewItem(fields.length);
      setActiveIndex(newItem.activeIndex);
      replace([newItem]);
    }
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

  const handleAppear = (activeIndex: string) => {
    const fieldIndex = fields.findIndex(
      (field) => field.activeIndex === activeIndex,
    );
    update(fieldIndex, {
      ...fields[fieldIndex],
      appear: !fields[fieldIndex].appear,
    });
  };

  return (
    <Form {...form}>
      <div className="w-full md:max-w-[306px]">
        <ExperienceList
          onAppend={handleOnAppend}
          onClick={handleOnClick}
          onRemove={handleOnRemove}
          activeIndex={activeIndex!}
          handleAppear={handleAppear}
          fields={fields}
          onMove={(
            actualIndex: number,
            nextIndex: number,
            updateItems: any,
          ) => {
            move(actualIndex, nextIndex);
            void experienceChangeOrder.mutateAsync(updateItems);
          }}
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
