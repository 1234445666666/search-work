"use client";
import { useState } from "react";
import { stories } from "./mock";
import styles from "./StoryList.module.css";
import Modal from "./Modal/Modal";

export default function StoryList() {
  const [selectedStory, setSelectedStory] = useState<
    null | (typeof stories)[0]
  >(null);

  function handleModalOpen(story: (typeof stories)[0]) {
    setSelectedStory(story);
  }

  function handleModalClose() {
    setSelectedStory(null);
  }
  return (
    <div className={styles.container}>
      {stories.map((img) => (
        <div
          key={img.id}
          className={styles.storyCard}
          onClick={() => handleModalOpen(img)}
        >
          <img src={img.preview} alt={img.title} className={styles.image} />
          <div className={styles.overlay} />
        </div>
      ))}
      {selectedStory && (
        <Modal
          isOpen={!!selectedStory}
          onClose={handleModalClose}
          story={selectedStory}
        />
      )}
    </div>
  );
}
