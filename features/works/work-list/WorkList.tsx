"use client";
import styles from "./WorkList.module.css";
import { Box, Button, CircularProgress } from "@mui/material";
import VacancyCard from "./components/VacancyCard/VacancyCard";
import useFilteredVacancies from "@/hooks/useFilteredVacancies";
import Link from "next/link";

export default function WorkList() {
  const { vacancies, loading, error, showFavorites, setShowFavorites } =
    useFilteredVacancies();
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          textAlig: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <CircularProgress aria-label="Loading…" />
      </Box>
    );
  if (error) return <p>ошибка</p>;
  return (
    <section className={styles.section}>
      <Button
        variant="outlined"
        className={styles.favoriteBtn}
        onClick={() => setShowFavorites((prev) => !prev)}
      >
        {showFavorites ? "Все вакансии" : "Избранные"}
      </Button>
      <div className={styles.grid}>
        {vacancies?.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
      <div className={styles.compareBanner}>
        <div className={styles.compareBannerText}>
          <h3 className={styles.compareBannerTitle}>Сравнить вакансии</h3>
          <p className={styles.compareBannerSub}>Выбери 2 вакансии и сравни условия</p>
        </div>
        <Link href={"/compare"} className={styles.compareBannerLink}>
          Перейти к сравнению
        </Link>
      </div>
    </section>
  );
}
