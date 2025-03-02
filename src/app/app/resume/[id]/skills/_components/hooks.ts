"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { api } from "~/trpc/react";

export const skillSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  text: z.string().min(1, "O texto é obrigatório!"),
  resumeId: z.string(),
  order: z.number(),
});

export const skillsSchema = z.object({
  skills: z.array(skillSchema),
});

export const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    _id: "",
    text: "",
    resumeId: "",
    appear: true,
    activeIndex,
    order,
  } as z.infer<typeof skillSchema>;
};

export const useMutations = () => {
  const mutationToggle = api.skills.toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `A habilidade será ${variables.appear ? "mostrada" : "escondida"} no curriculo`,
      ),
  });

  const mutationCreate = api.skills.create.useMutation({
    onSuccess: () => toast.success("A habilidade foi adicionada com sucesso!"),
  });

  const mutationUpdate = api.skills.update.useMutation({
    onSuccess: () => toast.success("A habilidade foi atualizada com sucesso!"),
  });

  const mutationDelete = api.skills.delete.useMutation({
    onSuccess: () => toast.success("A habilidade foi deletada com sucesso!"),
  });

  const mutationChangeOrder = api.skills.changeOrder.useMutation({
    onSuccess: () =>
      toast.success("A ordem das habilidades foi alterada com sucesso!"),
  });

  return {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  };
};
