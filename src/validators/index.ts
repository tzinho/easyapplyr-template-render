import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  personal: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

export const experienceSchema = z.object({
  role: z.string().optional(),
  company: z.string().optional(),
  where: z.string().optional(),
  did: z.string().optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;
