"use client";
import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

interface IModalTypes {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
  imgAlt: string;
  storyId: number;
}

export default function Modal({
  isOpen,
  onClose,
  imgUrl,
  imgAlt,
  storyId,
}: IModalTypes) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => prev + 20);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, storyId]);

  useEffect(() => {
    if (progress >= 100) {
      onClose();
    }
  }, [progress, onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeHeaderBtn} onClick={onClose}>
          &times;
        </button>

        <div className={styles.header}>
          <h1 className={styles.title}>История #{storyId}</h1>
          <progress max={100} value={progress} />
        </div>

        <div className={styles.imageWrapper}>
          <img src={imgUrl} alt={imgAlt} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
