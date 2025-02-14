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

export const experienceSchema = z.object({
  role: z.string(),
  company: z.string().optional(),
  where: z.string().optional(),
  did: z.string().optional(),
});

export const skillSchema = z.object({
  text: z.string(),
});

export const summarySchema = z.object({
  text: z.string({ message: "O sumário é obrigatório" }),
});

export const educationSchema = z.object({
  degree: z.string(),
  institution: z.string().optional().nullish(),
  year: z.string().optional().nullish(),
  description: z.string().optional().nullish(),
});

export const courseworkSchema = z.object({
  name: z.string().optional(),
  where: z.string().optional(),
  when: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string(),
  organization: z.string(),
  url: z.string().optional(),
  startAt: z.date().optional(),
  endAt: z.date().optional(),
  description: z.string().optional(),
});

export const involvementSchema = z.object({
  title: z.string(),
  organization: z.string().optional(),
  college: z.string().optional(),
  did: z.string().optional(),
});

export const resumeSchema = z.object({
  title: z
    .string({ required_error: "O título do curriculum é obrigatório" })
    .min(3, {
      message: "O título do curriculum deve possuir ao menos 3 caracteres!",
    }),
  experience: z.coerce.number().optional(),
  templateId: z.string(),
});

export type EducationSchema = z.infer<typeof educationSchema>;
export type CourseWorkSchema = z.infer<typeof courseworkSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;
export type ContactSchema = z.infer<typeof contactSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type SkillSchema = z.infer<typeof skillSchema>;
export type SummarySchema = z.infer<typeof summarySchema>;
export type ResumeSchema = z.infer<typeof resumeSchema>;
