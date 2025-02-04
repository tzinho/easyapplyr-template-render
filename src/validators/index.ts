import { z } from "zod";

export const contactSchema = z.object({
  name: z.coerce.string().optional(),
  email: z.coerce.string().optional(),
  personal: z.coerce.string().optional(),
  linkedin: z.coerce.string().optional(),
  phone: z.coerce.string().optional(),
  country: z.coerce.string().optional(),
  state: z.coerce.string().optional(),
  city: z.coerce.string().optional(),
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
  text: z.string(),
});

export const educationSchema = z.object({
  degree: z.string(),
  institution: z.string().optional(),
  year: z.number().optional(),
  description: z.string().optional(),
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
});

export type EducationSchema = z.infer<typeof educationSchema>;
export type CourseWorkSchema = z.infer<typeof courseworkSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;
export type ContactSchema = z.infer<typeof contactSchema>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type SkillSchema = z.infer<typeof skillSchema>;
export type SummarySchema = z.infer<typeof summarySchema>;
export type ResumeSchema = z.infer<typeof resumeSchema>;
