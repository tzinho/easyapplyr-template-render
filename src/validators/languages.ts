import { z } from "zod";

export const languageSchema = z.object({
  name: z.string().min(1, "A linguagem é obrigatória!"),
});

export const updateLanguageSchema = languageSchema.extend({
  id: z.string(),
});

export const fieldLanguageSchema = languageSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type LanguageSchema = z.infer<typeof languageSchema>;
