"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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
