/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import lodash from "lodash";

import { type Experience } from "~/stores/resume-store";
import { Form } from "~/components/ui/form";
import { CardList } from "./handle-list";
import { CardForm } from "./handle-form";
import { schema, generateANewItem, useMutations } from "./hooks";
import { Confirm } from "./confirm";
import { Item } from "./item";
import { usePreviousValues } from "~/hooks/use-previous";

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

  const handleOnClick = (activeItemIndex: string) => {
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

  const resetForm = () => {
    form.reset(undefined, {
      keepTouched: false,
      keepDirty: false,
      keepValues: true,
    });
  };

  const handleOnAppend = () => {
    const newItem = generateANewItem(fields.length);
    updatePreviousFields(form.getValues(prefix));
    replace([...fields, newItem]);
    resetForm();

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
    let fieldsSubmit = values?.[prefix];
    const field = values?.[prefix].find(
      (item) => item.activeIndex === activeIndex,
    )!;

    if (field.resumeId) {
      void mutationUpdate.mutateAsync({ ...field, id: field._id });
    } else {
      const responseAPI = await mutationCreate.mutateAsync({
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

          resetForm();

          setActiveIndex(toActiveIndex);
        }}
      />
      <div className="w-full md:max-w-[306px]">
        <CardList
          onAppend={handleOnAppend}
          fields={fields}
          onMove={handleMove}
          title="Suas experiências"
          actionInfoText="Adicionar uma experiência"
          renderItem={(field, index) => {
            return (
              <Item
                key={field.activeIndex}
                id={field._id}
                value={field}
                onClick={handleOnClick}
                index={index}
                onAppear={handleAppear}
                onRemove={handleOnRemove}
                activeIndex={activeIndex!}
              />
            );
          }}
        />
      </div>
      <div className="flex-1">
        <CardForm
          activeIndex={activeIndex}
          onSubmit={handleOnSubmit}
          fields={fields}
          isLoading={mutationCreate.isPending || mutationUpdate.isPending}
        />
      </div>
    </Form>
  );
};
