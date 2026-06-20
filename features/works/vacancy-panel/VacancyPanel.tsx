import { useRouter } from "next/navigation";
import { IVacancies } from "../types";
import styles from "./VacancyPanel.module.css";
interface IProps {
  vacancy: IVacancies;
  onClose: () => void;
}
export default function VacancyPanel({ vacancy, onClose }: IProps) {
  const router = useRouter();
  return (
    <div
      className={styles.overlay}
      onClick={() => router.push(`/works${vacancy.id}`)}
    ></div>
  );
}
