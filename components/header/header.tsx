"use client";
import styles from "./header.module.css";
import Link from "next/link";
import type { INavList } from "./types";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathName = usePathname();
  const list: INavList[] = [
    { id: 1, name: "Работа", link: "works" },
    // { id: 2, name: "Резюме", link: "works" },
    // { id: 3, name: "Отклики", link: "works" },
  ];
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          {list.map((listName) => (
            <li key={listName.id}>
              <Link
                href={listName.link}
                className={
                  pathName.includes(listName.link) ? styles.activeLink : ""
                }
              >
                <p>{listName.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
