import { vacancies } from "@/features/works/mock";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import useFetch from "./useFetchWork";
import { useState, useMemo } from "react";
import { useFiltersStore } from "@/store/useFiltersStore";

export default function useFilteredVacancies() {
  const { data, loading, error } = useFetch(vacancies);

  const { favorites } = useFavoritesStore();
  const { city, salaryMin, housing, ndfl } = useFiltersStore();
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
    return result;
  }, [city, salaryMin, housing, ndfl, data, showFavorites, favorites]);
  return {
    vacancies: filteredVacancies,
    loading,
    error,
    showFavorites,
    setShowFavorites,
  };
}
