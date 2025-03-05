"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { fieldLanguageSchema } from "~/validators/languages";

export const languagesSchema = z.object({
  languages: z.array(fieldLanguageSchema),
});

export const generateANewItem = (order: number) => {
  return {
    _id: "",
    name: "",
    resumeId: "",
    appear: true,
    activeIndex: uuidv4(),
    order,
  } as z.infer<typeof fieldLanguageSchema>;
};
