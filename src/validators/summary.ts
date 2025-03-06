import { z } from "zod";

export const summarySchema = z.object({
  text: z.string({ message: "O sumário é obrigatório" }),
});

export const summarySchemaInput = summarySchema.extend({
  resumeId: z.string(),
});

export type SummarySchema = z.infer<typeof summarySchema>;
export type SummarySchemaInput = z.infer<typeof summarySchemaInput>;
