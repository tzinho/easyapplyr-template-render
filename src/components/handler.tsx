/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";

import { Form } from "~/components/ui/form";
import { Confirm } from "./confirm";
import { usePreviousValues } from "~/hooks/use-previous";
import {
  HandlerInnerProvider,
  HandlerProvider,
} from "~/providers/handler-provider";

interface HandlerProps {
  defaultValues: { id: string; activeIndex: string }[] | null;
  name: string;
  schema: any;
  renderList: (props: any) => React.ReactNode;
  renderForm: ({
    isLoading,
    onSubmit,
  }: {
    isLoading: boolean;
    onSubmit: any;
  }) => React.ReactNode;
  generateANewItem: any;
  mutations: any;
}

export function Handler({
  defaultValues,
  name,
  renderList,
  renderForm,
  schema,
  generateANewItem,
  mutations,
}: HandlerProps) {
  const { id } = useParams<{ id: string }>();
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [toActiveIndex, setToActiveIndex] = useState<string | null>(null);

  const { update: updatePreviousFields, previousValues } = usePreviousValues();

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: {
      [name]: !!defaultValues?.length
        ? defaultValues?.map((item) => {
            const { id, ...rest } = item;
            return { ...rest, _id: item.id, activeIndex: uuidv4() };
          })
        : [generateANewItem(0)],
    },
  });

  const { fields, replace, move, update } = useFieldArray({
    control: form.control,
    name,
  });

  const isSubmitting = !fields.every((field) => !!field._id);
  const isTouching = form.formState.touchedFields?.[name]?.length;
  const isDirtying = form.formState.dirtyFields?.[name]?.length;

  const currentValues = () => form.getValues(name);

  const getIndexOfItem = (activeIndex: string) => {
    const index = fields.findIndex(
      (field) => field.activeIndex === activeIndex,
    );
    return index;
  };

  const addItem = () => {
    const item = generateANewItem(fields.length);
    updatePreviousFields(currentValues());
    replace([...fields, item]);
    resetForm();
    return item;
  };

  useEffect(() => {
    updatePreviousFields(currentValues());
  }, []);

  useEffect(() => {
    if (fields.length && !activeIndex) setActiveIndex(fields[0]!.activeIndex);
  }, [fields.length]);

  const onClick = (activeItemIndex: string) => {
    if (isSubmitting) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      if (form.formState.touchedFields?.[name]) {
        setToActiveIndex(activeItemIndex);
        return;
      } else {
        replace(fields.filter((field) => !!field._id));
      }

      setActiveIndex(activeItemIndex);
      return;
    }

    const isEqual = lodash.isEqual(
      currentValues().map((field) => {
        const { id, ...rest } = field;
        return rest;
      }),
      previousValues,
    );

    if (!isEqual) {
      setToActiveIndex(activeItemIndex);
      return;
    }

    setActiveIndex(activeItemIndex);
  };

  const onAppend = () => {
    if (!!isTouching && !!isDirtying) {
      setToActiveIndex("new");
      return;
    }

    const item = addItem();
    resetForm();
    setActiveIndex(item.activeIndex);
  };

  const onMove = (actualIndex: number, nextIndex: number, updateItems: any) => {
    move(actualIndex, nextIndex);
    // resetForm(); //check

    updatePreviousFields(currentValues());
    void mutations.mutationChangeOrder.mutateAsync(
      updateItems.map((item) => ({
        id: item._id,
        order: item.order,
      })),
    );
  };

  const onRemove = (activeItemIndex: string) => {
    const newItems = fields.filter(
      (field) => field.activeIndex !== activeItemIndex,
    );
    const index = getIndexOfItem(activeItemIndex);
    void mutations.mutationDelete.mutateAsync(fields[index]!._id);

    if (newItems.length) {
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
    let fieldsSubmit = values?.[name];
    const field = values?.[name].find(
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
    const index = getIndexOfItem(activeIndex);

    void mutations.mutationToggle.mutateAsync({
      id: fields[index]._id,
      appear: !fields[index].appear,
    });
    update(index, {
      ...fields[index],
      appear: !fields[index].appear,
    });
    updatePreviousFields(
      previousValues?.map((field) => {
        if (field.activeIndex === activeIndex)
          return { ...field, appear: !field.appear };

        return field;
      }),
    );
    resetForm();
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
      <HandlerProvider name={name}>
        <Confirm
          open={!!toActiveIndex}
          onOpenChange={() => setToActiveIndex(null)}
          onClick={() => {
            if (isSubmitting) {
              replace(fields.filter((field) => !!field._id));
              resetForm();
            } else {
              if (toActiveIndex === "new") {
                const item = addItem();
                resetForm();
                setActiveIndex(item.activeIndex);
                return;
              } else {
                form.reset(
                  { [name]: previousValues },
                  { keepTouched: false, keepDirty: false },
                );
              }
            }
            setActiveIndex(toActiveIndex);
          }}
        />
        <HandlerInnerProvider
          activeIndex={activeIndex}
          isSubmitting={isSubmitting}
          fields={fields}
        >
          <div className="w-full md:max-w-[306px]">
            {renderList({
              onAppend,
              onMove,
              onClick,
              onAppear,
              onRemove,
            })}
          </div>
          <div className="flex-1">
            {renderForm({
              onSubmit: handleOnSubmit,
              isLoading:
                mutations.mutationCreate.isPending ||
                mutations.mutationUpdate.isPending,
            })}
          </div>
        </HandlerInnerProvider>
      </HandlerProvider>
    </Form>
  );
}
