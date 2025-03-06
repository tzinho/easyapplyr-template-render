import { z } from "zod";

import { dateSchema } from ".";

export const certificationSchema = z.object({
  name: z.string({ message: "O nome do certificado é obrigatório!" }),
  where: z.string().nullish(),
  when: z.string().nullish(),
  description: z.string().nullish(),
  startAt: dateSchema.nullish(),
  endAt: dateSchema.nullish(),
});

export const certificationSchemaInput = certificationSchema.extend({
  resumeId: z.string(),
});

export const certificationSchemaUpdate = certificationSchema.extend({
  id: z.string(),
});

export const certificationSchemaInputField = certificationSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type CertificationSchema = z.infer<typeof certificationSchema>;
export type CertificationSchemaInput = z.infer<typeof certificationSchemaInput>;
export type CertificationSchemaUpdate = z.infer<
  typeof certificationSchemaUpdate
>;
export type CertificationSchemaInputField = z.infer<
  typeof certificationSchemaInputField
>;
