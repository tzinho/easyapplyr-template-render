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

const dateSchema = z.string().transform((val) => {
  const date = new Date(val);
  if (isNaN(date.getTime())) {
    return null; // Or throw an error, depending on your needs.
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T03:00:00Z`;
});

export const experienceSchema = z.object({
  role: z.string({ message: "A função é obrigatória" }),
  company: z.string({ message: "A empresa é obrigatória" }),
  where: z.string().nullish(),
  startAt: dateSchema.nullish(),
  endAt: dateSchema.nullish(),
  did: z.string().nullish(),
});

export const skillSchema = z.object({
  text: z.string({ message: "A habilidade é obrigatória" }),
});

export const summarySchema = z.object({
  text: z.string({ message: "O sumário é obrigatório" }),
});

export const educationSchema = z.object({
  degree: z.string({ message: "O campo de grau é obrigatório" }),
  institution: z.string().optional().nullish(),
  year: z.string().optional().nullish(),
  description: z.string().optional().nullish(),
});

export const courseworkSchema = z.object({
  name: z.string({ message: "A função é obrigatória" }),
  where: z.string().nullish(),
  startAt: dateSchema.nullish(),
  endAt: dateSchema.nullish(),
});

export const projectSchema = z.object({
  title: z.string({ message: "O nome do projeto é obrigatório" }),
  organization: z.string(),
  url: z.string().optional(),
  startAt: z.date().optional(),
  endAt: z.date().optional(),
  description: z.string().optional(),
});

export const involvementSchema = z.object({
  title: z.string({ message: "O nome do envolvimento é obrigatório" }),
  organization: z.string().optional(),
  college: z.string().optional(),
  did: z.string().optional(),
});

export const resumeSchema = z.object({
  title: z
    .string({ required_error: "O título do currículo é obrigatório" })
    .min(3, {
      message: "O título do currículo deve possuir ao menos 3 caracteres!",
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
