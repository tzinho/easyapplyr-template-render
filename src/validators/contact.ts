import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().nullish(),
  email: z.string().nullish(),
  personal: z.string().nullish(),
  linkedin: z.string().nullish(),
  phone: z.string().nullish(),
  country: z.string().nullish(),
  state: z.string().nullish(),
  city: z.string().nullish(),
});

export const contactSchemaInput = contactSchema.extend({
  resumeId: z.string(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
