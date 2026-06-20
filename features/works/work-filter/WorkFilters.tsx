"use client";
import { useFiltersStore } from "@/store/useFiltersStore";
import { vacancies } from "../mock";
import type { IVacancies } from "../types";
import styles from "./WorkFilters.tsx.module.css";
import { Switch, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
        <Select
          id="city-select"
          name="type"
          className={styles.select}
          value={city ?? ""}
          onChange={(e) => setCity(e.target.value)}
          displayEmpty
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">все города</MenuItem>
          {uniqueCities.map((city) => (
            <MenuItem value={city} key={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="salary-input">
          Зарплата от, ₽
        </label>
        <TextField
          id="salary-input"
          type="text"
          label="Например, 60000"
          variant="filled"
          className={styles.input}
          value={salaryMin}
          onChange={(e) => setSalaryMin(e.target.value)}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel} htmlFor="housing">
          <Switch onChange={toggleHousing} checked={housing} />
          <span className={styles.checkboxText}>С жильем</span>
        </label>

        <label className={styles.checkboxLabel} htmlFor="ndfl">
          <Switch checked={ndfl} onChange={toggleNDFL} />
          <span className={styles.checkboxText}>С оплатой НДФЛ</span>
        </label>
      </div>
    </form>
  );
}
