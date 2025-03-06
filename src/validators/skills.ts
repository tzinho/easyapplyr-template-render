import { z } from "zod";

export const skillSchema = z.object({
  text: z.string({ message: "A habilidade é obrigatória" }),
});

export const skillSchemaInput = skillSchema.extend({
  resumeId: z.string(),
});

export const skillSchemaUpdate = skillSchema.extend({
  id: z.string(),
});

export const skillSchemaInputField = skillSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type SkillSchema = z.infer<typeof skillSchema>;
export type SkillSchemaInput = z.infer<typeof skillSchemaInput>;
export type SkillSchemaUpdate = z.infer<typeof skillSchemaUpdate>;
export type SkillSchemaInputField = z.infer<typeof skillSchemaInputField>;
