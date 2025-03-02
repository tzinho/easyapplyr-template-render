"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { api } from "~/trpc/react";

export const educationSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  degree: z.string().min(1, "O grau é obrigatório!"),
  institution: z.string().min(1, "A instituição é obrigatória!"),
  where: z.string().nullish(),
  description: z.string().nullish(),
  resumeId: z.string(),
  startAt: z.string().nullish(),
  endAt: z.string().nullish(),
  order: z.number(),
});

export const educationsSchema = z.object({
  educations: z.array(educationSchema),
});

export const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    _id: "",
    degree: "",
    institution: "",
    description: "",
    resumeId: "",
    where: "",
    appear: true,
    startAt: null,
    endAt: null,
    activeIndex,
    order,
  } as z.infer<typeof educationSchema>;
};

export const useMutations = () => {
  const mutationToggle = api.educations.toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `A educação será ${variables.appear ? "mostrada" : "escondida"} no curriculo`,
      ),
  });

  const mutationCreate = api.educations.create.useMutation({
    onSuccess: () => toast.success("A educação foi adicionada com sucesso!"),
  });

  const mutationUpdate = api.educations.update.useMutation({
    onSuccess: () => toast.success("A educação foi atualizada com sucesso!"),
  });

  const mutationDelete = api.educations.delete.useMutation({
    onSuccess: () => toast.success("A educação foi deletada com sucesso!"),
  });

  const mutationChangeOrder = api.educations.changeOrder.useMutation({
    onSuccess: () =>
      toast.success("A ordem das educações alterada com sucesso!"),
  });

  return {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  };
};
