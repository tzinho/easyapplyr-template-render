"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const experienceSchema = z.object({
  _id: z.string(),
  activeIndex: z.string(),
  appear: z.boolean(),
  where: z.string().nullish(),
  role: z.string().min(1, "A função é obrigatória!"),
  company: z.string().min(1, "A empresa é obrigatória!"),
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
