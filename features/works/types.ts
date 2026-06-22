export interface IVacancies {
  id: number;
  title: string;
  salaryMin: number;
  salaryMax: number;
  patentNotRequired: boolean;
  company: string;
  isFavorite: boolean;
  hasHousing: boolean;
  hasNdfl: boolean;
  city: string;
  position: string;
  fullDescription: string;
  schedule: string;
  experience: string;
  employment: string;
}
