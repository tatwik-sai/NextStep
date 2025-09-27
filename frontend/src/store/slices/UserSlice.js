import { create } from "zustand";

export const createUserSlice = (set, get) => ({
  role: null,
  setRole: (role) => set({ role }),
});

export const useUserStore = create(createUserSlice);
