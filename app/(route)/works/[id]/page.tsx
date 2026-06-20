"use client";
import { vacancies } from "@/features/works/mock";
import { useParams } from "next/navigation";
import styles from "./vacancy.module.css";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function Page() {
  const { id } = useParams();

  const vacancyId = vacancies.find((v) => v.id === Number(id));
  if (!vacancyId)
    return <h1 className={styles.notFound}>Такая вакансия не найдена</h1>;

  return (
    <div className={styles.container}>
      <article className={styles.card}>
        <div className={styles.header}>
          <span className={styles.city}>{vacancyId.city}</span>
          <h1 className={styles.title}>{vacancyId.title}</h1>
          <p className={styles.position}>{vacancyId.position}</p>
          <p className={styles.salary}>
            {vacancyId.salaryMin.toLocaleString()} –{" "}
            {vacancyId.salaryMax.toLocaleString()} ₽
          </p>
          <p className={styles.company}>{vacancyId.company}</p>
        </div>

        <div className={styles.badges}>
          <div
            className={`${styles.badge} ${vacancyId.patentNotRequired ? styles.success : styles.warning}`}
          >
            {vacancyId.patentNotRequired
              ? "📋 Патент не нужен"
              : "📋 Нужен патент"}
          </div>
          <div
            className={`${styles.badge} ${vacancyId.hasHousing ? styles.info : styles.neutral}`}
          >
            {vacancyId.hasHousing ? "🏠 Предоставляется жилье" : "🏠 Без жилья"}
          </div>
          <div
            className={`${styles.badge} ${vacancyId.hasNdfl ? styles.info : styles.neutral}`}
          >
            {vacancyId.hasNdfl ? "📊 Налог НДФЛ включен" : "📊 Без НДФЛ"}
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.subheading}>Описание вакансии</h2>
          <p className={styles.description}>{vacancyId.fullDescription}</p>
        </div>

        <div className={styles.actions}>
          <Button
            variant="contained"
            className={styles.applyBtn}
            onClick={() => alert("клик")}
          >
            Откликнуться на вакансию
          </Button>
        </div>
        <Link href="/works">Назад</Link>
      </article>
    </div>
  );
}
