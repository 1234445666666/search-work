import { vacancies } from "@/features/works/mock";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import useFetch from "./useFetchWork";
import { useState, useMemo } from "react";
import { useFiltersStore } from "@/store/useFiltersStore";

export default function useFilteredVacancies() {
  const { data, loading, error } = useFetch(vacancies);

  const { favorites } = useFavoritesStore();
  const { city, salaryMin, housing, ndfl, experience, employment, schedule } =
    useFiltersStore();
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredVacancies = useMemo(() => {
    const base = (showFavorites ? favorites : data) ?? [];
    let result = base;
    if (city && city !== null) {
      result = result?.filter((item) => item.city == city);
    }
    const salaryNum = Number(salaryMin);
    if (!isNaN(salaryNum) && salaryNum > 0) {
      result = result?.filter((item) => item.salaryMin >= salaryNum);
    }
    if (housing === true) {
      result = result.filter((item) => item.hasHousing === true);
    }
    if (ndfl === true) {
      result = result.filter((item) => item.hasNdfl === true);
    }
    if (experience && experience !== null) {
      result = result?.filter((item) => item.experience == experience);
    }
    if (employment && employment !== null) {
      result = result?.filter((item) => item.employment == employment);
    }
    if (schedule && schedule !== null) {
      result = result?.filter((item) => item.schedule == schedule);
    }
    return result;
  }, [
    city,
    salaryMin,
    housing,
    ndfl,
    employment,
    experience,
    schedule,
    data,
    showFavorites,
    favorites,
  ]);
  return {
    vacancies: filteredVacancies,
    loading,
    error,
    showFavorites,
    setShowFavorites,
  };
}
