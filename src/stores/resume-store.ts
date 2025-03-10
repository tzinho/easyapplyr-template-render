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
  type languages,
  type experiences,
  type certifications,
  type settings,
  type educations,
} from "~/server/db/schema";
import state from "country-state-city/lib/state";

export type Skill = InferSelectModel<typeof skills>;
export type Contact = InferSelectModel<typeof contacts>;
export type Summary = InferSelectModel<typeof summaries>;
export type Courseworks = InferSelectModel<typeof courseworks>;
export type Project = InferSelectModel<typeof projects>;
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
  setResumeTemplate: (resumeTemplate: Resume | null) => void;
  setContact: (contact: Contact) => void;
  setSummary: (summary: Summary) => void;
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
    setResumeTemplate: (resumeTemplate: Resume | null) => {
      set({ resumeTemplate });
    },
    setContact: (contact: Contact) =>
      set((state) => ({
        resumeTemplate: {
          ...state.resumeTemplate,
          contact: { ...state.resumeTemplate?.contact, ...contact },
        },
      })),
    setSummary: (summary: Summary) =>
      set((state) => ({
        resumeTemplate: {
          ...state.resumeTemplate,
          summary: { ...state.resumeTemplate?.summary, ...summary },
        },
      })),
    setLanguages: (languages: Language) => {
      set((state) => ({
        resumeTemplate: {
          ...state.resumeTemplate,
          languages,
        },
      }));
    },
  }));
};
