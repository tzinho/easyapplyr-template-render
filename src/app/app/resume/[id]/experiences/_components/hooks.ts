"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { api } from "~/trpc/react";

export const experienceSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  where: z.string().nullish(),
  role: z.string().min(1, "A função é obrigatória!"),
  company: z.string().nullish(),
  did: z.string().nullish(),
  resumeId: z.string(),
  startAt: z.string().nullish(),
  endAt: z.string().nullish(),
  order: z.number(),
});

export const experiencesSchema = z.object({
  experiences: z.array(experienceSchema),
});

export const generateANewItem = (order: number) => {
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

export const useMutations = () => {
  const mutationToggle = api.experiences.toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `A experiência será ${variables.appear ? "mostrada" : "escondida"} no curriculo`,
      ),
  });

  const mutationCreate = api.experiences.create.useMutation({
    onSuccess: () => toast.success("A experiência foi adicionada com sucesso!"),
  });

  const mutationUpdate = api.experiences.update.useMutation({
    onSuccess: () => toast.success("A experiência foi atualizada com sucesso!"),
  });

  const mutationDelete = api.experiences.delete.useMutation({
    onSuccess: () => toast.success("A experiência foi deletada com sucesso!"),
  });

  const mutationChangeOrder = api.experiences.changeOrder.useMutation({
    onSuccess: () =>
      toast.success("A ordem das experiências alterada com sucesso!"),
  });

  return {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  };
};
