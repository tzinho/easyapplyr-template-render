import { createStore } from "zustand/vanilla";
import { type InferSelectModel } from "drizzle-orm";

import {
  type sections,
  type contacts,
  type resumes,
  type skills,
  type summaries,
  type courseworks,
  type projects,
  type involvements,
  type educations,
  type languages,
  type experiences,
  type certifications,
  type settings,
} from "~/server/db/schema";

export type Skill = InferSelectModel<typeof skills>;
export type Contact = InferSelectModel<typeof contacts>;
export type Summary = InferSelectModel<typeof summaries>;
export type Courseworks = InferSelectModel<typeof courseworks>;
export type Project = InferSelectModel<typeof projects>;
export type Involvements = InferSelectModel<typeof involvements>;
export type Education = InferSelectModel<typeof educations>;
export type Language = InferSelectModel<typeof languages>;
export type Section = InferSelectModel<typeof sections>;
export type Experience = InferSelectModel<typeof experiences>;
export type Certification = InferSelectModel<typeof certifications>;
export type Settings = InferSelectModel<typeof settings>;

export type Resume = InferSelectModel<typeof resumes> & {
  contact: Contact;
  summary: Summary;
  skills: Skill[];
  courseworks: Courseworks[];
  projects: Project[];
  involvements: Involvements[];
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  certifications: Certification[];
  sections: Section[];
  settings: Settings;
};

export type ResumeState = {
  resumeTemplate: Resume | null;
};

export type ResumeActions = {
  setResumeTemplate: (resumeTemplate: Resume) => void;
  setSkillsTemplate: (skillsTemplate: Skill) => void;
  setContactTemplate: (contactTemplate: Contact) => void;
  setSummaryTemplate: (summaryTemplate: Summary) => void;
  deleteSkillTemplate: (id: string) => void;
  setSettings: (settings: Partial<Settings>) => void;
};

export type ResumeStore = ResumeState & ResumeActions;

export const defaultInitState: ResumeState = {
  resumeTemplate: null,
};

export const createResumeStore = (
  initState: ResumeState = defaultInitState,
) => {
  return createStore<ResumeStore>()((set) => ({
    ...initState,
    setResumeTemplate: (resumeTemplate) => set(() => ({ resumeTemplate })),
    setSkillsTemplate: (skill: Skill) =>
      set((state) => ({
        resumeTemplate: state.resumeTemplate
          ? {
              ...state.resumeTemplate,
              skills: [...state.resumeTemplate.skills, skill],
            }
          : null,
      })),
    setContactTemplate: (contact: Contact) =>
      set((state) => ({
        resumeTemplate: state.resumeTemplate
          ? {
              ...state.resumeTemplate,
              contact: { ...state.resumeTemplate.contact, ...contact },
            }
          : null,
      })),
    setSummaryTemplate: (summary: Summary) =>
      set((state) => ({
        resumeTemplate: state.resumeTemplate
          ? {
              ...state.resumeTemplate,
              summary: { ...state.resumeTemplate.summary, ...summary },
            }
          : null,
      })),
    deleteSkillTemplate: (id: string) =>
      set((state) => ({
        resumeTemplate: state.resumeTemplate
          ? {
              ...state.resumeTemplate,
              skills: state.resumeTemplate.skills.filter(
                (skill) => skill.id !== id,
              ),
            }
          : null,
      })),
    setSettings: (settings: Partial<Settings>) =>
      set((state) => ({
        resumeTemplate: state.resumeTemplate
          ? {
              ...state.resumeTemplate,
              settings: { ...state.resumeTemplate.settings, ...settings },
            }
          : null,
      })),
  }));
};
