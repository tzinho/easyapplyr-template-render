"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createResumeStore, type ResumeStore } from "~/stores/resume-store";

export type ResumeStoreApi = ReturnType<typeof createResumeStore>;

export const ResumeStoreContext = createContext<ResumeStoreApi | undefined>(
  undefined,
);

export interface ResumeStoreProviderProps {
  children: ReactNode;
}

export const ResumeStoreProvider = ({ children }: ResumeStoreProviderProps) => {
  const storeRef = useRef<ResumeStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createResumeStore();
  }

  return (
    <ResumeStoreContext.Provider value={storeRef.current}>
      {children}
    </ResumeStoreContext.Provider>
  );
};

export const useResumeStore = <T,>(selector: (store: ResumeStore) => T): T => {
  const resumeStoreContext = useContext(ResumeStoreContext);

  if (!resumeStoreContext) {
    throw new Error("useResumeStore must be used within ResumeStoreProvider");
  }

  return useStore(resumeStoreContext, selector);
};
