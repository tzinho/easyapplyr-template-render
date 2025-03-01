"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import lodash from "lodash";

import { type Experience } from "~/stores/resume-store";
import { Form } from "~/components/ui/form";
import { ExperienceList } from "./handle-list";
import { ExperienceForm } from "./handle-form";
import {
  schema,
  generateANewItem,
  useMutations,
  usePreviousValues,
} from "./hooks";
import { Confirm } from "./confirm";

interface HandlerProps {
  defaultValues: Omit<Experience, "id"> & { activeIndex: string }[];
  prefix: string;
}

export const HandlerList = ({ defaultValues, prefix }: HandlerProps) => {
  const { id } = useParams<{ id: string }>();
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [toActiveIndex, setToActiveIndex] = useState<string | null>(null);

  const { update: updatePreviousFields, previousValues } = usePreviousValues();

  const {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  } = useMutations();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      experiences: defaultValues ?? [generateANewItem(0)],
    },
  });

  const { fields, replace, move, update } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const isSubmitting = !fields.every((field) => !!field._id);

  useEffect(() => {
    updatePreviousFields(form.getValues("experiences"));
  }, []);

  useEffect(() => {
    if (fields.length && !activeIndex) setActiveIndex(fields[0]!.activeIndex);
  }, [fields.length]);

  const handleOnClick = (activeItemIndex: string) => {
    if (isSubmitting) {
      if (form.formState.touchedFields?.experiences) {
        setToActiveIndex(activeItemIndex);
        return;
      } else {
        replace(fields.filter((field) => !!field._id));
      }

      setActiveIndex(activeItemIndex);
      return;
    }

    const isEqual = lodash.isEqual(
      form.getValues("experiences").map((field) => {
        const { id, ...rest } = field;
        return rest;
      }),
      previousValues,
    );

    if (!isEqual) {
      setToActiveIndex(activeItemIndex);
      return;
    }

    if (form.formState.touchedFields?.experiences) {
      const fieldIndex = fields.findIndex(
        (field) => field.activeIndex === activeIndex,
      );
      const fieldOnArray =
        form.formState.touchedFields?.experiences[fieldIndex];

      if (Object.values(fieldOnArray!).some((value) => !!value)) {
        return;
      }
    }

    setActiveIndex(activeItemIndex);
  };

  const handleOnAppend = () => {
    const newItem = generateANewItem(fields.length);
    updatePreviousFields(form.getValues("experiences"));
    replace([...fields, newItem]);
    form.reset(undefined, {
      keepTouched: false,
      keepDirty: false,
      keepValues: true,
    });

    setActiveIndex(newItem.activeIndex);
  };

  const handleMove = (
    actualIndex: number,
    nextIndex: number,
    updateItems: any,
  ) => {
    move(actualIndex, nextIndex);
    void mutationChangeOrder.mutateAsync(updateItems);
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
    void mutationDelete.mutateAsync(item!._id);

    if (hasItems) {
      replace(newItems);

      if (activeIndex === activeItemIndex)
        setActiveIndex(newItems[newItems.length - 1]!.activeIndex);
      updatePreviousFields(newItems);
    } else {
      const newItem = generateANewItem(fields.length);
      setActiveIndex(newItem.activeIndex);
      replace([newItem]);
      updatePreviousFields([newItem]);
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
      void mutationUpdate.mutateAsync({ ...experience, id: experience._id });
    } else {
      const responseAPI = await mutationCreate.mutateAsync({
        ...experience,
        resumeId: id,
      });

      experiences = experiences.map((experience) => {
        if (experience._id) return experience;
        return { ...experience, resumeId: id, _id: responseAPI?.id };
      });
    }

    replace(experiences);
    form.reset(undefined, {
      keepTouched: false,
      keepValues: true,
    });
    updatePreviousFields(experiences);
  };

  const handleAppear = (activeIndex: string) => {
    const fieldIndex = fields.findIndex(
      (field) => field.activeIndex === activeIndex,
    );
    void mutationToggle.mutateAsync({
      id: fields[fieldIndex]._id,
      appear: !fields[fieldIndex].appear,
    });
    update(fieldIndex, {
      ...fields[fieldIndex],
      appear: !fields[fieldIndex].appear,
    });
  };

  return (
    <Form {...form}>
      <Confirm
        open={!!toActiveIndex}
        onOpenChange={() => setToActiveIndex(null)}
        onClick={() => {
          if (isSubmitting) {
            replace(fields.filter((field) => !!field._id));
          }

          form.reset(undefined, {
            keepTouched: false,
            keepValues: true,
          });

          setActiveIndex(toActiveIndex);
        }}
      />
      <div className="w-full md:max-w-[306px]">
        <ExperienceList
          onAppend={handleOnAppend}
          onClick={handleOnClick}
          onRemove={handleOnRemove}
          activeIndex={activeIndex!}
          handleAppear={handleAppear}
          fields={fields}
          onMove={handleMove}
        />
      </div>
      <div className="flex-1">
        <ExperienceForm
          activeIndex={activeIndex}
          onSubmit={handleOnSubmit}
          fields={fields}
          isLoading={mutationCreate.isPending || mutationUpdate.isPending}
        />
      </div>
    </Form>
  );
};
