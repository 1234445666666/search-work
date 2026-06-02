import type { IVacancies } from "@/features/works/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  favorites: IVacancies[];
  addFavorite: (vacancy: IVacancies) => void;
  removeFavorite: (id: number) => void;
};

export const useFavoritesStore = create<Store>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (vacancy) =>
        set((state) => {
          if (state.favorites.some((fav) => fav.id === vacancy.id)) {
            return state;
          }
          return { favorites: [...state.favorites, vacancy] };
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((vacancy) => vacancy.id !== id),
        })),
    }),
    { name: "favorites-storage" },
  ),
);
