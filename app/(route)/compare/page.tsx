"use client";
import Link from "next/link";
import { Fragment } from "react";
import styles from "./compare.module.css";
import { useCompareStore } from "@/store/useCompareStore";
import type { IVacancies } from "@/features/works/types";

const rows = [
  { label: "Город", key: "city" },
  { label: "Должность", key: "position" },
  { label: "Компания", key: "company" },
];

export default function Compare() {
  const { compare } = useCompareStore();
  const [a, b] = compare;

  function calcStore(vacancy: IVacancies) {
    let result: number = 0;
    if (vacancy.hasNdfl == true) {
      result += 1;
    }
    if (vacancy.hasHousing == true) {
      result += 1;
    }
    if (vacancy.patentNotRequired == true) {
      result += 1;
    }
    if (vacancy.salaryMin >= 100000) {
      result += 4;
    } else if (vacancy.salaryMin >= 60000) {
      result += 2;
    } else {
      result += 1;
    }
    return Math.round((result / 7) * 10);
  }

  if (!a || !b) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Нет вакансий для сравнения</p>
          <p className={styles.emptyText}>
            Нажми «Сравнить» на двух карточках вакансий
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/works" className={styles.backLink}>
          Назад
        </Link>
        <h1 className={styles.heading}>Сравнение вакансий</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.colHeader} />
        <div className={styles.colHeader}>
          <p className={styles.vacancyTitle}>{a.title}</p>
          <p className={styles.vacancyCompany}>{a.company}</p>
        </div>
        <div className={styles.colHeader}>
          <p className={styles.vacancyTitle}>{b.title}</p>
          <p className={styles.vacancyCompany}>{b.company}</p>
        </div>

        <div className={styles.rowLabel}>Зарплата</div>
        <div
          className={`${styles.rowValue} ${a.salaryMin >= b.salaryMin ? styles.winner : styles.loser}`}
        >
          <span
            className={`${styles.salary} ${a.salaryMin < b.salaryMin ? styles.loser : ""}`}
          >
            {a.salaryMin.toLocaleString()} – {a.salaryMax.toLocaleString()} ₽
          </span>
        </div>
        <div
          className={`${styles.rowValue} ${b.salaryMin >= a.salaryMin ? styles.winner : styles.loser}`}
        >
          <span
            className={`${styles.salary} ${b.salaryMin < a.salaryMin ? styles.loser : ""}`}
          >
            {b.salaryMin.toLocaleString()} – {b.salaryMax.toLocaleString()} ₽
          </span>
        </div>

        {rows.map((row) => (
          <Fragment key={row.key}>
            <div className={styles.rowLabel}>{row.label}</div>
            <div className={styles.rowValue}>
              {a[row.key as keyof typeof a] as string}
            </div>
            <div className={styles.rowValue}>
              {b[row.key as keyof typeof b] as string}
            </div>
          </Fragment>
        ))}

        <div className={styles.rowLabel}>Патент</div>
        <div
          className={`${styles.rowValue} ${a.patentNotRequired ? styles.winner : ""}`}
        >
          <span
            className={a.patentNotRequired ? styles.badgeYes : styles.badgeNo}
          >
            {a.patentNotRequired ? "Не нужен" : "Нужен"}
          </span>
        </div>
        <div
          className={`${styles.rowValue} ${b.patentNotRequired ? styles.winner : ""}`}
        >
          <span
            className={b.patentNotRequired ? styles.badgeYes : styles.badgeNo}
          >
            {b.patentNotRequired ? "Не нужен" : "Нужен"}
          </span>
        </div>

        <div className={styles.rowLabel}>Жильё</div>
        <div
          className={`${styles.rowValue} ${a.hasHousing ? styles.winner : ""}`}
        >
          <span className={a.hasHousing ? styles.badgeYes : styles.badgeNo}>
            {a.hasHousing ? "Есть" : "Нет"}
          </span>
        </div>
        <div
          className={`${styles.rowValue} ${b.hasHousing ? styles.winner : ""}`}
        >
          <span className={b.hasHousing ? styles.badgeYes : styles.badgeNo}>
            {b.hasHousing ? "Есть" : "Нет"}
          </span>
        </div>

        <div className={styles.rowLabel}>НДФЛ</div>
        <div className={`${styles.rowValue} ${a.hasNdfl ? styles.winner : ""}`}>
          <span className={a.hasNdfl ? styles.badgeYes : styles.badgeNo}>
            {a.hasNdfl ? "Включён" : "Нет"}
          </span>
        </div>
        <div className={`${styles.rowValue} ${b.hasNdfl ? styles.winner : ""}`}>
          <span className={b.hasNdfl ? styles.badgeYes : styles.badgeNo}>
            {b.hasNdfl ? "Включён" : "Нет"}
          </span>
        </div>

        <div className={styles.scoreLabel}>Итоговый балл</div>
        <div
          className={`${styles.scoreValue} ${calcStore(a) >= calcStore(b) ? styles.scoreWinner : styles.scoreLoser}`}
        >
          <span className={styles.scoreNumber}>{calcStore(a)}</span>
          <span className={styles.scoreMax}>/10</span>
        </div>
        <div
          className={`${styles.scoreValue} ${calcStore(b) >= calcStore(a) ? styles.scoreWinner : styles.scoreLoser}`}
        >
          <span className={styles.scoreNumber}>{calcStore(b)}</span>
          <span className={styles.scoreMax}>/10</span>
        </div>
      </div>
    </div>
  );
}
