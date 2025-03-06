import { z } from "zod";

export const resumeSchema = z.object({
  title: z
    .string({ required_error: "O título do currículo é obrigatório" })
    .min(3, {
      message: "O título do currículo deve possuir ao menos 3 caracteres!",
    }),
  experience: z.coerce.number().optional(),
  templateId: z.string(),
});

export type ResumeSchema = z.infer<typeof resumeSchema>;
