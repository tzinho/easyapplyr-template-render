import { z } from "zod";

export const skillSchema = z.object({
  text: z.string({ message: "A habilidade é obrigatória" }),
});

export type SkillSchema = z.infer<typeof skillSchema>;
