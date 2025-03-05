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

export type EducationSchema = z.infer<typeof educationSchema>;
