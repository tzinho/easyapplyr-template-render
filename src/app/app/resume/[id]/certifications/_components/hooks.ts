"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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
