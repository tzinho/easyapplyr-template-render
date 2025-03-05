"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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
    activeIndex: uuidv4(),
    order,
  } as z.infer<typeof educationSchema>;
};
