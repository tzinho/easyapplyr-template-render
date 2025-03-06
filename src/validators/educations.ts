import { z } from "zod";

import { dateSchema } from ".";

export const educationSchema = z.object({
  degree: z.string({ message: "O grau é obrigatório" }),
  institution: z.string().nullish(),
  description: z.string().nullish(),
  where: z.string().nullish(),
  startAt: dateSchema.nullish(),
  endAt: dateSchema.nullish(),
});

export const educationSchemaInput = educationSchema.extend({
  resumeId: z.string(),
});

export const educationSchemaUpdate = educationSchema.extend({
  id: z.string(),
});

export const educationSchemaInputField = educationSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type EducationSchema = z.infer<typeof educationSchema>;
export type EducationSchemaInput = z.infer<typeof educationSchemaInput>;
export type EducationSchemaUpdate = z.infer<typeof educationSchemaUpdate>;
export type EducationSchemaInputField = z.infer<
  typeof educationSchemaInputField
>;
