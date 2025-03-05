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

export type ProjectSchema = z.infer<typeof projectSchema>;
