/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import lodash from "lodash";

import { type Experience } from "~/stores/resume-store";
import { Form } from "~/components/ui/form";
import { Confirm } from "./confirm";
import { usePreviousValues } from "~/hooks/use-previous";

interface HandlerProps {
  defaultValues: Omit<Experience, "id"> & { activeIndex: string }[];
  prefix: string;
  schema: any;
  renderList: (props: any) => React.ReactNode;
  renderForm: (props: any) => React.ReactNode;
  generateANewItem: any;
  mutations: any;
}

export const Handler = ({
  defaultValues,
  prefix,
  renderList,
  renderForm,
  schema,
  generateANewItem,
  mutations,
}: HandlerProps) => {
  const { id } = useParams<{ id: string }>();
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [toActiveIndex, setToActiveIndex] = useState<string | null>(null);

  const { update: updatePreviousFields, previousValues } = usePreviousValues();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      [prefix]: defaultValues ?? [generateANewItem(0)],
    },
  });

  const { fields, replace, move, update } = useFieldArray({
    control: form.control,
    name: prefix,
  });

  const isSubmitting = !fields.every((field) => !!field._id);

  useEffect(() => {
    updatePreviousFields(form.getValues(prefix));
  }, []);

  useEffect(() => {
    if (fields.length && !activeIndex) setActiveIndex(fields[0]!.activeIndex);
  }, [fields.length]);

  const onClick = (activeItemIndex: string) => {
    if (isSubmitting) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      if (form.formState.touchedFields?.[prefix]) {
        setToActiveIndex(activeItemIndex);
        return;
      } else {
        replace(fields.filter((field) => !!field._id));
      }

      setActiveIndex(activeItemIndex);
      return;
    }

    const isEqual = lodash.isEqual(
      form.getValues(prefix).map((field) => {
        const { id, ...rest } = field;
        return rest;
      }),
      previousValues,
    );

    if (!isEqual) {
      setToActiveIndex(activeItemIndex);
      return;
    }

    if (form.formState.touchedFields?.[prefix]) {
      const fieldIndex = fields.findIndex(
        (field) => field.activeIndex === activeIndex,
      );
      const fieldOnArray = form.formState.touchedFields?.[prefix][fieldIndex];

      if (Object.values(fieldOnArray).some((value) => !!value)) {
        return;
      }
    }

    setActiveIndex(activeItemIndex);
  };

  const onAppend = () => {
    const newItem = generateANewItem(fields.length);
    updatePreviousFields(form.getValues(prefix));
    replace([...fields, newItem]);

    resetForm();

    setActiveIndex(newItem.activeIndex);
  };

  const onMove = (actualIndex: number, nextIndex: number, updateItems: any) => {
    move(actualIndex, nextIndex);
    void mutations.mutationChangeOrder.mutateAsync(updateItems);
  };

  const onRemove = (activeItemIndex: string) => {
    const newItems = fields.filter(
      (field) => field.activeIndex !== activeItemIndex,
    );
    const hasItems = newItems.length;
    const index = fields.findIndex(
      (field) => field.activeIndex === activeItemIndex,
    );
    const item = fields[index];
    void mutations.mutationDelete.mutateAsync(item!._id);

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

    resetForm();
  };

  const handleOnSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    values,
  ) => {
    let fieldsSubmit = values?.[prefix];
    const field = values?.[prefix].find(
      (item) => item.activeIndex === activeIndex,
    )!;

    if (field.resumeId) {
      void mutations.mutationUpdate.mutateAsync({ ...field, id: field._id });
    } else {
      const responseAPI = await mutations.mutationCreate.mutateAsync({
        ...field,
        resumeId: id,
      });

      fieldsSubmit = fieldsSubmit.map((field) => {
        if (field._id) return field;
        return { ...field, resumeId: id, _id: responseAPI?.id };
      });
    }

    replace(fieldsSubmit);
    resetForm();
    updatePreviousFields(fieldsSubmit);
  };

  const onAppear = (activeIndex: string) => {
    const fieldIndex = fields.findIndex(
      (field) => field.activeIndex === activeIndex,
    );
    void mutations.mutationToggle.mutateAsync({
      id: fields[fieldIndex]._id,
      appear: !fields[fieldIndex].appear,
    });
    update(fieldIndex, {
      ...fields[fieldIndex],
      appear: !fields[fieldIndex].appear,
    });
  };

  const resetForm = () => {
    form.reset(undefined, {
      keepTouched: false,
      keepDirty: false,
      keepValues: true,
    });
  };

  return (
    <Form {...form}>
      <Confirm
        open={!!toActiveIndex}
        onOpenChange={() => setToActiveIndex(null)}
        onClick={() => {
          if (isSubmitting) replace(fields.filter((field) => !!field._id));
          resetForm();
          setActiveIndex(toActiveIndex);
        }}
      />
      <div className="w-full md:max-w-[306px]">
        {renderList({
          fields,
          activeIndex,
          onAppend,
          onMove,
          onClick,
          onAppear,
          onRemove,
        })}
      </div>
      <div className="flex-1">
        {renderForm({
          activeIndex,
          onSubmit: handleOnSubmit,
          fields,
          isLoading:
            mutations.mutationCreate.isPending ||
            mutations.mutationUpdate.isPending,
        })}
      </div>
    </Form>
  );
};
