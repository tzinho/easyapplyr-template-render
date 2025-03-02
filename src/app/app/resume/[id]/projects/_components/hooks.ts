"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { api } from "~/trpc/react";

export const projectSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  url: z.string().nullish(),
  organization: z.string().nullish(),
  title: z.string().min(1, "O título do projeto é obrigatório!"),
  resumeId: z.string(),
  startAt: z.string().nullish(),
  endAt: z.string().nullish(),
  order: z.number(),
});

export const projectsSchema = z.object({
  projects: z.array(projectSchema),
});

export const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    _id: "",
    title: "",
    url: "",
    organization: "",
    activeIndex,
    resumeId: "",
    order,
    appear: true,
    startAt: null,
    endAt: null,
  } as z.infer<typeof projectSchema>;
};

export const useMutations = () => {
  const mutationToggle = api.projects.toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `O projeto será ${variables.appear ? "mostrado" : "escondido"} no curriculo`,
      ),
  });

  const mutationCreate = api.projects.create.useMutation({
    onSuccess: () => toast.success("O projeto foi adicionado com sucesso!"),
  });

  const mutationUpdate = api.projects.update.useMutation({
    onSuccess: () => toast.success("O projeto foi atualizado com sucesso!"),
  });

  const mutationDelete = api.projects.delete.useMutation({
    onSuccess: () => toast.success("O projeto foi deletado com sucesso!"),
  });

  const mutationChangeOrder = api.projects.changeOrder.useMutation({
    onSuccess: () =>
      toast.success("A ordem dos projetos foi alterada com sucesso!"),
  });

  return {
    mutationToggle,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    mutationChangeOrder,
  };
};
