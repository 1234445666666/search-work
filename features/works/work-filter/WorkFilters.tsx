"use client";
import { useFiltersStore } from "@/store/useFiltersStore";
import { vacancies } from "../mock";
import type { IVacancies } from "../types";
import styles from "./WorkFilters.tsx.module.css";
import { Switch, TextField, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function WorkFilters() {
  const {
    city,
    salaryMin,
    housing,
    ndfl,
    schedule,
    experience,
    employment,
    setEmployment,
    setSchedule,
    setExperience,
    setCity,
    setSalaryMin,
    toggleHousing,
    toggleNDFL,
    resetFilters,
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

  function getUniqueValue(arr: IVacancies[], key: keyof IVacancies): string[] {
    const result: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i][key] as string;
      if (!result.includes(val)) {
        result.push(val);
      }
    }
    return result;
  }

  const uniqueCities = getUniqueCities(vacancies);
  const uniqueSchedule = getUniqueValue(vacancies, "schedule");
  const uniqueExperience = getUniqueValue(vacancies, "experience");
  const uniqueEmployment = getUniqueValue(vacancies, "employment");

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
        <label className={styles.label} htmlFor="schedule-select">
          Граффик работы
        </label>
        <Select
          id="schedule-select"
          name="type"
          className={styles.select}
          value={schedule ?? ""}
          onChange={(e) => setSchedule(e.target.value)}
          displayEmpty
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">все граффики работы</MenuItem>
          {uniqueSchedule.map((schedule) => (
            <MenuItem value={schedule} key={schedule}>
              {schedule}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="experience-select">
          Опыт работы
        </label>
        <Select
          id="experience-select"
          className={styles.select}
          value={experience ?? ""}
          onChange={(e) => setExperience(e.target.value)}
          displayEmpty
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">любой опыт</MenuItem>
          {uniqueExperience.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="employment-select">
          Занятость
        </label>
        <Select
          id="employment-select"
          className={styles.select}
          value={employment ?? ""}
          onChange={(e) => setEmployment(e.target.value)}
          displayEmpty
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">любая занятость</MenuItem>
          {uniqueEmployment.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
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

      <Button
        variant="outlined"
        className={styles.resetBtn}
        onClick={resetFilters}
      >
        Сбросить
      </Button>
    </form>
  );
}
