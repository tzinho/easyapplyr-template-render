import { z } from "zod";

import { dateSchema } from ".";

export const experienceSchema = z.object({
  role: z.string({ message: "A função é obrigatória" }),
  company: z.string({ message: "A empresa é obrigatória" }),
  where: z.string().nullish(),
  startAt: dateSchema.nullish(),
  endAt: dateSchema.nullish(),
  did: z.string().nullish(),
});

export const experienceSchemaUpdate = experienceSchema.extend({
  id: z.string(),
});

export const experienceSchemaInputField = experienceSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type ExperienceSchemaUpdate = z.infer<typeof experienceSchemaUpdate>;
export type ExperienceSchemaInputField = z.infer<
  typeof experienceSchemaInputField
>;
