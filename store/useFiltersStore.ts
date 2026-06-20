import { create } from "zustand";

type Store = {
  city: string;
  salaryMin: string;
  housing: boolean;
  ndfl: boolean;
  setCity: (newCity: string) => void;
  setSalaryMin: (value: string) => void;
  toggleHousing: () => void;
  toggleNDFL: () => void;
  resetFilters: () => void;
};

export const useFiltersStore = create<Store>()((set) => ({
  city: "",
  salaryMin: "",
  housing: false,
  ndfl: false,
  setCity: (newCity: string) => set({ city: newCity }),
  setSalaryMin: (value: string) => set({ salaryMin: value }),
  toggleHousing: () => set((state) => ({ housing: !state.housing })),
  toggleNDFL: () => set((state) => ({ ndfl: !state.ndfl })),
  resetFilters: () =>
    set({ city: "", salaryMin: "", housing: false, ndfl: false }),
}));
