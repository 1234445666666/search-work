import Link from "next/link";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import styles from "../../WorkList.module.css";
import { IVacancies } from "@/features/works/types";
import Button from "@mui/material/Button";

interface IVacancyCard {
  vacancy: IVacancies;
}

export default function VacancyCard({ vacancy }: IVacancyCard) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const isFavorite = favorites.some((fav) => fav.id === vacancy.id);

  function handleCopy() {
    const currentUrl = window.location.origin;
    navigator.clipboard
      .writeText(`${currentUrl}/works/${vacancy.id}`)
      .then(() => alert("Ссылка скопирована"))
      .catch((err) => console.error("Ошибка при копировании: ", err));
  }

  return (
    <div className={styles.card}>
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
          {vacancy.patentNotRequired ? "Патент не требуется" : "Нужен патент"}
        </span>
      </div>
      <p className={styles.company}>{vacancy.company}</p>
      <div className={styles.actions}>
        <Button
          variant="contained"
          className={styles.applyBtn}
          onClick={() => alert("отклик")}
        >
          Откликнуться
        </Button>
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
            isFavorite ? removeFavorite(vacancy.id) : addFavorite(vacancy)
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <Button className={styles.compareBtn} variant="outlined">
          Сравнить
        </Button>
      </div>
    </div>
  );
}
