"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import { Form } from "~/components/ui/form";
import { type ExperienceSchema } from "~/validators";
import { api } from "~/trpc/react";
import { ExperienceList } from "./handle-list";
import { ExperienceForm } from "./handle-form";

export const Handler = ({ defaultValues }: any) => {
  const { id } = useParams<{ id: string }>();
  const [currentVisible, setCurrentVisible] = useState<number>(0);
  const isSubmitted = useRef<boolean>(false);
  const experienceCreate = api.experiences.create.useMutation();

  const form = useForm<ExperienceSchema>({
    defaultValues: {
      experiences: defaultValues ?? [
        {
          role: "",
          company: "",
          appear: true,
        },
      ],
    },
  });

  console.log("form.getValues", form.getValues());

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const handleOnClick = (index: number) => {
    if (!isSubmitted.current && index !== fields.length - 1) {
      isSubmitted.current = true;
      remove(fields.length - 1);
    }
    setCurrentVisible(index);
  };

  const handleOnAppend = () => {
    append({
      role: "",
      company: "",
      where: "",
      did: "",
      order: fields.length,
      appear: true,
    });

    isSubmitted.current = false;
    setCurrentVisible(fields.length);
  };

  const handleOnRemove = (index: number) => {
    if (fields.length === 1) handleOnAppend();
    remove(index);
  };

  const handleOnSubmit = (values) => {
    const experience = values.experiences[currentVisible];
    void experienceCreate.mutateAsync({
      ...experience,
      resumeId: id,
    });
    replace(values.experiences);
    isSubmitted.current = true;
  };

  return (
    <Form {...form}>
      <div className="w-full md:max-w-[306px]">
        <ExperienceList
          onAppend={handleOnAppend}
          allowInsert={isSubmitted.current}
          onClick={handleOnClick}
          onRemove={handleOnRemove}
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
