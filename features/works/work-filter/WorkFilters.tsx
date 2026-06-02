"use client";
import { useFiltersStore } from "@/store/useFiltersStore";
import { vacancies } from "../mock";
import type { IVacancies } from "../types";
import styles from "./WorkFilters.tsx.module.css";

export default function WorkFilters() {
  const {
    city,
    salaryMin,
    housing,
    ndfl,
    setCity,
    setSalaryMin,
    toggleHousing,
    toggleNDFL,
  } = useFiltersStore();

  function getUniqueCities(arr: IVacancies[]): string[] {
    const cities: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (!cities.includes(arr[i].city)) {
        cities.push(arr[i].city);
      }
    }
    return cities;
  }

  const uniqueCities = getUniqueCities(vacancies);

  return (
    <form className={styles.form}>
      <h1 className={styles.heading}>Фильтры</h1>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="city-select">
          Город
        </label>
        <select
          id="city-select"
          name="type"
          className={styles.select}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">все города</option>
          {uniqueCities.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="salary-input">
          Зарплата от, ₽
        </label>
        <input
          id="salary-input"
          type="text"
          placeholder="Например, 60000"
          className={styles.input}
          value={salaryMin}
          onChange={(e) => setSalaryMin(e.target.value)}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel} htmlFor="housing">
          <input
            type="checkbox"
            id="housing"
            className={styles.checkbox}
            checked={housing}
            onChange={toggleHousing}
          />
          <span className={styles.checkboxText}>С жильем</span>
        </label>

        <label className={styles.checkboxLabel} htmlFor="ndfl">
          <input
            type="checkbox"
            id="ndfl"
            className={styles.checkbox}
            checked={ndfl}
            onChange={toggleNDFL}
          />
          <span className={styles.checkboxText}>С оплатой НДФЛ</span>
        </label>
      </div>
    </form>
  );
}
