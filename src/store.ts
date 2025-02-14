import { create } from "zustand";

type State = {
  isCollapsed: boolean;
  isSidebarOpen: boolean;
};

type Actions = {
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleCollapse: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  isSidebarOpen: false,
  isCollapsed: false,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
