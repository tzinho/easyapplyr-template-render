import { z } from "zod";

export const summarySchema = z.object({
  text: z.string({ message: "O sumário é obrigatório" }),
});

export type SummarySchema = z.infer<typeof summarySchema>;
