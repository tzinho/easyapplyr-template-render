import { create } from "zustand";

type State = {
  isCollapsed: boolean;
  isSidebarOpen: boolean;
};

type Actions = {
  setIsSidebarOpen: (isOpen: boolean) => void;
  setIsSidebarCollapse: (isCollapsed: boolean) => void;
  toggleCollapse: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  isSidebarOpen: false,
  isCollapsed: false,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setIsSidebarCollapse: (isCollapsed) => set({ isCollapsed }),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
