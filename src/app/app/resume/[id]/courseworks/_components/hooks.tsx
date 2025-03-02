"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { api } from "~/trpc/react";

export const courseworkSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  name: z.string().min(1, "O nome do curso é obrigatório!"),
  where: z.string().min(1, "O local do curso é obrigatório!"),
  startAt: z.string().nullish(),
  endAt: z.string().nullish(),
  resumeId: z.string(),
  order: z.number(),
});

export const courseworksSchema = z.object({
  courseworks: z.array(courseworkSchema),
});

export const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    _id: "",
    name: "",
    where: "",
    startAt: null,
    endAt: null,
    resumeId: "",
    appear: true,
    activeIndex,
    order,
  } as z.infer<typeof courseworkSchema>;
};

export const useMutations = () => {
  const mutationToggle = api.courseworks.toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `O curso será ${variables.appear ? "mostrado" : "escondido"} no curriculo`,
      ),
  });

  const mutationCreate = api.courseworks.create.useMutation({
    onSuccess: () => toast.success("O curso foi adicionado com sucesso!"),
  });

  const mutationUpdate = api.courseworks.update.useMutation({
    onSuccess: () => toast.success("O curso foi atualizado com sucesso!"),
  });

  const mutationDelete = api.courseworks.delete.useMutation({
    onSuccess: () => toast.success("O curso foi deletado com sucesso!"),
  });

  const mutationChangeOrder = api.courseworks.changeOrder.useMutation({
    onSuccess: () =>
      toast.success("A ordem dos cursos foi alterada com sucesso!"),
  });

  return {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  };
};
