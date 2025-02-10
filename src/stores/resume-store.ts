import { createStore } from "zustand/vanilla";
import { type InferSelectModel } from "drizzle-orm";

import {
  type contacts,
  type resumes,
  type skills,
  type summaries,
} from "~/server/db/schema";

export type Resume = InferSelectModel<typeof resumes> & {
  contact: InferSelectModel<typeof contacts>;
  summary: InferSelectModel<typeof summaries>;
  skills: InferSelectModel<typeof skills>;
};

export type ResumeState = {
  resume: Resume | null;
};

export type ResumeActions = {
  setResume: (resume: InferSelectModel<typeof resumes>) => void;
};

export type ResumeStore = ResumeState & ResumeActions;

export const defaultInitState: ResumeState = {
  resume: null,
};

export const createResumeStore = (
  initState: ResumeState = defaultInitState,
) => {
  return createStore<ResumeStore>()((set) => ({
    ...initState,
    setResume: (resume) => set(() => ({ resume })),
  }));
};
