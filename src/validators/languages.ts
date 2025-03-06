import { z } from "zod";

export const languageSchema = z.object({
  name: z.string().min(1, "A linguagem é obrigatória!"),
});

export const languageSchemaInput = languageSchema.extend({
  resumeId: z.string(),
});

export const languageSchemaUpdate = languageSchema.extend({
  id: z.string(),
});

export const languageSchemaInputField = languageSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type LanguageSchema = z.infer<typeof languageSchema>;
export type LanguageSchemaInput = z.infer<typeof languageSchemaInput>;
export type LanguageSchemaUpdate = z.infer<typeof languageSchemaUpdate>;
export type LanguageSchemaInputField = z.infer<typeof languageSchemaInputField>;
