import { create } from "zustand";

type Store = {
  city: string;
  salaryMin: string;
  housing: boolean;
  ndfl: boolean;
  schedule: string;
  experience: string;
  employment: string;
  setCity: (newCity: string) => void;
  setSalaryMin: (value: string) => void;
  toggleHousing: () => void;
  toggleNDFL: () => void;
  setSchedule: (value: string) => void;
  setExperience: (value: string) => void;
  setEmployment: (value: string) => void;
  resetFilters: () => void;
};

export const useFiltersStore = create<Store>()((set) => ({
  city: "",
  salaryMin: "",
  housing: false,
  ndfl: false,
  schedule: "",
  experience: "",
  employment: "",
  setCity: (newCity: string) => set({ city: newCity }),
  setSalaryMin: (value: string) => set({ salaryMin: value }),
  toggleHousing: () => set((state) => ({ housing: !state.housing })),
  toggleNDFL: () => set((state) => ({ ndfl: !state.ndfl })),
  setSchedule: (value) => set({ schedule: value }),
  setEmployment: (value) => set({ employment: value }),
  setExperience: (value) => set({ experience: value }),
  resetFilters: () =>
    set({
      city: "",
      salaryMin: "",
      housing: false,
      ndfl: false,
      schedule: "",
      experience: "",
      employment: "",
    }),
}));
