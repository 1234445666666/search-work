import type { IVacancies } from "@/features/works/types";
import { create } from "zustand";

type Store = {
  compare: IVacancies[];
  addCompare: (vacancy: IVacancies) => void;
  removeCompare: (id: number) => void;
  clearCompare: () => void;
};

export const useCompareStore = create<Store>()((set) => ({
  compare: [],
  addCompare: (vacancy) =>
    set((state) => {
      if (state.compare.some((fav) => fav.id === vacancy.id)) {
        return state;
      }
      if (state.compare.length >= 2) {
        return { compare: [...state.compare.slice(1), vacancy] };
      } else {
        return { compare: [...state.compare, vacancy] };
      }
    }),
  removeCompare: (id) =>
    set((state) => ({
      compare: state.compare.filter((vacancy) => vacancy.id !== id),
    })),
  clearCompare: () => set({ compare: [] }),
}));
