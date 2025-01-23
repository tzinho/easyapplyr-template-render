import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  personal: z.string().optional(),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
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

export const skillSchema = z.object({
  text: z.string(),
});

export const summarySchema = z.object({
  summary: z.string(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type SkillSchema = z.infer<typeof skillSchema>;
export type SummarySchema = z.infer<typeof summarySchema>;
