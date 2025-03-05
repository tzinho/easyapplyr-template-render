"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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
