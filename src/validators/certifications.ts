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

export const udpateCertificationSchema = certificationSchema.extend({
  id: z.string(),
});

export const fieldCertificationSchema = certificationSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type CourseWorkSchema = z.infer<typeof certificationSchema>;
