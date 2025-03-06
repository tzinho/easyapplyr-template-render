import { z } from "zod";
import { dateSchema } from ".";

export const projectSchema = z.object({
  title: z.string({ message: "O nome do projeto é obrigatório" }),
  organization: z.string(),
  url: z.string().optional(),
  startAt: dateSchema.nullish(),
  endAt: dateSchema.nullish(),
  description: z.string().optional(),
});

export const projectSchemaInput = projectSchema.extend({
  resumeId: z.string(),
});

export const projectSchemaUpdate = projectSchema.extend({
  id: z.string(),
});

export const projectSchemaInputField = projectSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
export type ProjectSchemaInput = z.infer<typeof projectSchemaInput>;
export type ProjectSchemaUpdate = z.infer<typeof projectSchemaUpdate>;
export type ProjectSchemaInputField = z.infer<typeof projectSchemaInputField>;
