"use client";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { vacancies } from "../mock";
import styles from "./WorkList.module.css";
import useFetch from "@/hooks/useFetchWork";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useFiltersStore } from "@/store/useFiltersStore";

export default function WorkList() {
  const { data, loading, error } = useFetch(vacancies);
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const { city, salaryMin, housing, ndfl } = useFiltersStore();

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

  function handleCopy() {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("Ссылка скопирована: " + currentUrl);
      })
      .catch((err) => {
        console.error("Ошибка при копировании: ", err);
      });
  }

  if (loading) return <p>загрузка вакансий</p>;
  if (error) return <p>ошибка</p>;
  return (
    <section className={styles.section}>
      <button
        className={styles.favoriteBtn}
        onClick={() => setShowFavorites((prev) => !prev)}
      >
        {showFavorites ? "Все вакансии" : "Избранные"}
      </button>
      <div className={styles.grid}>
        {filteredVacancies?.map((vacancy) => {
          const isFavorite = favorites.some((fav) => fav.id === vacancy.id);
          return (
            <div key={vacancy.id} className={styles.card}>
              <h2 className={styles.title}>
                <Link href={`/works/${vacancy.id}`}>{vacancy.title}</Link>
              </h2>

              <p className={styles.salary}>
                {vacancy.salaryMin.toLocaleString()} –{" "}
                {vacancy.salaryMax.toLocaleString()} ₽
              </p>

              <div className={styles.badgeWrapper}>
                <span
                  className={`${styles.badge} ${vacancy.patentNotRequired ? styles.success : styles.warning}`}
                >
                  {vacancy.patentNotRequired
                    ? "Патент не требуется"
                    : "Нужен патент"}
                </span>
              </div>

              <p className={styles.company}>{vacancy.company}</p>

              <div className={styles.actions}>
                <button
                  className={styles.applyBtn}
                  onClick={() => alert("отклик")}
                >
                  Откликнуться
                </button>
                <button
                  className={styles.copyBtn}
                  title="Скопировать"
                  onClick={handleCopy}
                >
                  📋
                </button>
                <button
                  className={styles.copyBtn}
                  onClick={() =>
                    isFavorite
                      ? removeFavorite(vacancy.id)
                      : addFavorite(vacancy)
                  }
                >
                  {isFavorite ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
