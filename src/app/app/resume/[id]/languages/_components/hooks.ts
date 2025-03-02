"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { api } from "~/trpc/react";

export const languageSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  name: z.string().min(1, "O nome é obrigatório!"),
  resumeId: z.string(),
  order: z.number(),
});

export const languagesSchema = z.object({
  languages: z.array(languageSchema),
});

export const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    _id: "",
    name: "",
    resumeId: "",
    appear: true,
    activeIndex,
    order,
  } as z.infer<typeof languageSchema>;
};

export const useMutations = () => {
  const mutationToggle = api.languages.toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `A língua será ${variables.appear ? "mostrada" : "escondida"} no curriculo`,
      ),
  });

  const mutationCreate = api.languages.create.useMutation({
    onSuccess: () => toast.success("A língua foi adicionada com sucesso!"),
  });

  const mutationUpdate = api.languages.update.useMutation({
    onSuccess: () => toast.success("A língua foi atualizada com sucesso!"),
  });

  const mutationDelete = api.languages.delete.useMutation({
    onSuccess: () => toast.success("A língua foi deletada com sucesso!"),
  });

  const mutationChangeOrder = api.languages.changeOrder.useMutation({
    onSuccess: () =>
      toast.success("A ordem das línguas foi alterada com sucesso!"),
  });

  return {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  };
};
