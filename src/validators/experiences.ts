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

export type ExperienceSchema = z.infer<typeof experienceSchema>;
