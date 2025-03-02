"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { api } from "~/trpc/react";

export const certificationSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  name: z.string().min(1, "O nome é obrigatório!"),
  when: z.string().nullish(),
  where: z.string().nullish(),
  description: z.string().nullish(),
  resumeId: z.string(),
  order: z.number(),
});

export const certificationsSchema = z.object({
  certifications: z.array(certificationSchema),
});

export const generateANewItem = (order: number) => {
  const activeIndex = uuidv4();
  return {
    _id: "",
    name: "",
    when: "",
    where: "",
    description: "",
    resumeId: "",
    appear: true,
    activeIndex,
    order,
  } as z.infer<typeof certificationSchema>;
};

export const useMutations = () => {
  const mutationToggle = api.certifications.toogleAppear.useMutation({
    onSuccess: (data, variables) =>
      toast.success(
        `A habilidade será ${variables.appear ? "mostrada" : "escondida"} no curriculo`,
      ),
  });

  const mutationCreate = api.certifications.create.useMutation({
    onSuccess: () => toast.success("A habilidade foi adicionada com sucesso!"),
  });

  const mutationUpdate = api.certifications.update.useMutation({
    onSuccess: () => toast.success("A habilidade foi atualizada com sucesso!"),
  });

  const mutationDelete = api.certifications.delete.useMutation({
    onSuccess: () => toast.success("A habilidade foi deletada com sucesso!"),
  });

  const mutationChangeOrder = api.certifications.changeOrder.useMutation({
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
